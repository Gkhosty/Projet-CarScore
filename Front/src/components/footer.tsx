
export default function Footer() {
    return (
        <footer>
            <div className="footer-dark">
                <div className="footer-stat-block">
                    <span className="footer-stat-number">38 000 000</span>
                    <span className="footer-stat-label">propriétaires de véhicules en France</span>
                </div>
                <p className="footer-slogan">Un score. Une recommandation. Une décision.</p>
            </div>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>🚗 CarScore</h3>
                    <p>Le Credit Score de la voiture française.</p>
                </div>
                <div className="footer-section">
                    <h3>Sources</h3>
                    <ul>
                        <li><a href="https://www.largus.fr" target="_blank">L'Argus</a></li>
                        <li><a href="https://www.lacentrale.fr" target="_blank">La Centrale</a></li>
                        <li><a href="https://www.carizy.com" target="_blank">Carizy</a></li>
                        <li><a href="https://www.gouvernement.fr/zfe" target="_blank">Gouvernement ZFE</a></li>
                        <li><a href="https://www.elite-auto.fr" target="_blank">Elite Auto</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Réseaux sociaux</h3>
                    <ul>
                        <li><a href="https://github.com" target="_blank">GitHub</a></li>
                        <li><a href="https://linkedin.com" target="_blank">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <p className="footer-bottom">© 2026 CarScore — Tous droits réservés</p>
        </footer>
    )
}