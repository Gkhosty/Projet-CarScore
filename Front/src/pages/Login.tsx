import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erreur, setErreur] = useState('')
    const navigate = useNavigate();

    async function handleLogin(event: any){
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
})
    const data = await response.json()
    if(data.token){
        sessionStorage.setItem('token', data.token)
        navigate('/dashboard')
    } else {
        setErreur(data.erreur)
    }}
return (
    <div>
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Se connecter</button>
            {erreur && <p>{erreur}</p>}
        </form>
    </div>
)
};