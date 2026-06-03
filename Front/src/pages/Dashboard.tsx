import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Vehicule } from "../types/index";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Dashboard() {
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const [recherche, setRecherche] = useState('')
    const navigate = useNavigate();

    // filtre pour bare de recherche
    const vehiculesFiltres = vehicules.filter(function(vehicule: Vehicule) {
        return vehicule.marque.toLowerCase().includes(recherche.toLowerCase()) ||
            vehicule.modele.toLowerCase().includes(recherche.toLowerCase())
    })

    // useEff se declanche une seule fois au chargement de la page
    useEffect(() => {
        async function chargerVehicules() {
            // on fait une requit pour cette api pour recuperer tous les vehicules de users connecté
            const response = await fetch('https://projet-carscore.onrender.com/api/vehicules', {
                headers: {
                    'authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            setVehicules(data.reverse())
        }
        chargerVehicules()
    }, [])

    // function pour supprimer Un vehicule users c'est une function que recoit id du vehicule et envoie une req pour suprimer au back
    async function supprimerVehicule(id: number) {
        const confirmation = window.confirm('Voulez-vous vraiment supprimer ce véhicule ?')
        if (!confirmation){
            return
        }

        await fetch(`https://projet-carscore.onrender.com/api/vehicules/${id}`,{
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
        });
        const nouveauxVehicules = vehicules.filter(function(vehicule) {
            return vehicule.id !== id
        });

        setVehicules(nouveauxVehicules)
    }

    return (
        <>
            <Header type="user" />
            <main className="container">

                {/* BARRE DE RECHERCHE */}
                <input
                    type="text"
                    placeholder="🔍 Rechercher par marque ou modèle..."
                    value={recherche}
                    onChange={function(event) { setRecherche(event.target.value) }}
                    className="search-input"
                />

                {/* TITRE UNE SEULE FOIS + LISTE DES VEHICULES */}
                <section aria-labelledby="vehicles-title">
                    <h2 id="vehicles-title">Mes véhicules</h2>

                    {vehiculesFiltres.map((vehicule) => (
                        <article key={vehicule.id} className="card vehicle-card">
                            <div className="vehicle-info">
                                <h3>{vehicule.marque} {vehicule.modele} — {vehicule.annee}</h3>
                                <ul role="list">
                                    <li>📏 Kilométrage : {vehicule.kilometrage} km</li>
                                    <li>⛽ Carburant : {vehicule.carburant}</li>
                                    <li>📍 Région : {vehicule.region}</li>
                                    <li>🔧 Carnet d'entretien : {vehicule.entretien}</li>
                                    <li>✅ Contrôle technique : {vehicule.ct}</li>
                                </ul>
                            </div>
                            <div className="vehicle-score">
                                <p className="score-badge score-blue-bg" aria-label={`Score : ${vehicule.score_global} sur 100`}>
                                    {vehicule.score_global}/100
                                </p>
                                <button className="btn" onClick={() => navigate(`/car/${vehicule.id}`)}>
                                    Voir l'analyse complète
                                </button>
                                <button className="btn" onClick={function(){ supprimerVehicule(vehicule.id)}}>
                                    Supprimer ce véhicule
                                </button>
                            </div>
                        </article>
                    ))}
                </section>

                {/* CONSEIL MARCHE */}
                <section className="card tip-card" aria-labelledby="tip-title">
                    <h2 id="tip-title">💡 Conseil du marché</h2>
                    <p>La période la plus favorable pour céder un véhicule en France se situe entre <strong>mars et juin</strong>, avant les départs en vacances. Les transactions sont plus nombreuses et les prix mieux soutenus. L'automne et l'hiver sont généralement moins propices à la revente.</p>
                </section>

            </main>

            <Footer />
        </>
    )
}