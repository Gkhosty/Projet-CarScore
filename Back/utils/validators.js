const { z } = require('zod');

const registerSchema = z.object({
    nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractéres')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom ne doit contenir que des lettres'),
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(12, 'Le mot de passe doit contenir au moins 12 caractéres')

});

const loginSchema = z.object({
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(1, 'Mot de passe obligatoire')
});

const vehiculeSchema = z.object({
    marque: z.string().min(1, 'Marque obligatoire'),
    modele: z.string().min(1, 'Modele obligatoire'),
    annee: z.number().min(1990, 'Année minimum 1990').max(2026, 'Année maximum 2026'),
    kilometrage: z.number().min(0, 'Kilométrage invalide'),
    carburant: z.enum(['essence', 'diesel', 'hybride', 'electrique', 'gpl']),
    region: z.enum(['paris', 'idf', 'lyon', 'marseille', 'bordeaux', 'toulouse', 'nantes', 'province']),
    entretien: z.enum(['complet', 'partiel', 'absent']),
    ct: z.enum(['valide', 'bientot', 'depasse'])
});

const scoreShema = z.object({
    vehicule_id: z.number().int().positive('vehicule_id invalide')
});

module.exports = { registerSchema, loginSchema, vehiculeSchema, scoreShema }
