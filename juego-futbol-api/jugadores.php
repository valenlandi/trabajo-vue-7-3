<?php
require 'cors.php';
require 'conexion.php';

$plantelId = filter_input(INPUT_GET, 'plantel_id', FILTER_VALIDATE_INT);
$posicion = trim($_GET['posicion'] ?? '');

if (!$plantelId) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta un plantel válido']);
    exit;
}

$sql = "SELECT pj.id AS plantel_jugador_id,
               j.nombre,
               j.apellido,
               pj.posicion,
               pj.dorsal,
               pj.valoracion
        FROM plantel_jugadores pj
        JOIN jugadores j ON j.id = pj.jugador_id
        WHERE pj.plantel_id = :plantel";

$parametros = ['plantel' => $plantelId];

if ($posicion !== '') {
    $sql .= " AND pj.posicion = :posicion";
    $parametros['posicion'] = $posicion;
}

$sql .= " ORDER BY pj.valoracion DESC, j.apellido";

$stmt = $pdo->prepare($sql);
$stmt->execute($parametros);

echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
