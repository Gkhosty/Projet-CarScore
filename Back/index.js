// On charge les variables du fichier .env (PORT, DATABASE_URL, JWT_SECRET)
require('dotenv').config();
const express = require('express');

// On importe le package cors pour autoriser les requêtes du frontend
const cors = require('cors');

const authRouter = require('./routes/auth');
const vehiculesRouter = require('./routes/vehicules')

// On crée notre application Express
const app = express();

// On autorise les requêtes venant du frontend
app.use(cors());

// On dit à Express de lire et comprendre le JSON
app.use(express.json());

// le port sur lequel le serveur va écouter
const PORT = process.env.PORT || 5000

// on import le fichier
app.use('/api', authRouter);
app.use('/api', vehiculesRouter);

app.get('/', (req, res) => {
    res.json({message: 'CarScore API fonctionne'});
});

app.listen(PORT, () =>{
    console.log(`Serveur CarScore démarré sur http://localhost:${PORT}`);
});

