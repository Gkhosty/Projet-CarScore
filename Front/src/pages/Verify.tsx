import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API_URL from '../utils/config'

export default function Verify() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [succes, setSucces] = useState<boolean | null>(null)

    useEffect(() => {
        async function verifierCompte() {
            const response = await fetch(`${API_URL}/api/verify/${token}`)
            const data = await response.json()
            if (data.message) {
                setSucces(true)
            } else {
                setSucces(false)
            }
        }
        verifierCompte()
    }, [])

    return (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            {succes === null && <p>Vérification en cours...</p>}

            {succes === false && (
                <div>
                    <h2>✅ Compte validé !</h2>
                    <p>Votre email a été vérifié. Vous pouvez vous connecter.</p>
                    <button onClick={() => navigate('/login')}>Se connecter</button>
                </div>
            )}

            {succes === true && (
                <div>
                    <h2>❌ Lien invalide !</h2>
                    <p>Ce lien est invalide ou déjà utilisé.</p>
                    <button onClick={() => navigate('/register')}>Créer un compte</button>
                </div>
            )}
        </div>
    )
}