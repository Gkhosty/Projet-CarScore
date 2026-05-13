// On charge les variables du fichier .env (PORT, DATABASE_URL, JWT_SECRET)
require('dotenv').config();
const express = require('express');

// On importe le package cors pour autoriser les requêtes du frontend
const cors = require('cors');

const authRouter = require('./routes/auth');
const vehiculesRouter = require('./routes/vehicules')
const scoresRouter = require('./routes/scores')
const adminRouter = require('./routes/admin');
const { middlewareErreurs } = require('./utils/handler');

// On crée notre application Express
const app = express();

// On autorise les requêtes venant du frontend
app.use(cors({
    origin: ['https://car-score-alpha.vercel.app', 'https://car-score-3ll8rso6p-gkhostys-projects.vercel.app', 'http://localhost:5173']
}));

// On dit à Express de lire et comprendre le JSON
app.use(express.json());

// le port sur lequel le serveur va écouter
const PORT = process.env.PORT || 5000

// on import le fichier
app.use('/api', authRouter);
app.use('/api', vehiculesRouter);
app.use('/api', scoresRouter);
app.use('/api', adminRouter);

app.get('/', function(req, res) {
    res.json({message: 'CarScore API fonctionne'});
});

// Route health pour garder Render éveillé
app.get('/api/health', function(req, res) {
    res.json({ status: 'ok' });
});

// Ping toutes les 14 minutes pour garder Render éveillé
setInterval(function() {
    fetch('https://projet-carscore.onrender.com/api/health')
        .then(function() { console.log('Ping Render OK') })
        .catch(function() { console.log('Ping échoué') })
}, 14 * 60 * 1000);

// Middleware gestion d'erreurs centralisé
app.use(middlewareErreurs);

app.listen(PORT, function() {
        console.log(`Serveur CarScore démarré sur https://localhost:${PORT}`)
});