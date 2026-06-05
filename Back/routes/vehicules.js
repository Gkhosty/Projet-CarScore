const express = require('express');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();
const {verifieToken} = require('../middleware/auth');
const { vehiculeSchema } = require('../utils/validators');
const { asyncHandler } = require('../utils/handler');

// Cache en mémoire — chargé une seule fois au lieu de à chaque requête
let marquesCache = null

router.post('/vehicules', verifieToken, asyncHandler(async(req, res) => {

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

    // Validation marque via NHTSA — avec cache
    if (!marquesCache) {
        const responseNHTSA = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
        const dataNHTSA = await responseNHTSA.json()
        marquesCache = dataNHTSA.Results.map(function(item) {
            return item.Make_Name.toLowerCase()
        })
    }

    if(!marquesCache.includes(marque.toLowerCase())){
        return res.status(400).json({ erreur: 'Marque invalide — veuillez choisir une marque dans la liste' })
    }

    // le middleware verifiertoken a deja decodé le token
    const user_id = req.user.id;
    const ajouterVehicule = await sql`INSERT INTO vehicules ( user_id, marque, modele, annee, kilometrage, carburant, region, entretien, ct )
    VALUES (${user_id},${marque}, ${modele}, ${annee}, ${kilometrage}, ${carburant}, ${region}, ${entretien}, ${ct}) RETURNING *`;
    res.json({ message: 'Vehicule ajoute avec succes ✅', vehicule: ajouterVehicule[0]});
}));

router.get('/vehicules', verifieToken, asyncHandler(async(req, res) => {

    const user_id = req.user.id;

    const vehicules = await sql`
        SELECT vehicules.*, scores.score_global
        FROM vehicules
        LEFT JOIN scores ON vehicules.id = scores.vehicule_id
        WHERE vehicules.user_id = ${user_id}
    `;
    res.json(vehicules);
}));

router.delete('/vehicules/:id', verifieToken, asyncHandler(async(req, res) => {
    const user_id = req.user.id
    const id = parseInt(req.params.id)
    const result = await sql`DELETE FROM vehicules WHERE id = ${id} AND user_id = ${user_id}`;
    res.json(result);
}));

module.exports = router