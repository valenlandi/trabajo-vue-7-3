CREATE DATABASE IF NOT EXISTS juego_draft
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE juego_draft;

DROP TABLE IF EXISTS resultados;
DROP TABLE IF EXISTS equipo_partida;
DROP TABLE IF EXISTS partidas;
DROP TABLE IF EXISTS plantel_jugadores;
DROP TABLE IF EXISTS planteles;
DROP TABLE IF EXISTS jugadores;
DROP TABLE IF EXISTS mundiales;
DROP TABLE IF EXISTS selecciones;

CREATE TABLE selecciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE mundiales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio INT NOT NULL UNIQUE
);

CREATE TABLE planteles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seleccion_id INT NOT NULL,
  mundial_id INT NOT NULL,
  UNIQUE (seleccion_id, mundial_id),
  FOREIGN KEY (seleccion_id) REFERENCES selecciones(id) ON DELETE CASCADE,
  FOREIGN KEY (mundial_id) REFERENCES mundiales(id) ON DELETE CASCADE
);

CREATE TABLE jugadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL
);

CREATE TABLE plantel_jugadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plantel_id INT NOT NULL,
  jugador_id INT NOT NULL,
  posicion VARCHAR(10) NOT NULL,
  dorsal INT,
  valoracion INT NOT NULL,
  UNIQUE (plantel_id, jugador_id),
  FOREIGN KEY (plantel_id) REFERENCES planteles(id) ON DELETE CASCADE,
  FOREIGN KEY (jugador_id) REFERENCES jugadores(id) ON DELETE CASCADE
);

CREATE TABLE partidas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_equipo VARCHAR(80) NOT NULL,
  formacion VARCHAR(20) NOT NULL,
  fecha_inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipo_partida (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partida_id INT NOT NULL,
  plantel_jugador_id INT NOT NULL,
  slot VARCHAR(10) NOT NULL,
  UNIQUE (partida_id, slot),
  UNIQUE (partida_id, plantel_jugador_id),
  FOREIGN KEY (partida_id) REFERENCES partidas(id) ON DELETE CASCADE,
  FOREIGN KEY (plantel_jugador_id) REFERENCES plantel_jugadores(id) ON DELETE CASCADE
);

CREATE TABLE resultados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partida_id INT NOT NULL,
  ronda VARCHAR(30) NOT NULL,
  rival VARCHAR(80) NOT NULL,
  goles_favor INT NOT NULL,
  goles_contra INT NOT NULL,
  FOREIGN KEY (partida_id) REFERENCES partidas(id) ON DELETE CASCADE
);

INSERT INTO selecciones (id, nombre) VALUES
(1, 'Argentina'),
(2, 'Brasil'),
(3, 'Francia'),
(4, 'España'),
(5, 'Alemania'),
(6, 'Italia');

INSERT INTO mundiales (id, anio) VALUES
(1, 1986),
(2, 1998),
(3, 2002),
(4, 2006),
(5, 2010),
(6, 2014),
(7, 2022);

INSERT INTO planteles (id, seleccion_id, mundial_id) VALUES
(1, 1, 1),
(2, 1, 7),
(3, 2, 3),
(4, 3, 2),
(5, 4, 5),
(6, 5, 6),
(7, 6, 4);

INSERT INTO jugadores (id, nombre, apellido) VALUES
(1, 'Diego', 'Maradona'),
(2, 'Nery', 'Pumpido'),
(3, 'Jorge', 'Burruchaga'),
(4, 'Jorge', 'Valdano'),
(5, 'Oscar', 'Ruggeri'),
(6, 'José Luis', 'Brown'),
(7, 'Julio', 'Olarticoechea'),
(8, 'Ricardo', 'Giusti'),
(9, 'Sergio', 'Batista'),
(10, 'José Luis', 'Cuciuffo'),
(11, 'Héctor', 'Enrique'),
(12, 'Lionel', 'Messi'),
(13, 'Emiliano', 'Martínez'),
(14, 'Julián', 'Álvarez'),
(15, 'Ángel', 'Di María'),
(16, 'Rodrigo', 'De Paul'),
(17, 'Enzo', 'Fernández'),
(18, 'Alexis', 'Mac Allister'),
(19, 'Cristian', 'Romero'),
(20, 'Nicolás', 'Otamendi'),
(21, 'Nahuel', 'Molina'),
(22, 'Nicolás', 'Tagliafico'),
(23, 'Ronaldo', 'Nazário'),
(24, 'Ronaldinho', 'Gaúcho'),
(25, 'Rivaldo', 'Vítor Borba'),
(26, 'Roberto', 'Carlos'),
(27, 'Marcos', 'Silveira'),
(28, 'Cafú', 'Evangelista'),
(29, 'Lúcio', 'Ferreira'),
(30, 'Edmílson', 'Moraes'),
(31, 'Gilberto', 'Silva'),
(32, 'Roque', 'Júnior'),
(33, 'Kléberson', 'Pereira'),
(34, 'Zinedine', 'Zidane'),
(35, 'Thierry', 'Henry'),
(36, 'Fabien', 'Barthez'),
(37, 'Lilian', 'Thuram'),
(38, 'Marcel', 'Desailly'),
(39, 'Laurent', 'Blanc'),
(40, 'Bixente', 'Lizarazu'),
(41, 'Didier', 'Deschamps'),
(42, 'Emmanuel', 'Petit'),
(43, 'Youri', 'Djorkaeff'),
(44, 'David', 'Trezeguet'),
(45, 'Iker', 'Casillas'),
(46, 'Sergio', 'Ramos'),
(47, 'Gerard', 'Piqué'),
(48, 'Carles', 'Puyol'),
(49, 'Joan', 'Capdevila'),
(50, 'Sergio', 'Busquets'),
(51, 'Xabi', 'Alonso'),
(52, 'Xavi', 'Hernández'),
(53, 'Andrés', 'Iniesta'),
(54, 'David', 'Villa'),
(55, 'Pedro', 'Rodríguez'),
(56, 'Manuel', 'Neuer'),
(57, 'Philipp', 'Lahm'),
(58, 'Jérôme', 'Boateng'),
(59, 'Mats', 'Hummels'),
(60, 'Benedikt', 'Höwedes'),
(61, 'Bastian', 'Schweinsteiger'),
(62, 'Sami', 'Khedira'),
(63, 'Toni', 'Kroos'),
(64, 'Mesut', 'Özil'),
(65, 'Thomas', 'Müller'),
(66, 'Miroslav', 'Klose'),
(67, 'Gianluigi', 'Buffon'),
(68, 'Gianluca', 'Zambrotta'),
(69, 'Fabio', 'Cannavaro'),
(70, 'Marco', 'Materazzi'),
(71, 'Fabio', 'Grosso'),
(72, 'Gennaro', 'Gattuso'),
(73, 'Andrea', 'Pirlo'),
(74, 'Mauro', 'Camoranesi'),
(75, 'Simone', 'Perrotta'),
(76, 'Francesco', 'Totti'),
(77, 'Alessandro', 'Del Piero');

