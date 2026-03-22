import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erreur, setErreur] = useState('');
    const navigate = useNavigate();

        async function handRegister(event: any){
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, password })
})
    const data = await response.json()
    if(data.message){
    navigate('/login')
    } else {
        setErreur(data.erreur)
    }}
    return(
        <div>
        <h1>S'inscrire</h1>
        <form onSubmit={handRegister}>
            <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(event) =>setNom(event.target.value)}
            />
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
            <button type="submit">S'inscrire</button>
            {erreur && <p>{erreur}</p>}
        </form>
    </div>
    );
};