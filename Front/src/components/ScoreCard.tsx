export default function ScoreCard({ vehicule, score }: any) {
    return (
        <div>
            <h3>{vehicule.marque} {vehicule.modele}</h3>
            <p>Année : {vehicule.annee}</p>
            <p>Score : {score}/100</p>
        </div>
    )
}