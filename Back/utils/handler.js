// c'est un midlleware d'erreurs de index.js
function asyncHandler(route){
    return function(req, res, next){
        route(req, res, next).catch(next)
    }
}
// la gestion centralisée
function middlewareErreurs(err, req, res, next){
    console.error(err.stack)
    res.status(500).json({
        erreur: 'Une erreur interne est survenue'
    });
}

module.exports = { asyncHandler, middlewareErreurs }