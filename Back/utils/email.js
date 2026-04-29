const SibApiV3Sdk = require('sib-api-v3-sdk');
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Fonction pour envoyer l'email de validation
async function envoyerEmailValidation(email, token) {
    const lien = `https://car-score-alpha.vercel.app/verify/${token}`;

    await apiInstance.sendTransacEmail({
        sender: { name: 'CarScore', email: 'kgovip007@gmail.com' },
        to: [{ email }],
        subject: '✅ Validez votre compte CarScore',
        htmlContent: `
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
            <p>Ce lien expire dans 1h.</p>
        `
    });
}

// Fonction pour envoyer l'email de réinitialisation
async function envoyerEmailReset(email, token) {
    const lien = `https://car-score-alpha.vercel.app/reset-password/${token}`;

    await apiInstance.sendTransacEmail({
        sender: { name: 'CarScore', email: 'kgovip007@gmail.com' },
        to: [{ email }],
        subject: '🔐 Réinitialisation de votre mot de passe CarScore',
        htmlContent: `
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