import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function AddCar() {
    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [annee, setAnnee] = useState('');
    const [kilometrage, setKilometrage] = useState('');
    const [carburant, setCarburant] = useState('');
    const [region, setRegion] = useState('');
    const [entretien, setEntretien] = useState('');
    const [ct, setCt] = useState('');
    const [nombreVehicules, setNombreVehicules] = useState(0)
    const navigate = useNavigate();

    useEffect(function() {
        async function verifierNombreVehicules() {
            const response = await fetch('http://localhost:5000/api/vehicules', {
                headers: {
                    'authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            });
            const data = await response.json()
            setNombreVehicules(data.length)
        }
        verifierNombreVehicules()
    }, []);

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
        if(data.erreur){
            alert(data.erreur)
            return
        }
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

    if ( nombreVehicules >=5){
        return (<>
        <Header type= "user" />
        <main className="container">
            <section>
                <h2>Limite atteinte !</h2>
                <p>Vous avez atteint la limite de 5 véhicules. Supprimez un véhicule pour ajouter un nouveau.</p>
                <button className="btn" onClick={function() { navigate('/dashboard') }}>Retour au dashboard</button>
            </section>
        </main>
        </>)
    }

    return (
        <>
            <Header type="user" />

            <main className="container">
                <section aria-labelledby="add-car-title">
                    <h2 id="add-car-title">Ajouter un véhicule</h2>
                    <p className="form-subtitle">Renseignez les informations de votre véhicule. Ces données permettent à CarScore AI de calculer un score précis et représentatif du marché automobile français.</p>

                    <form onSubmit={handleAddCar} noValidate aria-label="Formulaire d'ajout de véhicule">

                        {/* INFOS DE BASE */}
                        <fieldset>
                            <legend>Informations générales</legend>

                            <div className="form-group">
                                <label htmlFor="marque">Marque</label>
                                <input
                                    type="text"
                                    id="marque"
                                    placeholder="Ex : Peugeot, Renault, BMW"
                                    value={marque}
                                    onChange={(event) => setMarque(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="modele">Modèle</label>
                                <input
                                    type="text"
                                    id="modele"
                                    placeholder="Ex : 208, Clio, Série 3"
                                    value={modele}
                                    onChange={(event) => setModele(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="annee">Année de mise en circulation</label>
                                    <input
                                        type="number"
                                        id="annee"
                                        placeholder="Ex : 2018"
                                        min="1990"
                                        max="2026"
                                        value={annee}
                                        onChange={(event) => setAnnee(event.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="kilometrage">Kilométrage (km)</label>
                                    <input
                                        type="number"
                                        id="kilometrage"
                                        placeholder="Ex : 65 000"
                                        min="0"
                                        value={kilometrage}
                                        onChange={(event) => setKilometrage(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                        </fieldset>

                        {/* CRITERES DE SCORING */}
                        <fieldset>
                            <legend>Critères d'évaluation</legend>

                            <div className="form-group">
                                <label htmlFor="carburant">Type de carburant</label>
                                <select id="carburant" value={carburant} onChange={(event) => setCarburant(event.target.value)} required>
                                    <option value="" disabled>Sélectionnez le type de carburant</option>
                                    <option value="essence">Essence</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="hybride">Hybride</option>
                                    <option value="electrique">Électrique</option>
                                    <option value="gpl">GPL</option>
                                </select>
                                <small className="form-hint">Le type de carburant impacte la valeur de revente, notamment en Île-de-France où les véhicules diesel sont soumis aux restrictions ZFE.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="region">Région</label>
                                <select id="region" value={region} onChange={(event) => setRegion(event.target.value)} required>
                                    <option value="" disabled>Sélectionnez votre région</option>
                                    <option value="paris">Paris (75)</option>
                                    <option value="idf">Île-de-France (hors Paris)</option>
                                    <option value="lyon">Lyon</option>
                                    <option value="marseille">Marseille</option>
                                    <option value="bordeaux">Bordeaux</option>
                                    <option value="toulouse">Toulouse</option>
                                    <option value="nantes">Nantes</option>
                                    <option value="province">Autre région</option>
                                </select>
                                <small className="form-hint">La région influe sur la liquidité du marché et les contraintes environnementales appliquées à votre véhicule.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="entretien">État du carnet d'entretien</label>
                                <select id="entretien" value={entretien} onChange={(event) => setEntretien(event.target.value)} required>
                                    <option value="" disabled>Sélectionnez l'état du carnet</option>
                                    <option value="complet">Complet et à jour</option>
                                    <option value="partiel">Partiellement renseigné</option>
                                    <option value="absent">Non renseigné ou absent</option>
                                </select>
                                <small className="form-hint">Un carnet d'entretien incomplet peut réduire la valeur de revente de 10 à 15 %.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ct">Contrôle technique</label>
                                <select id="ct" value={ct} onChange={(event) => setCt(event.target.value)} required>
                                    <option value="" disabled>Sélectionnez l'état du contrôle technique</option>
                                    <option value="valide">Valide</option>
                                    <option value="bientot">À renouveler dans moins de 6 mois</option>
                                    <option value="depasse">Expiré</option>
                                </select>
                                <small className="form-hint">Un contrôle technique valide renforce la confiance de l'acheteur et soutient le prix de vente.</small>
                            </div>

                        </fieldset>

                        <button type="submit" className="btn-full">Calculer mon score</button>

                    </form>
                </section>
            </main>

                <Footer />
        </>
    )
}