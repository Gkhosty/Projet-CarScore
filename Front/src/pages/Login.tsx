import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erreur, setErreur] = useState('')
    const navigate = useNavigate();

    async function handleLogin(event: any) {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (data.token) {
            sessionStorage.setItem('token', data.token)
            const decoded = JSON.parse(atob(data.token.split('.')[1]))
            if (decoded.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }
        } else {
            setErreur(data.erreur)
        }
    }

    return (
        <>
            <Header type="auth" />

            <main className="container">
                <section className="form-section" aria-labelledby="login-title">
                    <h2 id="login-title">Connexion</h2>
                    <p className="form-subtitle">Accédez à votre espace personnel et consultez l'analyse de vos véhicules.</p>

                    <form onSubmit={handleLogin} noValidate aria-label="Formulaire de connexion">

                        <div className="form-group">
                            <label htmlFor="email">Adresse e-mail</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Votre adresse e-mail"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Votre mot de passe"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {erreur && <p className="erreur">{erreur}</p>}

                        <button type="submit" className="btn-full">Se connecter</button>

                    </form>

                    <p className="form-link">
                        Vous n'avez pas encore de compte ?{' '}
                        <button onClick={() => navigate('/register')}>Créer un compte</button>
                    </p>

                </section>
            </main>

                <Footer />
        </>
    )
}