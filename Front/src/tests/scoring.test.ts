import { calculerScore } from "../utils/scoring";
import { describe, it, expect } from 'vitest';
import type { Vehicule } from "../types/index";


describe('calculerScore', function(){
    it('véhicule excellent doit avoir un score élevé', function(){
        const vehicule:Vehicule = {
            id: 1,
            user_id: 1,
            marque: 'Toyta',
            modele: 'Yaris',
            kilometrage: 20000,
            annee: 2024,
            carburant: 'hybride',
            region: 'province',
            entretien: 'complet',
            ct: 'valide',
            created_at: '2026-01-01'
        }
        const score = calculerScore(vehicule)
        expect(score).toBe(84)
    });

    it('véhicule critique doit avoir un score bas', function(){
        const vehicule:Vehicule = {
            id:2,
            user_id:1,
            marque: 'Citroen',
            modele: 'C3',
            annee: 2010,
            kilometrage: 160000,
            carburant: 'diesel',
            region: 'paris',
            entretien:'absent',
            ct: 'depasse',
            created_at: '2026-01-01'

        }
        const score = calculerScore(vehicule)
        expect(score).toBe(10)
    });

    it('véhicule moyen doit avoir un score de 59', function(){
        const vehicule:Vehicule = {
            id:3,
            user_id: 1,
            marque: 'Peugeot',
            modele: '208',
            annee: 2018,
            kilometrage: 65000,
            carburant: 'essence',
            region: 'paris',
            entretien: 'complet',
            ct: 'valide',
            created_at: '2026-01-01'
        }
        const score = calculerScore(vehicule)
        expect(score).toBe(59)
    });
})