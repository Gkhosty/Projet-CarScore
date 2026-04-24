import { useState, useEffect } from "react";
import type { User } from "../types/index";
import Footer from "../components/footer";
import Header from "../components/header";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [users, setUsers] = useState<User[]>([])
    const [analyses, setAnalyses] = useState<any[]>([])

    useEffect(() => {
        async function chargerDonnees() {
            const token = sessionStorage.getItem('token')
            const headers = { 'authorization': 'Bearer ' + token }

            const resStats = await fetch('http://projet-carscore.onrender.com/api/admin/stats', { headers })
            const dataStats = await resStats.json()
            setStats(dataStats)

            const resUsers = await fetch('http://projet-carscore.onrender.com/api/admin/users', { headers })
            const dataUsers = await resUsers.json()
            setUsers(dataUsers.users || [])

            const resAnalyses = await fetch('http://projet-carscore.onrender.com/api/admin/analyses', { headers })
            const dataAnalyses = await resAnalyses.json()
            setAnalyses(dataAnalyses.analyses || [])
        }
        chargerDonnees()
    }, [])

    async function desactiverUser(id: number) {
        const token = sessionStorage.getItem('token')
        await fetch(`http://projet-carscore.onrender.com/api/admin/users/${id}`, {
            method: 'PUT',
            headers: { 'authorization': 'Bearer ' + token }
        })
        setUsers(users.map((u: any) => u.id === id ? { ...u, role: 'inactif' } : u))
    }

    async function supprimerUser(id: number) {
        const token = sessionStorage.getItem('token')
        await fetch(`http://projet-carscore.onrender.com/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: { 'authorization': 'Bearer ' + token }
        })
        setUsers(users.filter((u: any) => u.id !== id))
    }

    if (!stats) return <p>Chargement...</p>

    return (
        <>
            <Header type="admin" />

            <main className="container">

                {/* KPI */}
                <section aria-labelledby="kpi-title">
                    <h2 id="kpi-title">Vue d'ensemble</h2>
                    <ul className="grid kpi-grid" role="list">
                        <li className="card kpi-card kpi-blue">
                            <p className="kpi-label">👥 Utilisateurs inscrits</p>
                            <p className="kpi-value">{stats.totalUsers}</p>
                        </li>
                        <li className="card kpi-card kpi-green">
                            <p className="kpi-label">🚘 Analyses effectuées</p>
                            <p className="kpi-value">{stats.totalScores}</p>
                        </li>
                        <li className="card kpi-card kpi-blue">
                            <p className="kpi-label">⭐ Score moyen global</p>
                            <p className="kpi-value">{stats.scoreMoyen}<span className="kpi-value-suffix">/100</span></p>
                        </li>
                        <li className="card kpi-card kpi-orange">
                            <p className="kpi-label">🚗 Véhicules enregistrés</p>
                            <p className="kpi-value">{stats.totalVehicules}</p>
                        </li>
                    </ul>
                </section>

                {/* TABLEAU UTILISATEURS */}
                <section aria-labelledby="users-title">
                    <h2 id="users-title">Utilisateurs</h2>
                    <div className="card table-wrapper">
                        <table aria-label="Liste des utilisateurs">
                            <thead>
                                <tr>
                                    <th scope="col">Utilisateur</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rôle</th>
                                    <th scope="col">Inscription</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: any) => (
                                    <tr key={user.id}>
                                        <td>{user.nom}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={user.role === 'admin' ? 'status-active' : user.role === 'inactif' ? 'status-inactive' : 'status-active'}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.created_at).toLocaleDateString('fr-FR')}</td>
                                        <td>
                                            {user.role !== 'inactif' ? (
                                                <button className="action-btn danger" onClick={() => desactiverUser(user.id)}>Désactiver</button>
                                            ) : (
                                                <button className="action-btn danger" onClick={() => supprimerUser(user.id)}>Supprimer</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* TABLEAU ANALYSES */}
                <section aria-labelledby="analyses-title">
                    <h2 id="analyses-title">Analyses récentes</h2>
                    <div className="card table-wrapper">
                        <table aria-label="Liste des analyses récentes">
                            <thead>
                                <tr>
                                    <th scope="col">Véhicule</th>
                                    <th scope="col">Utilisateur</th>
                                    <th scope="col">Score</th>
                                    <th scope="col">Carburant</th>
                                    <th scope="col">Région</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analyses.map((analyse: any) => (
                                    <tr key={analyse.id}>
                                        <td>{analyse.marque} {analyse.modele} — {analyse.annee}</td>
                                        <td>{analyse.nom}</td>
                                        <td>
                                            <span className={
                                                analyse.score_global >= 80 ? 'score-circle excellent' :
                                                analyse.score_global >= 60 ? 'score-circle good' :
                                                analyse.score_global >= 40 ? 'score-circle medium' :
                                                'score-circle critical'
                                            }>
                                                {analyse.score_global}
                                            </span>
                                        </td>
                                        <td>
                                        <span className={
                                            analyse.carburant === 'hybride' || analyse.carburant === 'electrique' ? 'badge badge-green' :
                                            analyse.carburant === 'essence' ? 'badge badge-blue' :
                                            analyse.carburant === 'diesel' ? 'badge' :
                                            'badge badge-orange'
                                        }>
                                            {analyse.carburant}
                                        </span>
                                    </td>
                                        <td style={{ textTransform: 'capitalize' }}>{analyse.region}</td>
                                        <td>{new Date(analyse.created_at).toLocaleDateString('fr-FR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}