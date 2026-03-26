import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Home() {
    const navigate = useNavigate()

    return (
        <>
            <Header type="public" />

            <main>

                {/* HERO */}
                <section className="hero container" aria-labelledby="hero-title">
                    <h2 id="hero-title">Le Credit Score de votre Voiture</h2>
                    <p>CarScore  analyse votre véhicule selon les critères réels du marché automobile français et vous délivre un score sur 100, accompagné d'une recommandation personnalisée : conserver ou revendre.</p>
                    <button className="btn" onClick={() => navigate('/register')}>Analyser mon véhicule</button>
                </section>

                {/* COMMENT CA MARCHE */}
                <section className="container section-block" aria-labelledby="how-title">
                    <h2 id="how-title">Comment ça fonctionne</h2>
                    <ol className="steps-list grid" role="list">
                        <li className="card">
                            <span className="step-number">1</span>
                            <h3>Créez votre compte</h3>
                            <p>Inscription gratuite, sans carte bancaire. Votre espace personnel est sécurisé et accessible à tout moment.</p>
                        </li>
                        <li className="card">
                            <span className="step-number">2</span>
                            <h3>Renseignez votre véhicule</h3>
                            <p>Saisissez les 6 critères clés de votre voiture : kilométrage, année, type de carburant, région, état du carnet d'entretien et du contrôle technique.</p>
                        </li>
                        <li className="card">
                            <span className="step-number">3</span>
                            <h3>Recevez votre analyse</h3>
                            <p>CarScore calcule votre score sur 100 et vous fournit une recommandation claire, fondée sur les données réelles du marché.</p>
                        </li>
                    </ol>
                </section>

                {/* LES 6 CRITERES */}
                <section className="container section-block" aria-labelledby="criteria-title">
                    <h2 id="criteria-title">Une analyse fondée sur 6 critères du marché français</h2>
                    <p className="section-subtitle">CarScore ne se limite pas à l'année et au kilométrage. Notre algorithme intègre les facteurs qui influencent réellement la valeur et la liquidité d'un véhicule en France.</p>
                    <ul className="grid criteria-list" role="list">
                        <li className="card">
                            <span className="criteria-icon">📏</span>
                            <h3>Kilométrage</h3>
                            <p>Indicateur principal de l'usure mécanique. Un kilométrage élevé accélère la dépréciation et réduit l'attractivité à la revente.</p>
                        </li>
                        <li className="card">
                            <span className="criteria-icon">📅</span>
                            <h3>Année de mise en circulation</h3>
                            <p>Un véhicule neuf perd entre 15 et 30 % de sa valeur dès la première année, puis environ 10 % par an les années suivantes.</p>
                        </li>
                        <li className="card">
                            <span className="criteria-icon">⛽</span>
                            <h3>Type de carburant</h3>
                            <p>Le diesel subit une décote significative dans les grandes agglomérations en raison des Zones à Faibles Émissions.</p>
                        </li>
                        <li className="card">
                            <span className="criteria-icon">📍</span>
                            <h3>Région</h3>
                            <p>La localisation du véhicule influence directement sa valeur marchande.</p>
                        </li>
                        <li className="card">
                            <span className="criteria-icon">🔧</span>
                            <h3>Carnet d'entretien</h3>
                            <p>Un historique d'entretien incomplet peut entraîner une décote de 10 à 15 % sur le prix de revente.</p>
                        </li>
                        <li className="card">
                            <span className="criteria-icon">✅</span>
                            <h3>Contrôle technique</h3>
                            <p>Un contrôle technique valide est un signal de confiance fort pour l'acheteur.</p>
                        </li>
                    </ul>
                </section>

                {/* POURQUOI CARSCORE */}
                <section className="container section-block" aria-labelledby="why-title">
                    <h2 id="why-title">Ce que CarScore apporte</h2>
                    <div className="grid">
                        <article className="card">
                            <h3>🏆 Un score global sur 100</h3>
                            <p>Aucune plateforme existante ne propose un score synthétique intégrant l'ensemble de ces critères pour les particuliers.</p>
                        </article>
                        <article className="card">
                            <h3>🎯 Une recommandation actionnée</h3>
                            <p>Au-delà d'une estimation de prix, CarScore vous indique clairement si votre véhicule mérite d'être conservé ou s'il est préférable de le revendre.</p>
                        </article>
                        <article className="card">
                            <h3>💰 Entièrement gratuit</h3>
                            <p>CarScore AI est accessible sans abonnement ni frais cachés.</p>
                        </article>
                    </div>
                </section>

                {/* GRILLE DE SCORE */}
                <section className="container section-block" aria-labelledby="grid-title">
                    <h2 id="grid-title">Comprendre votre score</h2>
                    <ul className="score-grid" role="list">
                        <li className="score-item score-green">
                            <strong>80 — 100</strong>
                            <span>Excellent état</span>
                            <p>Votre véhicule conserve une forte valeur marchande. Il est recommandé de le conserver.</p>
                        </li>
                        <li className="score-item score-blue">
                            <strong>60 — 79</strong>
                            <span>Bon état</span>
                            <p>Votre véhicule reste bien valorisé. Une revente dans 1 à 2 ans est envisageable.</p>
                        </li>
                        <li className="score-item score-orange">
                            <strong>40 — 59</strong>
                            <span>État moyen</span>
                            <p>La dépréciation s'accélère. Une mise en vente dans les 6 prochains mois est conseillée.</p>
                        </li>
                        <li className="score-item score-red">
                            <strong>0 — 39</strong>
                            <span>État critique</span>
                            <p>Votre véhicule perd rapidement de la valeur. Une revente rapide est fortement recommandée.</p>
                        </li>
                    </ul>
                </section>

                {/* CTA FINAL */}
                <section className="hero container cta-final" aria-labelledby="cta-title">
                    <h2 id="cta-title">Prenez les bonnes décisions pour votre véhicule</h2>
                    <p>Rejoignez CarScore et obtenez une analyse complète et personnalisée de votre voiture.</p>
                    <button className="btn" onClick={() => navigate('/register')}>Analyser mon véhicule</button>
                </section>

            </main>

            <Footer />
        </>
    )
}