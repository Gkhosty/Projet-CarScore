import type { Vehicule } from '../types/index'

export function calculerScore(vehicule: Vehicule) {

    let scoreKilometrage = 0
    if (vehicule.kilometrage < 50000) { scoreKilometrage = 20 }
    else if (vehicule.kilometrage < 80000) { scoreKilometrage = 16 }
    else if (vehicule.kilometrage < 120000) { scoreKilometrage = 10 }
    else if (vehicule.kilometrage < 150000) { scoreKilometrage = 5 }
    else { scoreKilometrage = 0 }

    const ageVehicule = 2026 - vehicule.annee
    let scoreAnnee = 0
    if (ageVehicule < 2) { scoreAnnee = 20 }
    else if (ageVehicule < 5) { scoreAnnee = 16 }
    else if (ageVehicule < 8) { scoreAnnee = 12 }
    else if (ageVehicule < 12) { scoreAnnee = 8 }
    else if (ageVehicule < 15) { scoreAnnee = 4 }
    else { scoreAnnee = 0 }

    let scoreCarburant = 0
    if (vehicule.carburant === 'electrique') { scoreCarburant = 15 }
    else if (vehicule.carburant === 'hybride') { scoreCarburant = 13 }
    else if (vehicule.carburant === 'essence') { scoreCarburant = 10 }
    else if (vehicule.carburant === 'gpl') { scoreCarburant = 7 }
    else { scoreCarburant = 5 }

    let scoreRegion = 0
    if (vehicule.region === 'province') { scoreRegion = 15 }
    else if (vehicule.region === 'nantes' || vehicule.region === 'bordeaux' || vehicule.region === 'toulouse') { scoreRegion = 13 }
    else if (vehicule.region === 'lyon' || vehicule.region === 'marseille') { scoreRegion = 10 }
    else if (vehicule.region === 'idf') { scoreRegion = 7 }
    else { scoreRegion = 5 }

    let scoreEntretien = 0
    if (vehicule.entretien === 'complet') { scoreEntretien = 10 }
    else if (vehicule.entretien === 'partiel') { scoreEntretien = 5 }
    else { scoreEntretien = 0 }

    let scoreCT = 0
    if (vehicule.ct === 'valide') { scoreCT = 5 }
    else if (vehicule.ct === 'bientot') { scoreCT = 2 }
    else { scoreCT = 0 }

    let scoreCTBonus = 0
    if (vehicule.ct === 'valide' && vehicule.entretien === 'complet') { scoreCTBonus = 5 }

    const scoreGlobal = scoreKilometrage + scoreAnnee + scoreCarburant + scoreRegion + scoreEntretien + scoreCT + scoreCTBonus

    return scoreGlobal
}