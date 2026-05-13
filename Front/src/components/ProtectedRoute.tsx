import { Navigate } from 'react-router-dom'

// Seulement pour les admins
export function ProtectedRouteAdmin({ children }: any) {
    const token = sessionStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    }

    const decoded = JSON.parse(atob(token.split('.')[1]))

    if (decoded.role !== 'admin') {
        return (
            <main className='container'>
                <section>
                    <h2>Accès refusé</h2>
                    <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
                </section>
            </main>
        )
    }

    return children
}

// Seulement pour les users (pas les admins)
export function ProtectedRouteUser({ children }: any) {
    const token = sessionStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    }

    const decoded = JSON.parse(atob(token.split('.')[1]))

    if (decoded.role === 'admin') {
        return <Navigate to="/admin" />
    }

    return children
}