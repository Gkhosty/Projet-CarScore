const zod  = require('zod');

const registerSchema = zod.object({
    nom: zod.string()
    .min(2, 'Le nom doit contenir au moins 2 caractéres')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom ne doit contenir que des lettres'),
    email: zod.string().email('Adresse email invalide'),
    password: zod.string().min(12, 'Le mot de passe doit contenir au moins 12 caractéres')

});

const loginSchema = zod.object({
    email: zod.string().email('Adresse email invalide'),
    password: zod.string().min(1, 'Mot de passe obligatoire')
});

const vehiculeSchema = zod.object({
    marque: zod.string().min(1, 'Marque obligatoire'),
    modele: zod.string().min(1, 'Modele obligatoire'),
    annee: zod.number().min(1990, 'Année minimum 1990').max(2026, 'Année maximum 2026'),
    kilometrage: zod.number().min(0, 'Kilométrage invalide'),
    carburant: zod.enum(['essence', 'diesel', 'hybride', 'electrique', 'gpl']),
    region: zod.enum(['paris', 'idf', 'lyon', 'marseille', 'bordeaux', 'toulouse', 'nantes', 'province']),
    entretien: zod.enum(['complet', 'partiel', 'absent']),
    ct: zod.enum(['valide', 'bientot', depasse])
});

const scoreShema = zod.object({
    vehicule_id: zod.number().int().positive('vehicule_id invalide')
});

module.exports = { registerSchema, loginSchema, vehiculeSchema, scoreShema }
