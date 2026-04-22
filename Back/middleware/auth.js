const jwt = require('jsonwebtoken');

const verifieToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erreur: 'Accès refusé - token manquant' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ erreur: 'Accès refusé - token manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (erreur) {
        return res.status(401).json({ erreur: 'Token invalide ou expiré' });
    }
};

module.exports = verifieToken;