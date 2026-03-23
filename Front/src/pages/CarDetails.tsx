import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function CarDetails() {

    const [score, setScore] = useState<any>(null);
    const { id } = useParams();


useEffect(() => {
async function chargerScore() {
        const response = await fetch(`http://localhost:5000/api/scores/${id}`, {
            headers: {
                'authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        const data = await response.json()
        setScore(data.score)
    }
    chargerScore()
}, [])
if (!score) return <p>Chargement...</p>

return (
    <div>
        <h1>Detail du véhicule</h1>
        <p>Score global : {score.score_global}/100</p>
        <p>Score kilométrage : {score.score_kilometrage}/20</p>
        <p>Score année : {score.score_annee}/20</p>
        <p>Score carburant : {score.score_carburant}/15</p>
        <p>Score région : {score.score_region}/15</p>
        <p>Score entretien : {score.score_entretien}/10</p>
        <p>Score CT : {score.score_tc}/5</p>
        <p>Recommandation : {score.recommandation}</p>
        <p>Coût mensuel : {score.cout_mensuel} €</p>
        <p>Dépréciation : {score.depreciation} %/an</p>
        <p>Perte annuelle : {score.perte_annuelle} €/an</p>
    </div>
)
};