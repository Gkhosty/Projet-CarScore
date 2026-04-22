const calculerScore = require('../utils/scoring');
describe('calculerScore', function(){
    it('vehicule excellent doit recommander Garder', function(){
        const vehicule = {
            kilometrage: 20000,
            annee: 2022,
            carburant: 'hybride',
            region: 'province',
            entretien: 'complet',
            ct: 'valide'
        }
        const result = calculerScore(vehicule)
        expect(result.scoreGlobal).toBe(84)
        expect(result.recommandation).toBe('Garder - votre voiture a encore beaucoup de valeur')
    });

    it('vehicule critique doit recommander Vendre', function(){
        const vehicule = {
            kilometrage: 160000,
            annee: 2008,
            carburant: 'diesel',
            region: 'paris',
            entretien: 'absent',
            ct: 'depasse'
        }
        const result = calculerScore(vehicule);
        expect(result.scoreGlobal).toBe(10);
        expect(result.recommandation).toBe('Vendre rapidement avant de perdre encore plus de valeur');
    });

    it('kilométrage exactement 50000 doit donner 16 pas 20', function(){
        const vehicule = {
            kilometrage: 50000,
            annee: 2022,
            carburant: 'hybride',
            region: 'province',
            entretien: 'complet',
            ct: 'valide'
        }
        const result = calculerScore(vehicule);
        expect(result.scoreKilometrage).toBe(16);
    });

    it('véhicule électrique récent doit avoir le score maximum', function(){
        const vehicule = {
            kilometrage: 10000,
            annee: 2025,
            carburant: 'electrique',
            region: 'province',
            entretien: 'complet',
            ct: 'valide'
        }
        const result = calculerScore(vehicule)
        expect(result.scoreGlobal).toBe(90);
        expect(result.recommandation).toBe('Garder - votre voiture a encore beaucoup de valeur')
    })
})