import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [erreur, setErreur] = useState('');
    const navigate = useNavigate();

    async function handleRegister(event: any) {
        event.preventDefault()

        // Vérification que les mots de passe correspondent
        if (password !== confirmPassword) {
            setErreur('Les mots de passe ne correspondent pas ❌')
            return
        }

        const response = await fetch('https://projet-carscore.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, email, password })
        })
        console.log('status:', response.status)
        const data = await response.json()
        console.log('Response complete:', data)
        if (data.message) {
            navigate('/login')
        } else {
            setErreur(data.erreur || JSON.stringify(data))
        }
    }

    return (
        <>
            <Header type="auth" />

            <main className="container">
                <section className="form-section" aria-labelledby="register-title">
                    <h2 id="register-title">Créer un compte</h2>
                    <p className="form-subtitle">Accédez à votre tableau de bord personnel et commencez à analyser vos véhicules.</p>

                    <form onSubmit={handleRegister} noValidate aria-label="Formulaire d'inscription">

                        <div className="form-group">
                            <label htmlFor="nom">Nom complet</label>
                            <input
                                type="text"
                                id="nom"
                                placeholder="Votre nom et prénom"
                                value={nom}
                                onChange={(event) => setNom(event.target.value)}
                                required
                                autoComplete="name"
                            />
                        </div>

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
                                placeholder="Minimum 12 caractères"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Répétez votre mot de passe"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        {erreur && <p className="erreur">{erreur}</p>}

                        <button type="submit" className="btn-full">Créer mon compte</button>

                    </form>

                    <p className="form-link">
                        Vous avez déjà un compte ?{' '}
                        <button onClick={() => navigate('/login')}>Se connecter</button>
                    </p>

                </section>
            </main>

                    <Footer />
        </>
    )
}