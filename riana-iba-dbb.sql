CREATE DATABASE internet_banking;
use internet_banking;

CREATE TABLE client_type(
    clt_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Individuel, Collectif, Moral
    libelle VARCHAR(30)
);

CREATE TABLE client(
    clt_code VARCHAR(15) NOT NULL PRIMARY KEY,
    clt_type_id INT NOT NULL,
    nom VARCHAR(60),
    prenom VARCHAR(60),
    sexe CHAR(1), -- M, F, N
    email VARCHAR(250),
    clt_login VARCHAR(15),
    clt_mdp CHAR(64),
    FOREIGN KEY (clt_type_id) REFERENCES client_type(clt_type_id)
);

CREATE TABLE client_token(
    clt_token_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    clt_code VARCHAR(15) NOT NULL,
    token CHAR(64),
    expiration DATETIME,
    FOREIGN KEY (clt_code) REFERENCES client (clt_code)
);

CREATE TABLE compte_type(
    cpt_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- DAV, EPR
    libelle VARCHAR(30)
);

CREATE TABLE compte(
    cpt_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cpt_type_id INT NOT NULL,
    clt_code VARCHAR(15) NOT NULL,
    banque_code VARCHAR(5),
    agence_code VARCHAR(5),
    cpt_numero VARCHAR(15), -- Numero du compte
    cpt_clerib CHAR(2),
    cpt_libelle VARCHAR(50),
    solde DECIMAL(20,2),
    updated_at DATETIME,
    created_at DATETIME,
    FOREIGN KEY (cpt_type_id) REFERENCES compte_type (cpt_type_id),
    FOREIGN KEY (clt_code) REFERENCES client(clt_code)
);
CREATE TABLE transaction_type(
    trans_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(30) -- VIR, DEP, RET
);

CREATE TABLE transaction(
    trans_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    trans_numero VARCHAR(20), -- VIR120
    trans_type_id INT NOT NULL,
    trans_date DATETIME, 
    montant DECIMAL(20,2), -- NEGATIVE IF RETRAIT
    descript VARCHAR(100),
    cpt_sender_id INT, -- NULL IF DEPOT
    cpt_receiver_id INT,
    trans_status VARCHAR(20),
    FOREIGN KEY (trans_type_id) REFERENCES transaction_type (trans_type_id),
    FOREIGN KEY (cpt_sender_id) REFERENCES compte (cpt_id),
    FOREIGN KEY (cpt_receiver_id) REFERENCES compte (cpt_id)
);

CREATE TABLE beneficiare(
    ben_id INT NOT NULL PRIMARY KEY,
    clt_code VARCHAR(15),
    nom VARCHAR(60),
    prenom VARCHAR(60),
    ben_banque_code VARCHAR(5),
    ben_agence_code VARCHAR(5),
    ben_cpt_numero VARCHAR(15),
    ben_clerib CHAR(2),
    FOREIGN KEY (clt_code) REFERENCES client (clt_code)
);

CREATE TABLE mode_livraison(
    mode_livr_id INT NOT NULL PRIMARY KEY,
    libelle VARCHAR(20)
);

CREATE TABLE banque(
    banque_id INT NOT NULL PRIMARY KEY,
    banque_code VARCHAR(5), -- 00000
    nom VARCHAR(15)
);

CREATE TABLE branche(
    branche_id INT NOT NULL PRIMARY KEY,
    banque_id INT NOT NULL,
    nom VARCHAR(25),
    adresse VARCHAR(75),
    FOREIGN KEY (banque_id) REFERENCES banque(banque_id)
);

------------------ A VOIR

CREATE TABLE demande_chequier(
    demande_chq_id INT NOT NULL PRIMARY KEY,
    clt_code VARCHAR(15),
    mode_livr_id INT NOT NULL,
    banque_code 
);