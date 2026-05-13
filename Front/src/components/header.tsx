import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ type }: { type: string }) {
    const navigate = useNavigate()
    const [menuOuvert, setMenuOuvert] = useState(false)
    const [nom, setNom] = useState('')

    // Récupère le nom depuis Neon via /me
    useEffect(function() {
        async function chargerNom() {
            const response = await fetch('https://projet-carscore.onrender.com/api/me', {
                headers: {
                    'authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            setNom(data.user.nom)
        }
        if (type === 'user' || type === 'admin') {
            chargerNom()
        }
    }, [])

    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/login')
    }

    function handleLogo() {
        const token = sessionStorage.getItem('token')
        if (token) {
            const decoded = JSON.parse(atob(token.split('.')[1]))
            if (decoded.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }
        } else {
            navigate('/')
        }
    }

    return (
        <header>
            <nav className="container" aria-label="Navigation principale">

                {/* LOGO */}
                <h1 className="logo" style={{ cursor: 'pointer' }} onClick={handleLogo}>
                    🚗 CarScore
                </h1>

                {/* BOUTON HAMBURGER — visible seulement sur mobile */}
                <button
                    className="hamburger"
                    onClick={function() { setMenuOuvert(!menuOuvert) }}
                    aria-label="Menu"
                >
                    {menuOuvert ? '✕' : '☰'}
                </button>

                {/* HOME */}
                {type === 'public' && (
                    <ul role="list" className={`nav-menu ${menuOuvert ? 'ouvert' : ''}`}>
                        <li><button onClick={function() { setMenuOuvert(false); navigate('/') }}>Accueil</button></li>
                        <li><button onClick={function() { setMenuOuvert(false); navigate('/login') }}>Connexion</button></li>
                        <li><button className="btn-nav" onClick={function() { setMenuOuvert(false); navigate('/register') }}>Créer un compte</button></li>
                    </ul>
                )}

                {/* LOGIN + REGISTER — pas de nav */}
                {type === 'auth' && null}

                {/* DASHBOARD + ADDCAR + CARDETAILS */}
                {type === 'user' && (
                    <ul role="list" className={`nav-menu ${menuOuvert ? 'ouvert' : ''}`}>
                        <li><span className='header-nom'>{nom}</span></li>
                        <li><button className="btn-nav" onClick={function() { setMenuOuvert(false); navigate('/add-car') }}>+ Ajouter un véhicule</button></li>
                        <li><button onClick={function() { setMenuOuvert(false); handleLogout() }}>Déconnexion</button></li>
                    </ul>
                )}

                {/* ADMIN */}
                {type === 'admin' && (
                    <ul role="list" className={`nav-menu ${menuOuvert ? 'ouvert' : ''}`}>
                        <li><span className="admin-badge">Administration</span></li>
                        <li><button onClick={function() { setMenuOuvert(false); handleLogout() }}>Déconnexion</button></li>
                    </ul>
                )}

            </nav>
        </header>
    )
}