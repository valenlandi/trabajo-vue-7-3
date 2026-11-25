<?php
require 'cors.php';
require 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);
$nombreEquipo = trim($datos['nombre_equipo'] ?? '');
$formacion = trim($datos['formacion'] ?? '');

if ($nombreEquipo === '' || $formacion === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos para crear la partida']);
    exit;
}

$stmt = $pdo->prepare(
    "INSERT INTO partidas (nombre_equipo, formacion)
     VALUES (:nombre_equipo, :formacion)"
);
$stmt->execute([
    'nombre_equipo' => $nombreEquipo,
    'formacion' => $formacion
]);

echo json_encode(['id' => (int)$pdo->lastInsertId()]);
