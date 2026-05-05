import { describe, it, expect } from 'vitest'
import { registerSchema, loginSchema, vehiculeSchema } from '../utils/validators'

describe('registerSchema', function() {

    it('nom trop court doit échouer', function() {
        const result = registerSchema.safeParse({
            nom: 'A',
            email: 'test@test.fr',
            password: 'motdepasse123',
            confirmPassword: 'motdepasse123'
        })
        expect(result.success).toBe(false)
    })

    it('email invalide doit échouer', function() {
        const result = registerSchema.safeParse({
            nom: 'Thomas Martin',
            email: 'pasunemail',
            password: 'motdepasse123',
            confirmPassword: 'motdepasse123'
        })
        expect(result.success).toBe(false)
    })

    it('mot de passe trop court doit échouer', function() {
        const result = registerSchema.safeParse({
            nom: 'Thomas Martin',
            email: 'test@test.fr',
            password: '1234',
            confirmPassword: '1234'
        })
        expect(result.success).toBe(false)
    })

    it('inscription valide doit réussir', function() {
        const result = registerSchema.safeParse({
            nom: 'Thomas Martin',
            email: 'test@test.fr',
            password: 'motdepasse123',
            confirmPassword: 'motdepasse123'
        })
        expect(result.success).toBe(true)
    })

})

describe('loginSchema', function() {

    it('email invalide doit échouer', function() {
        const result = loginSchema.safeParse({
            email: 'pasunemail',
            password: 'motdepasse123'
        })
        expect(result.success).toBe(false)
    })

    it('login valide doit réussir', function() {
        const result = loginSchema.safeParse({
            email: 'test@test.fr',
            password: 'motdepasse123'
        })
        expect(result.success).toBe(true)
    })

})

describe('vehiculeSchema', function() {

    it('année invalide doit échouer', function() {
        const result = vehiculeSchema.safeParse({
            marque: 'Peugeot',
            modele: '208',
            annee: 1800,
            kilometrage: 65000,
            carburant: 'essence',
            region: 'paris',
            entretien: 'complet',
            ct: 'valide'
        })
        expect(result.success).toBe(false)
    })

    it('carburant invalide doit échouer', function() {
        const result = vehiculeSchema.safeParse({
            marque: 'Peugeot',
            modele: '208',
            annee: 2018,
            kilometrage: 65000,
            carburant: 'gasoil',
            region: 'paris',
            entretien: 'complet',
            ct: 'valide'
        })
        expect(result.success).toBe(false)
    })

    it('véhicule valide doit réussir', function() {
        const result = vehiculeSchema.safeParse({
            marque: 'Peugeot',
            modele: '208',
            annee: 2018,
            kilometrage: 65000,
            carburant: 'essence',
            region: 'paris',
            entretien: 'complet',
            ct: 'valide'
        })
        expect(result.success).toBe(true)
    })

})