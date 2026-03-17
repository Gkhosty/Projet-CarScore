const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();

router.post('/register', async(req, res) =>{
const { nom, email, password } = req.body
const existant = await sql`SELECT * FROM users WHERE email = ${email}`;
if (existant.length > 0){
    return res.status(400).json({erreur: 'Cet email est déjà utilisé !'})
}
const hashedPassword = await bcrypt.hash(password, 10)
const newUser = await sql`INSERT INTO users (nom, email, password) VALUES (${nom}, ${email}, ${hashedPassword}) RETURNING *`;
res.json({ message: 'Compte créé avec succés 🔓'});
});

router.post('/login', async (req, res) =>{
    const { email, password } = req.body;

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0]

    if(!user) {
        return res.status(400).json({erreur: 'Email au mot de passe incorrect !'});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({ erreur: 'Email ou mot de passe incorrect !'})
    }
    const token = jwt.sign(
        {id: user.id, role: user.role}, 
        process.env.JWT_SECRET,
        {expiresIn: '24h'});
        res.json({ token })
})

module.exports = router;

