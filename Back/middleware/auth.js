const jwt =require('jsonwebtoken');
const verifieToken = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({ erreur: 'Accés refusé - token manquant' });
    };
    const decoded = jwt.decode(token);
    if(!decoded){
        return res.status(401).json({ erreur: 'Token invalide'});
    };
    
    req.user = decoded;
    next();
};

module.exports = verifieToken;