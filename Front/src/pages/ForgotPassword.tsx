import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErreur('')
        setMessage('')

        const response = await fetch('https://projet-carscore.onrender.com/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })

        const data = await response.json()

        if (data.erreur) {
            setErreur(data.erreur)
        } else {
            setMessage(data.message)
        }
    }

    return (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>🔐 Mot de passe oublié</h2>
            <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
                <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Envoyer le lien</button>
            </form>

            {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <button onClick={() => navigate('/login')}>
                Retour à la connexion
            </button>
        </div>
    )
}