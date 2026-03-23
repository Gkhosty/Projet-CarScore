import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCar() {
    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [annee, setAnnee] = useState('');
    const [kilometrage, setKilometrage] = useState('');
    const [carburant, setCarburant] = useState('');
    const [region, setRegion] = useState('');
    const [entretien, setEntretien] = useState('');
    const [ct, setCt] = useState('');
    const navigate = useNavigate();

    async function handleAddCar(event: any) {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/vehicules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({ marque, modele, annee, kilometrage, carburant, region, entretien, ct })
        });
        const data = await response.json()
        if (data.message) {
            await fetch('http://localhost:5000/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({ vehicule_id: data.vehicule.id })
            })
            navigate('/dashboard')
        }
    }

    return (
        <div>
            <h1>Ajouter un véhicule</h1>
            <form onSubmit={handleAddCar}>
                <input type="text" placeholder="Marque" value={marque} onChange={(event) => setMarque(event.target.value)} />
                <input type="text" placeholder="Modele" value={modele} onChange={(event) => setModele(event.target.value)} />
                <input type="number" placeholder="Annee" value={annee} onChange={(event) => setAnnee(event.target.value)} />
                <input type="number" placeholder="Kilometrage" value={kilometrage} onChange={(event) => setKilometrage(event.target.value)} />
                <select value={carburant} onChange={(event) => setCarburant(event.target.value)}>
                    <option value="">--Choisir le carburant--</option>
                    <option value="essence">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybride">Hybride</option>
                    <option value="electrique">Electrique</option>
                    <option value="gpl">GPL</option>
                </select>
                <select value={region} onChange={(event) => setRegion(event.target.value)}>
                    <option value="">-- Choisir la region --</option>
                    <option value="paris">Paris</option>
                    <option value="idf">Île-de-France</option>
                    <option value="lyon">Lyon</option>
                    <option value="marseille">Marseille</option>
                    <option value="bordeaux">Bordeaux</option>
                    <option value="toulouse">Toulouse</option>
                    <option value="nantes">Nantes</option>
                    <option value="province">Province</option>
                </select>
                <select value={entretien} onChange={(event) => setEntretien(event.target.value)}>
                    <option value="">-- Etat du carnet d'entretien --</option>
                    <option value="complet">Complet</option>
                    <option value="partiel">Partiel</option>
                    <option value="absent">Absent</option>
                </select>
                <select value={ct} onChange={(event) => setCt(event.target.value)}>
                    <option value="">-- Controle technique --</option>
                    <option value="valide">Valide</option>
                    <option value="bientot">Bientot</option>
                    <option value="depasse">Depasse</option>
                </select>
                <button type="submit">Ajouter le véhicule</button>
            </form>
        </div>
    )
}