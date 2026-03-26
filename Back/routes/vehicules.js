const express = require('express');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/vehicules', async (req, res) => {
    const { marque, modele, annee, kilometrage, carburant, region, entretien, ct } = req.body;

    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.decode(token);
    const user_id = decoded.id;

    const ajouterVehicule = await sql`INSERT INTO vehicules ( user_id, marque, modele, annee, kilometrage, carburant, region, entretien, ct ) 
    VALUES (${user_id},${marque}, ${modele}, ${annee}, ${kilometrage}, ${carburant}, ${region}, ${entretien}, ${ct}) RETURNING *`;
    res.json({ message: 'Vehicule ajoute avec succes ✅', vehicule: ajouterVehicule[0]});
});

router.get('/vehicules', async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.decode(token);
    const user_id = decoded.id;

    const vehicules = await sql`
        SELECT vehicules.*, scores.score_global 
        FROM vehicules 
        LEFT JOIN scores ON vehicules.id = scores.vehicule_id
        WHERE vehicules.user_id = ${user_id}
    `;
    res.json(vehicules);
})

router.delete('/vehicules/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await sql`DELETE FROM vehicules WHERE id = ${id}`;
    res.json(result);

})


module.exports = router