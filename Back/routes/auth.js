const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const { envoyerEmailValidation, envoyerEmailReset } = require('../utils/email');
const crypto = require('crypto');
const router = express.Router();

// Stockage temporaire en mémoire — PAS dans Neon !
const comptesEnAttente = {};
const tokensReset = {};

router.post('/register', async (req, res) => {
    const { nom, email, password } = req.body;

    // verification pour que tous les champs sont remplis
    if (!nom || !email || !password) {
        return res.status(400).json({ erreur: 'Tous les champs sont obligatoires !'});
    }

    // verifie que le mdp fait au moins 12 caracteres
    if (password.length < 12){
        return res.status(400).json({ erreur: 'Le mot de passe doit contenir au moins 12 caractéres !'})
    }

    // Vérifier si l'email existe déjà dans Neon
    const existant = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existant.length > 0) {
        return res.status(400).json({ erreur: 'Cet email est déjà utilisé !' });
    }

    // Vérifier si email déjà en attente de validation
    const enAttente = Object.values(comptesEnAttente).find(c => c.email === email);
    if (enAttente) {
        return res.status(400).json({ erreur: 'Un email de validation a déjà été envoyé !' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Générer un token unique
    const token = crypto.randomBytes(32).toString('hex');

    // Stocker en mémoire — PAS dans Neon !
    comptesEnAttente[token] = { nom, email, password: hashedPassword };

    // Envoyer l'email de validation
    await envoyerEmailValidation(email, token);

    res.json({ message: 'Vérifiez votre email pour activer votre compte 📧' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ erreur: 'Email et mot de passe obligatoires !'});
    }

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0];

    // 1. Vérifier si l'utilisateur existe
    if (!user) {
        return res.status(400).json({ erreur: 'Email ou mot de passe incorrect !' });
    }

    // 2. Vérifier si le compte est validé
    if (!user.verifie) {
        return res.status(400).json({ 
            erreur: 'Veuillez valider votre email avant de vous connecter !' 
        });
    }

    // 3. Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ erreur: 'Email ou mot de passe incorrect !' });
    }

    // 4. Générer le token JWT
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({ token });
});

router.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    // On cherche les données en mémoire
    const compte = comptesEnAttente[token];

    // Si token invalide
    if (!compte) {
        return res.status(400).json({ erreur: 'Lien invalide ou expiré !' });
    }

    // On insère dans Neon maintenant !
    await sql`
        INSERT INTO users (nom, email, password, verifie)
        VALUES (${compte.nom}, ${compte.email}, ${compte.password}, true)
    `;

    // On supprime de la mémoire
    delete comptesEnAttente[token];

    res.json({ message: 'Compte validé avec succès ! Vous pouvez vous connecter ✅' });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ erreur: 'Email obligatoire !'});
    }

    // Vérifier si l'email existe dans Neon
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0];

    if (!user) {
        return res.status(400).json({ erreur: 'Aucun compte avec cet email !' });
    }

    // Générer un token de réinitialisation
    const token = crypto.randomBytes(32).toString('hex');

    // Stocker en mémoire avec expiration 1h
    tokensReset[token] = {
        email: email,
        expiration: Date.now() + 3600000
    };

    // Envoyer l'email
    await envoyerEmailReset(email, token);

    res.json({ message: 'Email de réinitialisation envoyé ! Vérifiez votre boîte mail 📧' });
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!password){
        return res.status(400).json({ erreur: 'Mot de passe obligatoire !'});
    }

    if (password.length < 12) {
        return res.status(400).json({ erreur: 'Le mot de passe doit contenir au moins 12 caractéres !'});
    }

    // Vérifier si le token existe en mémoire
    const tokenData = tokensReset[token];

    if (!tokenData) {
        return res.status(400).json({ erreur: 'Lien invalide ou expiré !' });
    }

    // Vérifier si le token n'est pas expiré
    if (Date.now() > tokenData.expiration) {
        delete tokensReset[token];
        return res.status(400).json({ erreur: 'Lien expiré ! Recommencez.' });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour dans Neon
    await sql`
        UPDATE users 
        SET password = ${hashedPassword} 
        WHERE email = ${tokenData.email}
    `;

    // Supprimer le token de la mémoire
    delete tokensReset[token];

    res.json({ message: 'Mot de passe modifié avec succès ! Connectez-vous ✅' });
});

module.exports = router;