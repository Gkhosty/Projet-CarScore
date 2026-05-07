import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Vehicule } from "../types/index";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Dashboard() {
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const [recherche, setRecherche] = useState('')
    const [afficherBienvenu, setAfficherBienvenu] = useState(true);
    const[disparait, setDisparait] = useState(false)
    const nom = sessionStorage.getItem('nom');
    const navigate = useNavigate();

    // filtre pour bare de recherche
    const vehiculesFiltres = vehicules.filter(function(vehicule: any) {
        return vehicule.marque.toLowerCase().includes(recherche.toLowerCase()) ||
            vehicule.modele.toLowerCase().includes(recherche.toLowerCase())
    })


    // useEff se declanche une seule fois au chargement de la page ,

    useEffect(() => {
        async function chargerVehicules() {
            // on fait une requit pour cette api pour recuperer tous les vehicules de users connecté
            const response = await fetch('https://projet-carscore.onrender.com/api/vehicules', {
                headers: {
                    'authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            setVehicules(data)
        }
        chargerVehicules()
        // TImer bienvenu 3 secodes
        const timer1 = setTimeout(function() {
            setDisparait(true)
        }, 1500)
        const timer2 = setTimeout(function(){
            setAfficherBienvenu(false)
        }, 2000)
        return function(){
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
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
            return vehicule.id !==id
        });

        setVehicules(nouveauxVehicules)

    }



    return (
        <>
            <Header type="user" />

            <main className="container">
                {/* message bienvenu pour utlisatuer */}
                {afficherBienvenu && (
                    <div className={`bienvenu ${disparait ? 'disparait' : ''}`}>
                        <div className="bienvenu-text">
                            👋 Bienvenu {nom} !
                        </div>
                    </div>
                )}
                {/* BARRE DE RECHERCHE */}
                <input
                    type="text"
                    placeholder="🔍 Rechercher par marque ou modèle..."
                    value={recherche}
                    onChange={function(event) { setRecherche(event.target.value) }}
                    className="search-input"
                />

                {/* LISTE DES VEHICULES */}
                {vehiculesFiltres.map((vehicule: any) => (
                    <div key={vehicule.id}>

                        {/* SCORE PRINCIPAL */}
                        <section aria-labelledby={`score-title-${vehicule.id}`}>
                            <h2 id={`score-title-${vehicule.id}`}>Votre score CarScore</h2>
                            <div className="score-block">
                                <p className="dashboard-score" aria-label={`Score : ${vehicule.score_global} sur 100`}>
                                    {vehicule.score_global}<span>/100</span>
                                </p>
                                <p className="score-reco">
                                    Recommandation : <strong>
                                        {vehicule.score_global >= 80 ? 'Garder — votre voiture a encore beaucoup de valeur' :
                                        vehicule.score_global >= 60 ? 'Garder encore 1 à 2 ans' :
                                        vehicule.score_global >= 40 ? 'Envisager la revente dans les 6 mois' :
                                        'Vendre rapidement avant de perdre encore plus de valeur'}
                                    </strong>
                                </p>
                            </div>
                        </section>

                        {/* INDICATEURS */}
                        <section aria-labelledby={`indicators-title-${vehicule.id}`}>
                            <h2 id={`indicators-title-${vehicule.id}`}>Indicateurs clés</h2>
                            <ul className="grid" role="list">
                                <li className="card">
                                    <h3>📏 Kilométrage</h3>
                                    <p className="card-value">{vehicule.kilometrage} km</p>
                                </li>
                                <li className="card">
                                    <h3>⛽ Carburant</h3>
                                    <p className="card-value">{vehicule.carburant}</p>
                                </li>
                                <li className="card">
                                    <h3>📍 Région</h3>
                                    <p className="card-value">{vehicule.region}</p>
                                </li>
                                <li className="card">
                                    <h3>📅 Année</h3>
                                    <p className="card-value">{vehicule.annee}</p>
                                </li>
                            </ul>
                        </section>

                        {/* MON VEHICULE */}
                        <section aria-labelledby={`vehicle-title-${vehicule.id}`}>
                            <h2 id={`vehicle-title-${vehicule.id}`}>Mon véhicule</h2>
                            <article className="card vehicle-card">
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
                                    <button className="btn" onClick={function(){ supprimerVehicule(vehicule.id)}}>Supprimer ce véhicule</button>
                                </div>
                            </article>
                        </section>

                    </div>
                ))}

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