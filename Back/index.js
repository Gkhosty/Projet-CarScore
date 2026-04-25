// On charge les variables du fichier .env (PORT, DATABASE_URL, JWT_SECRET)
require('dotenv').config();
const express = require('express');

// On importe le package cors pour autoriser les requêtes du frontend
const cors = require('cors');

const authRouter = require('./routes/auth');
const vehiculesRouter = require('./routes/vehicules')
const scoresRouter = require('./routes/scores')
const adminRouter = require('./routes/admin');

// On crée notre application Express
const app = express();

// On autorise les requêtes venant du frontend
app.use(cors({
    origin: 'https://projet-car-score.vercel.app'
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

app.get('/', (req, res) => {
    res.json({message: 'CarScore API fonctionne'});
});

app.listen(PORT, () =>{
    console.log(`Serveur CarScore démarré sur http://localhost:${PORT}`);
});

