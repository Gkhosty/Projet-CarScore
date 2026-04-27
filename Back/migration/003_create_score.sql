CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    vehicule_id INTEGER NOT NULL UNIQUE REFERENCES vehicules(id) ON DELETE CASCADE,
    score_global INTEGER NOT NULL,
    score_kilometrage INTEGER NOT NULL,
    score_annee INTEGER NOT NULL,
    score_carburant INTEGER NOT NULL,
    score_region INTEGER NOT NULL,
    score_entretien INTEGER NOT NULL,
    score_tc INTEGER NOT NULL,
    score_tc_bonus INTEGER NOT NULL,
    recommandation TEXT NOT NULL,
    cout_mensuel DECIMAL(10,2) NOT NULL,
    depreciation DECIMAL(5,2) NOT NULL,
    perte_annuelle DECIMAL(10,2) NOT NULL,
    periode_revente VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);