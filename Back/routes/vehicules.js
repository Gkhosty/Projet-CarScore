const express = require('express');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();
const verifierToken = require('../middleware/auth');
const { vehiculeSchema } = require('../utils/validators');
const asyncHandler = require('../utils/handler');

router.post('/vehicules', verifierToken, asyncHandler(async(req, res) => {
    
    const { marque, modele, annee, kilometrage, carburant, region, entretien, ct } = req.body;
    // Validation z pour le formulaire
    const result = vehiculeSchema.safeParse({
        marque,
        modele,
        annee: parseInt(annee),
        kilometrage: parseInt(kilometrage),
        carburant,
        region,
        entretien,
        ct
    })
    if(!result.success){
        return res.status(400).json({ erreur: result.error.issues[0].message });
    }
    // ke middleware verifiertoken a deja decodé le token
    const user_id = req.user.id;
    //  On Verifie le nombre de vehicule avant d'ajouter
    const count = await sql`SELECT COUNT(*) FROM vehicules WHERE user_id = ${user_id}`;
    const nombreVehicules = parseInt(count[0].count);

    if (nombreVehicules >= 5){
        return res.status(400).json({ erreur: 'Vous avez atteint la limite de 5 véhicules !' })
    }

    const ajouterVehicule = await sql`INSERT INTO vehicules ( user_id, marque, modele, annee, kilometrage, carburant, region, entretien, ct ) 
    VALUES (${user_id},${marque}, ${modele}, ${annee}, ${kilometrage}, ${carburant}, ${region}, ${entretien}, ${ct}) RETURNING *`;
    res.json({ message: 'Vehicule ajoute avec succes ✅', vehicule: ajouterVehicule[0]});
}));

router.get('/vehicules', verifierToken, asyncHandler(async(req, res) => {

    const user_id = req.user.id;

    const vehicules = await sql`
        SELECT vehicules.*, scores.score_global 
        FROM vehicules 
        LEFT JOIN scores ON vehicules.id = scores.vehicule_id
        WHERE vehicules.user_id = ${user_id}
    `;
    res.json(vehicules);
}));

router.delete('/vehicules/:id', verifierToken, asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const result = await sql`DELETE FROM vehicules WHERE id = ${id}`;
    res.json(result);


}));


module.exports = router