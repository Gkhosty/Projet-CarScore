const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
const { envoyerEmailValidation, envoyerEmailReset } = require('../utils/email');
const crypto = require('crypto');
const { registerSchema, loginSchema } = require('../utils/validators');
const { asyncHandler }  = require('../utils/handler');
const router = express.Router();
const { verifieToken } = require('../middleware/auth');


// Stockage temporaire en mémoire pour le reset password
const tokensReset = {};

router.post('/register', asyncHandler(async(req, res) => {
    const { nom, email, password } = req.body;

    // validation des champs avec method z
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ erreur: result.error.issues[0].message });
    };

    // Vérifier si l'email existe déjà dans Neon
    const existant = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existant.length > 0) {
        return res.status(400).json({ erreur: 'Cet email est déjà utilisé !' });
    };

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Générer un JWT avec les données du compte — expire dans 24h
    const token = jwt.sign(
        { nom, email, password: hashedPassword },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    // Envoyer l'email de validation avec le JWT dans l'URL
    await envoyerEmailValidation(email, token);
    res.json({ message: 'Vérifiez votre email pour activer votre compte 📧' });
}));

router.post('/login', asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // validation des champs avec z
    const result = loginSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({ erreur: result.error.issues[0].message});
    };

    const utilisateur = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = utilisateur[0];

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
        { id: user.id, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({ token });
}));

router.get('/verify/:token', asyncHandler(async(req, res) => {
    const { token } = req.params;

    // Vérifier et décoder le JWT
    try {
        const compte = jwt.verify(token, process.env.JWT_SECRET)

        // Vérifier si email déjà utilisé
        const existant = await sql`SELECT * FROM users WHERE email = ${compte.email}`;
        if (existant.length > 0) {
            return res.status(400).json({ erreur: 'Ce compte existe déjà !' });
        }

        // On insère dans Neon maintenant !
        await sql`
            INSERT INTO users (nom, email, password, verifie)
            VALUES (${compte.nom}, ${compte.email}, ${compte.password}, true)
        `;

        res.json({ message: 'Compte validé avec succès ! Vous pouvez vous connecter ✅' });
    } catch (erreur) {
        return res.status(400).json({ erreur: 'Lien invalide ou expiré !' });
    }
}));

router.post('/forgot-password', asyncHandler(async(req, res) => {
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
}));

router.post('/reset-password/:token', asyncHandler(async(req, res) => {
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
}));

// Récupère les infos de l'utilisateur connecté depuis Neon
router.get('/me', verifieToken, asyncHandler(async(req, res) => {
    const result = await sql`SELECT id, nom, email, role FROM users WHERE id = ${req.user.id}`
    const user = result[0]
    if (!user) {
        return res.status(404).json({ erreur: 'Utilisateur introuvable' })
    }
    res.json({ user })
}));

module.exports = router;

module.exports = router;