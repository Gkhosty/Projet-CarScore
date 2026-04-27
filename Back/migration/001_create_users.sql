CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    verifie BOOLEAN DEFAULT false,
    token_verification VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);