INSERT INTO plantel_jugadores (id, plantel_id, jugador_id, posicion, dorsal, valoracion) VALUES
(1, 1, 2, 'ARQ', 18, 86),
(2, 1, 10, 'DEF', 9, 85),
(3, 1, 6, 'DEF', 5, 87),
(4, 1, 5, 'DEF', 19, 91),
(5, 1, 7, 'DEF', 16, 85),
(6, 1, 9, 'MED', 2, 86),
(7, 1, 8, 'MED', 14, 86),
(8, 1, 11, 'MED', 12, 85),
(9, 1, 3, 'MED', 7, 91),
(10, 1, 1, 'MED', 10, 99),
(11, 1, 4, 'DEL', 11, 90),
(12, 2, 13, 'ARQ', 23, 92),
(13, 2, 21, 'DEF', 26, 86),
(14, 2, 19, 'DEF', 13, 90),
(15, 2, 20, 'DEF', 19, 88),
(16, 2, 22, 'DEF', 3, 85),
(17, 2, 16, 'MED', 7, 89),
(18, 2, 17, 'MED', 24, 91),
(19, 2, 18, 'MED', 20, 89),
(20, 2, 15, 'DEL', 11, 92),
(21, 2, 12, 'DEL', 10, 99),
(22, 2, 14, 'DEL', 9, 91),
(23, 3, 27, 'ARQ', 1, 89),
(24, 3, 28, 'DEF', 2, 94),
(25, 3, 29, 'DEF', 3, 91),
(26, 3, 32, 'DEF', 4, 87),
(27, 3, 26, 'DEF', 6, 94),
(28, 3, 30, 'MED', 5, 88),
(29, 3, 31, 'MED', 8, 89),
(30, 3, 33, 'MED', 15, 86),
(31, 3, 24, 'MED', 11, 97),
(32, 3, 25, 'DEL', 10, 95),
(33, 3, 23, 'DEL', 9, 98),
(34, 4, 36, 'ARQ', 16, 91),
(35, 4, 37, 'DEF', 15, 93),
(36, 4, 39, 'DEF', 8, 92),
(37, 4, 38, 'DEF', 18, 94),
(38, 4, 40, 'DEF', 3, 91),
(39, 4, 41, 'MED', 7, 90),
(40, 4, 42, 'MED', 17, 89),
(41, 4, 34, 'MED', 10, 98),
(42, 4, 43, 'MED', 6, 90),
(43, 4, 35, 'DEL', 12, 92),
(44, 4, 44, 'DEL', 20, 89),
(45, 5, 45, 'ARQ', 1, 96),
(46, 5, 46, 'DEF', 15, 94),
(47, 5, 47, 'DEF', 3, 93),
(48, 5, 48, 'DEF', 5, 95),
(49, 5, 49, 'DEF', 11, 87),
(50, 5, 50, 'MED', 16, 93),
(51, 5, 51, 'MED', 14, 92),
(52, 5, 52, 'MED', 8, 98),
(53, 5, 53, 'MED', 6, 97),
(54, 5, 54, 'DEL', 7, 95),
(55, 5, 55, 'DEL', 18, 89),
(56, 6, 56, 'ARQ', 1, 96),
(57, 6, 57, 'DEF', 16, 95),
(58, 6, 58, 'DEF', 20, 90),
(59, 6, 59, 'DEF', 5, 93),
(60, 6, 60, 'DEF', 4, 87),
(61, 6, 61, 'MED', 7, 93),
(62, 6, 62, 'MED', 6, 89),
(63, 6, 63, 'MED', 18, 94),
(64, 6, 64, 'MED', 8, 92),
(65, 6, 65, 'DEL', 13, 94),
(66, 6, 66, 'DEL', 11, 91),
(67, 7, 67, 'ARQ', 1, 97),
(68, 7, 68, 'DEF', 19, 91),
(69, 7, 69, 'DEF', 5, 98),
(70, 7, 70, 'DEF', 23, 89),
(71, 7, 71, 'DEF', 3, 88),
(72, 7, 72, 'MED', 8, 91),
(73, 7, 73, 'MED', 21, 96),
(74, 7, 74, 'MED', 16, 88),
(75, 7, 75, 'MED', 20, 87),
(76, 7, 76, 'DEL', 10, 95),
(77, 7, 77, 'DEL', 7, 94);
