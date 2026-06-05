import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')

    async function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault()
        setErreur('')
        setMessage('')

        // Vérifier que les mots de passe correspondent
        if (password !== confirm) {
            setErreur('Les mots de passe ne correspondent pas !')
            return
        }

        const response = await fetch(`https://projet-carscore.onrender.com/api/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })

        const data = await response.json()

        if (data.erreur) {
            setErreur(data.erreur)
        } else {
            setMessage(data.message)
            setTimeout(() => navigate('/login'), 2000)
        }
    }

    return (

        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>🔐 Nouveau mot de passe</h2>
            <p>Entrez votre nouveau mot de passe.</p>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                />
                <button type="submit">Modifier le mot de passe</button>
            </form>

            {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    )
}