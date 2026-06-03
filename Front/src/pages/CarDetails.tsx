import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Score } from "../types/index";
import Header from "../components/header";
import Footer from "../components/footer";

export default function CarDetails() {
    const [score, setScore] = useState<Score | null>(null);
    const { id } = useParams();

    useEffect(() => {
        async function chargerScore() {
            const response = await fetch(`https://projet-carscore.onrender.com/api/scores/${id}`, {
                headers: {
                    'authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            setScore(data.score)
        }
        chargerScore()
    }, [])

    if (!score) return <p>Chargement...</p>

    return (
        <>
            <Header type="user" />

            <main className="container">

                {/* EN-TETE VEHICULE */}
                <section aria-labelledby="vehicle-title">
                    <h2 id="vehicle-title">Analyse de votre véhicule</h2>
                    <p className="form-subtitle">Analyse complète fondée sur 6 critères du marché automobile français.</p>
                </section>

                {/* SCORE GLOBAL */}
                <section className="score-block" aria-labelledby="score-title">
                    <h2 id="score-title" className="sr-only">Score global</h2>
                    <p className="dashboard-score" aria-label={`Score global : ${score.score_global} sur 100`}>
                        {score.score_global}<span>/100</span>
                    </p>
                    <p className={
                        score.score_global >= 80 ? 'score-etat excellent' :
                        score.score_global >= 60 ? 'score-etat bon' :
                        score.score_global >= 40 ? 'score-etat moyen' :
                        'score-etat critique'
                    }>
                        {score.score_global >= 80 ? '🏆 Excellent état' :
                        score.score_global >= 60 ? '👍 Bon état' :
                        score.score_global >= 40 ? '⚠️ État moyen' :
                        '🚨 État critique'}
                    </p>
                    <p className="score-etat-phrase">
                        {score.score_global >= 80
                            ? 'Votre voiture a encore beaucoup de valeur sur le marché.'
                            : score.score_global >= 60
                            ? 'Votre voiture reste compétitive, gardez-la encore 1 à 2 ans.'
                            : score.score_global >= 40
                            ? 'Envisagez la revente dans les 6 prochains mois.'
                            : 'Vendez rapidement avant de perdre encore plus de valeur.'}
                    </p>
                    <p className="score-reco">
                        Recommandation : <strong>{score.recommandation}</strong>
                    </p>
                </section>

                {/* DETAIL DES 6 CRITERES */}
                <section aria-labelledby="criteria-title">
                    <h2 id="criteria-title">Analyse par critère</h2>
                    <ul className="criteria-detail-list" role="list">

                        <li className="card criteria-detail-item">
                            <div className="criteria-info">
                                <h3>📏 Kilométrage</h3>
                            </div>
                            <div className="criteria-score">{score.score_kilometrage} / 20</div>
                        </li>

                        <li className="card criteria-detail-item">
                            <div className="criteria-info">
                                <h3>📅 Année de mise en circulation</h3>
                            </div>
                            <div className="criteria-score">{score.score_annee} / 20</div>
                        </li>

                        <li className="card criteria-detail-item">
                            <div className="criteria-info">
                                <h3>⛽ Type de carburant</h3>
                            </div>
                            <div className="criteria-score">{score.score_carburant} / 15</div>
                        </li>

                        <li className="card criteria-detail-item">
                            <div className="criteria-info">
                                <h3>📍 Région</h3>
                            </div>
                            <div className="criteria-score">{score.score_region} / 15</div>
                        </li>

                        <li className="card criteria-detail-item">
                            <div className="criteria-info">
                                <h3>🔧 Carnet d'entretien</h3>
                            </div>
                            <div className="criteria-score">{score.score_entretien} / 10</div>
                        </li>

                        <li className="card criteria-detail-item">
                            <div className="criteria-info">
                                <h3>✅ Contrôle technique</h3>
                            </div>
                            <div className="criteria-score">{score.score_tc} / 5</div>
                        </li>

                    </ul>

                </section>
                {/* ANALYSE FINANCIERE */}
                <section aria-labelledby="finance-title">
                    <h2 id="finance-title">Analyse financière</h2>
                    <div className="grid">
                        <div className="card">
                            <h3>💰 Coût mensuel estimé</h3>
                            <p className="card-value">{score.cout_mensuel} €</p>
                            <p className="card-hint">Entretien courant et dépréciation mensuelle inclus</p>
                        </div>
                        <div className="card">
                            <h3>📉 Dépréciation annuelle</h3>
                            <p className="card-value">~{score.perte_annuelle} €</p>
                            <p className="card-hint">Estimation basée sur le taux de dépréciation moyen</p>
                        </div>
                        <div className="card">
                            <h3>📆 Période de revente conseillée</h3>
                            <p className="card-value">{score.periode_revente}</p>
                            <p className="card-hint">Les prix sont mieux soutenus avant les vacances d'été</p>
                        </div>
                    </div>
                </section>

                {/* RECOMMANDATION FINALE */}
                <section className="card tip-card" aria-labelledby="reco-title">
                    <h2 id="reco-title">📋 Recommandation CarScore</h2>
                    <p>Score global : <strong>{score.score_global}/100</strong></p>
                    <p className={
                        score.score_global >= 80 ? 'score-etat excellent' :
                        score.score_global >= 60 ? 'score-etat bon' :
                        score.score_global >= 40 ? 'score-etat moyen' :
                        'score-etat critique'
                    }>
                        {score.score_global >= 80 ? '🏆 Excellent état' :
                        score.score_global >= 60 ? '👍 Bon état' :
                        score.score_global >= 40 ? '⚠️ État moyen' :
                        '🚨 État critique'}
                    </p>
                    <p>
                        {score.score_global >= 80
                            ? `Votre véhicule présente un excellent profil avec un score de ${score.score_global}/100. Son kilométrage maîtrisé et son bon entretien constituent des atouts significatifs sur le marché de l'occasion français.`
                            : score.score_global >= 60
                            ? `Votre véhicule présente un bon profil avec un score de ${score.score_global}/100. Il reste compétitif sur le marché de l'occasion français mais quelques points peuvent être améliorés.`
                            : score.score_global >= 40
                            ? `Votre véhicule présente un profil moyen avec un score de ${score.score_global}/100. Sa valeur commence à baisser significativement sur le marché de l'occasion français.`
                            : `Votre véhicule présente un profil critique avec un score de ${score.score_global}/100. Sa valeur diminue rapidement sur le marché de l'occasion français.`
                        }
                    </p>
                    <p className="score-etat-phrase">
                        {score.score_global >= 80
                            ? 'Votre voiture a encore beaucoup de valeur sur le marché.'
                            : score.score_global >= 60
                            ? 'Votre voiture reste compétitive, gardez-la encore 1 à 2 ans.'
                            : score.score_global >= 40
                            ? 'Envisagez la revente dans les 6 prochains mois.'
                            : 'Vendez rapidement avant de perdre encore plus de valeur.'}
                    </p>
                    <p>Notre recommandation : <strong>{score.recommandation}</strong></p>
                    <p>Période idéale de revente : <strong>{score.periode_revente}</strong></p>
                </section>

            </main>

            <Footer />
        </>
    )
}