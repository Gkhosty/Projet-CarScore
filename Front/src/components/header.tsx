import { useNavigate } from 'react-router-dom'

export default function Header({ type }: { type: string }) {
    const navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <header>
            <nav className="container" aria-label="Navigation principale">
                <h1 className="logo">🚗 CarScore </h1>

                {/* HOME */}
                {type === 'public' && (
                    <ul role="list">
                        <li><button onClick={() => navigate('/')}>Accueil</button></li>
                        <li><button onClick={() => navigate('/login')}>Connexion</button></li>
                        <li><button className="btn-nav" onClick={() => navigate('/register')}>Créer un compte</button></li>
                    </ul>
                )}

                {/* LOGIN + REGISTER — pas de nav */}
                {type === 'auth' && null}

                {/* DASHBOARD + ADDCAR + CARDETAILS */}
                {type === 'user' && (
                    <ul role="list">
                        <li><button className="btn-nav" onClick={() => navigate('/add-car')}>+ Ajouter un véhicule</button></li>
                        <li><button onClick={handleLogout}>Déconnexion</button></li>
                    </ul>
                )}

                {/* ADMIN */}
                {type === 'admin' && (
                    <ul role="list">
                        <li><span className="admin-badge">Administration</span></li>
                        <li><button onClick={handleLogout}>Déconnexion</button></li>
                    </ul>
                )}

            </nav>
        </header>
    )
}