import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: any) {
    const token = sessionStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    }

    const decoded = JSON.parse(atob(token.split('.')[1]))
    if(decoded.role !== 'admin'){
        return(
            <main className='container'>
                <section>
                    <h2>Accés refusé</h2>
                    <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
                </section>
            </main>
        )
        return children
    }
}