const jwt = require('jsonwebtoken');

// verfification que le token jwt est valide, autilisé sur tous les route protégés
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
// verifie que l'autlisateur est un admin, utilisé sur les routes amdin

const verifierAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({ erreur: 'Accés refusé - réservé aux adminstrateurs'})
    }
    next()
}
module.exports = { verifieToken, verifierAdmin };