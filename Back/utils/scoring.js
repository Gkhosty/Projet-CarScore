function calculerScore(vehicule){
    let scoreKilometrage = 0;
    if (vehicule.kilometrage < 50000){
        scoreKilometrage = 20;
    } else if (vehicule.kilometrage < 80000){
        scoreKilometrage = 16;
    } else if (vehicule.kilometrage < 120000){
        scoreKilometrage = 10;
    } else if (vehicule.kilometrage < 150000){
        scoreKilometrage = 5;
    } else {
        scoreKilometrage = 0;
    };
    
    const ageVehicule = 2026 - vehicule.annee;
    let scoreAnnee = 0;

    if(ageVehicule < 2){
        scoreAnnee = 20;
    } else if (ageVehicule < 5){
        scoreAnnee = 16;
    } else if (ageVehicule < 8){
        scoreAnnee = 12;
    } else if (ageVehicule < 12){
        scoreAnnee = 8;
    } else if (ageVehicule < 15){
        scoreAnnee = 4;
    } else {
        scoreAnnee = 0
    };

     let scoreCarburant = 0
     if(vehicule.carburant === 'electrique'){
        scoreCarburant = 15;
     } else if (vehicule.carburant === 'hybride'){
        scoreCarburant = 13;
     } else if (vehicule.carburant === 'essence'){
        scoreCarburant = 10;
     } else if (vehicule.carburant === 'gpl'){
        scoreCarburant = 7;
     } else {
        scoreCarburant = 5;
     };

     let scoreRegion = 0;
     if (vehicule.region === 'province'){
        scoreRegion = 15;
     } else if (vehicule.region === 'nantes' || vehicule.region === 'bordeaux' || vehicule.region === 'toulouse') {
    scoreRegion = 13;
     } else if (vehicule.region === 'lyon' || vehicule.region === 'marseille') {
    scoreRegion = 10;
     } else if (vehicule.region === 'idf'){
        scoreRegion = 7;
     } else {
        scoreRegion = 5
     }

     let scoreEntretien = 0;
     if (vehicule.entretien === 'complet'){
        scoreEntretien = 10;
     } else if (vehicule.entretien === 'partiel'){
        scoreEntretien = 5;
     } else {
        scoreEntretien = 0;
     }

     let scoreCT = 0;
     if(vehicule.ct === 'valide'){
        scoreCT = 5;
     } else if (vehicule.ct === 'bientot'){
        scoreCT = 2;
     } else {
        scoreCT = 0;
     };


     let scoreCTBonus = 0;
     if(vehicule.ct ==='valide' && vehicule.entretien ==='complet'){
        scoreCTBonus = 5;
     };


     let recommandation = ''
     const scoreGlobal = scoreKilometrage + scoreAnnee + scoreCarburant + scoreRegion + scoreEntretien + scoreCT + scoreCTBonus;
   if(scoreGlobal >= 80){
      recommandation = 'Garder - votre voiture a encore beaucoup de valeur';
   } else if (scoreGlobal >= 60){
      recommandation = 'Garder encore 1 à 2 ans';
   } else if (scoreGlobal >= 40){
      recommandation = 'Envisager la revente dans les 6 mois';
   } else {
      recommandation = 'Vendre rapidement avant de perdre encore plus de valeur';
   };

   const coutMensuel = Math.round(scoreGlobal * 2.5);

   let depreciation = 0;
   if(ageVehicule < 2){
      depreciation = 20;
   } else if (ageVehicule < 5){
      depreciation = 15;
   } else {
      depreciation = 10;
   }

    const perteAnnuelle = Math.round(coutMensuel * 12 * depreciation / 100);

     return {
      scoreGlobal,
      scoreKilometrage,
      scoreAnnee,
      scoreCarburant,
      scoreRegion,
      scoreEntretien,
      scoreCT,
      scoreCTBonus,
      recommandation,
      coutMensuel,
      depreciation,
      perteAnnuelle
     };

}

module.exports = calculerScore;



