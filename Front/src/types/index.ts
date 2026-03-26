export type User = {
    id: number
    nom: string
    email: string
    role: string
    created_at: string
}

export type Vehicule = {
    id: number
    user_id: number
    marque: string
    modele: string
    annee: number
    kilometrage: number
    carburant: string
    region: string
    entretien: string
    ct: string
    score_global?: number
    created_at: string
}

export type Score = {
    id: number
    vehicule_id: number
    score_global: number
    score_kilometrage: number
    score_annee: number
    score_carburant: number
    score_region: number
    score_entretien: number
    score_tc: number
    score_tc_bonus: number
    recommandation: string
    cout_mensuel: number
    depreciation: number
    perte_annuelle: number
    periode_revente: string
    created_at: string
}