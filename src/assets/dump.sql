CREATE TABLE IF NOT EXISTS classe(id INTEGER PRIMARY KEY AUTOINCREMENT,nom_classe TEXT);

INSERT or IGNORE INTO classe(id, nom_classe) VALUES (1, 'Génie Informatique');
INSERT or IGNORE INTO classe(id, nom_classe) VALUES (2, 'Génie industriel');
INSERT or IGNORE INTO classe(id, nom_classe) VALUES (3, 'Génie electrique');
INSERT or IGNORE INTO classe(id, nom_classe) VALUES (4, 'Génie civil');

CREATE TABLE IF NOT EXISTS etudiant(id INTEGER PRIMARY KEY AUTOINCREMENT, nom_etudiant TEXT, classe_id INTEGER);

INSERT or IGNORE INTO etudiant(id, nom_etudiant, classe_id) VALUES (1, 'karim bourass', 1);
INSERT or IGNORE INTO etudiant(id, nom_etudiant, classe_id) VALUES (2, 'omar haissoufi', 1);
INSERT or IGNORE INTO etudiant(id, nom_etudiant, classe_id) VALUES (3, 'anass asat', 2);
INSERT or IGNORE INTO etudiant(id, nom_etudiant, classe_id) VALUES (4, 'omar loitfi', 1);
INSERT or IGNORE INTO etudiant(id, nom_etudiant, classe_id) VALUES (5, 'fadwa filali', 3);
INSERT or IGNORE INTO etudiant(id, nom_etudiant, classe_id) VALUES (6, 'marwa anassi', 4);

CREATE TABLE IF NOT EXISTS absence(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, observation TEXT,etudiant_id INTEGER);

INSERT or IGNORE INTO absence(id, date, observation, etudiant_id) VALUES (1, '13-04-2020', 'malade', 1);
INSERT or IGNORE INTO absence(id, date, observation, etudiant_id) VALUES (2, '17-04-2020', '-', 1);
INSERT or IGNORE INTO absence(id, date, observation, etudiant_id) VALUES (3, '04-05-2020', 'justifier', 1);
INSERT or IGNORE INTO absence(id, date, observation, etudiant_id) VALUES (4, '16-06-2020', '-', 1);
INSERT or IGNORE INTO absence(id, date, observation, etudiant_id) VALUES (5, '15-05-2020', '-', 2);
