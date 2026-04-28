const express = require('express');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();
const verifierToken = require('../middleware/auth');
const { asyncHandler } = require('../utils/handler');

router.get('/admin/stats', verifierToken, asyncHandler(async(req, res) => {
    const totalUsers = await sql`SELECT COUNT(*) FROM users`;
    const totalVehicules = await sql`SELECT COUNT(*) FROM vehicules`;
    const totalScores = await sql`SELECT COUNT(*) FROM scores`;
    const scoreMoyen = await sql`SELECT AVG(score_global) FROM scores`;
    res.json({
        totalUsers: totalUsers[0].count,
        totalVehicules: totalVehicules[0].count,
        totalScores: totalScores[0].count,
        scoreMoyen: Math.round(scoreMoyen[0].avg)
    });
}));

router.get('/admin/users', verifierToken, asyncHandler(async(req, res) => {
    const users = await sql`SELECT id, nom, email, role, verifie, created_at FROM users`;
    res.json({ users });
}));

router.put('/admin/users/:id', verifierToken, asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    await sql`UPDATE users SET role = 'inactif' WHERE id = ${id}`;
    res.json({ message: 'Utilisateur desactive ✅' });
}));

router.delete('/admin/users/:id', verifierToken, asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const result = await sql`DELETE FROM users WHERE id = ${id}`;
    res.json(result);
}));

router.get('/admin/analyses', verifierToken, asyncHandler(async(req, res) => {
    const analyses = await sql`
        SELECT 
            scores.id,
            scores.score_global,
            scores.created_at,
            vehicules.marque,
            vehicules.modele,
            vehicules.annee,
            vehicules.carburant,
            vehicules.region,
            users.nom
        FROM scores
        JOIN vehicules ON scores.vehicule_id = vehicules.id
        JOIN users ON vehicules.user_id = users.id
        ORDER BY scores.created_at DESC
        LIMIT 10
    `;
    res.json({ analyses });
}));

module.exports = router;