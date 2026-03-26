import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Vehicule } from "../types/index";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Dashboard() {
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function chargerVehicules() {
            const response = await fetch('http://localhost:5000/api/vehicules', {
                headers: {
                    'authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            setVehicules(data)
        }
        chargerVehicules()
    }, [])

    return (
        <>
            <Header type="user" />

            <main className="container">

                {/* LISTE DES VEHICULES */}
                {vehicules.map((vehicule: any) => (
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