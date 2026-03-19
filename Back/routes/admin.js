const express = require('express');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();
const verifierToken = require('../middleware/auth')

router.get('/admin/stats', verifierToken, async (req, res) =>{
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
});

router.get('/admin/users', verifierToken, async (req, res) =>{
    const users = await sql`SELECT id, nom, email, role, created_at FROM users`;
    res.json({ users });
});

router.put('/admin/users/:id', verifierToken, async (req, res) =>{
    const id = parseInt(req.params.id);
    await sql`UPDATE users SET role = 'inactif' WHERE id =${id}`;
    res.json({ message: 'Utilisateur desactive ✅' });
});

router.delete('/admin/users/:id', verifierToken, async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await sql`DELETE FROM users WHERE id = ${id}`;
    res.json(result);

});

module.exports = router;