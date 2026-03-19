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
    
    const decoded = jwt.decode(token);
    
    if (!decoded) {
        return res.status(401).json({ erreur: 'Token invalide' });
    }
    req.user = decoded;
    next();
};

module.exports = verifieToken;