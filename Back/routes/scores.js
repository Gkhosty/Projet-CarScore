const express = require('express');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();
const calculerScore = require('../utils/scoring');
const { verifieToken } = require('../middleware/auth');
const { scoreShema } = require('../utils/validators');
const { asyncHandler }  = require('../utils/handler');

router.post('/scores', verifieToken, asyncHandler(async(req, res) =>{
    const { vehicule_id } = req.body;
    // validation z
    const result = scoreShema.safeParse({
        vehicule_id: parseInt(vehicule_id)
    });
    if(!result.success){
        return res.status(400).json({ erreur: result.error.issues[0].message });
    }
    const id = parseInt(vehicule_id);
    const vehiculeResult = await sql`SELECT * FROM vehicules WHERE id = ${id}`;
    const vehicule = vehiculeResult[0];
    if(!vehicule){
        return res.status(404).json({ erreur: 'Vehicule introuvable'});
    };
     const score = calculerScore({
        ...vehicule,
        kilometrage: parseInt(vehicule.kilometrage)
     });
    await sql`INSERT INTO scores
    (vehicule_id, score_global, score_kilometrage, score_annee, score_carburant, score_region, score_entretien, score_tc, score_tc_bonus, recommandation, cout_mensuel, depreciation, perte_annuelle, periode_revente)
    VALUES
    (${id}, ${score.scoreGlobal}, ${score.scoreKilometrage}, ${score.scoreAnnee}, ${score.scoreCarburant}, ${score.scoreRegion}, ${score.scoreEntretien}, ${score.scoreCT}, ${score.scoreCTBonus}, ${score.recommandation}, ${score.coutMensuel}, ${score.depreciation}, ${score.perteAnnuelle}, 'Mars - Juin')`;
    res.json({ score });
}))


router.get('/scores/:vehicule_id', verifieToken, asyncHandler(async(req, res) =>{
    const vehicule_id = parseInt(req.params.vehicule_id);
    const result = await sql`SELECT * FROM scores WHERE vehicule_id = ${vehicule_id}`;
    const score = result[0];
    if(!score) {
        return res.status(404).json({ erreur: 'Score introuvable' });
    }
    res.json({ score });
}));

module.exports = router;