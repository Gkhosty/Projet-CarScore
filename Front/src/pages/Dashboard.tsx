import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [vehicules, setVehicules] = useState([]);
    const navigate = useNavigate();

useEffect(() => {
    async function chargerVehicules() {
        const response = await fetch('http://localhost:5000/api/vehicules', {
            headers: {
                'authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        const data = await response.json()
        setVehicules(data)
    }
    chargerVehicules()
}, [])
return (
    <div>
        <h1>Mon Dashboard</h1>
        {vehicules.map((vehicule: any) => (
            <div key={vehicule.id} onClick={() => navigate(`/car/${vehicule.id}`)}>
                <p>{vehicule.marque} {vehicule.modele}</p>
                <p>{vehicule.annee}</p>
            </div>
        ))}
    </div>
)
};