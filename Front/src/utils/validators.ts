import { z } from 'zod'

export const registerSchema = z.object({
    nom: z.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom ne doit contenir que des lettres'),
    email: z.email('Adresse email invalide'),
    password: z.string().min(12, 'Le mot de passe doit contenir au moins 12 caractères'),
    confirmPassword: z.string().min(1, 'Confirmation obligatoire')
}).refine(function(data) {
    return data.password === data.confirmPassword
}, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
})

export const loginSchema = z.object({
    email: z.email('Adresse email invalide'),
    password: z.string().min(1, 'Mot de passe obligatoire')
})

export const vehiculeSchema = z.object({
    marque: z.string().min(1, 'Marque obligatoire'),
    modele: z.string().min(1, 'Modèle obligatoire'),
    annee: z.number().min(1990, 'Année minimum 1990').max(2026, 'Année maximum 2026'),
    kilometrage: z.number().min(0, 'Kilométrage invalide').max(500000, 'Kilométrage maximum 500000'),
    carburant: z.enum(['essence', 'diesel', 'hybride', 'electrique', 'gpl']),
    region: z.enum(['paris', 'idf', 'lyon', 'marseille', 'bordeaux', 'toulouse', 'nantes', 'province']),
    entretien: z.enum(['complet', 'partiel', 'absent']),
    ct: z.enum(['valide', 'bientot', 'depasse'])
})