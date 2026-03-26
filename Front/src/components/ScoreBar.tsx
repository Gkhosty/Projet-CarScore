export default function ScoreBar({ label, score, max }: any) {
    const pourcentage = (score / max) * 100

    return (
        <div>
            <p>{label} : {score}/{max}</p>
            <div style={{ width: '100%', backgroundColor: '#eee' }}>
                <div style={{ width: `${pourcentage}%`, backgroundColor: '#4F46E5', height: '10px' }}></div>
            </div>
        </div>
    )
}