const nodemailer = require('nodemailer');

// On configure le transporteur Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction pour envoyer l'email de validation
async function envoyerEmailValidation(email, token) {
    const lien = `https://car-score-alpha.vercel.app/verify/${token}`;

    await transporter.sendMail({
        from: `"CarScore " <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✅ Validez votre compte CarScore',
        html: `
            <h2>Bienvenue sur CarScore ! 🚗</h2>
            <p>Cliquez sur le lien ci-dessous pour valider votre compte :</p>
            <a href="${lien}" style="
                background-color: #EA580C;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
            ">
                Valider mon compte
            </a>
            <p>Ce lien expire dans 24h.</p>
        `
    });
}

// Fonction pour envoyer l'email de réinitialisation
async function envoyerEmailReset(email, token) {
    const lien = `https://car-score-alpha.vercel.app/reset-password/${token}`;

    await transporter.sendMail({
        from: `"CarScore AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🔐 Réinitialisation de votre mot de passe CarScore',
        html: `
            <h2>Réinitialisation de mot de passe 🔐</h2>
            <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
            <p>Cliquez sur le lien ci-dessous :</p>
            <a href="${lien}" style="
                background-color: #EA580C;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
            ">
                Réinitialiser mon mot de passe
            </a>
            <p>Ce lien expire dans 1h.</p>
            <p>Si vous n'avez pas demandé cela, ignorez cet email.</p>
        `
    });
}

module.exports = { envoyerEmailValidation, envoyerEmailReset };


