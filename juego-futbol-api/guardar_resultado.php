<?php
require 'cors.php';
require 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);
$partidaId = (int)($datos['partida_id'] ?? 0);
$ronda = trim($datos['ronda'] ?? '');
$rival = trim($datos['rival'] ?? '');
$golesFavor = (int)($datos['goles_favor'] ?? 0);
$golesContra = (int)($datos['goles_contra'] ?? 0);

if ($partidaId <= 0 || $ronda === '' || $rival === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos del resultado']);
    exit;
}

$stmt = $pdo->prepare(
    "INSERT INTO resultados (partida_id, ronda, rival, goles_favor, goles_contra)
     VALUES (:partida, :ronda, :rival, :favor, :contra)"
);
$stmt->execute([
    'partida' => $partidaId,
    'ronda'   => $ronda,
    'rival'   => $rival,
    'favor'   => $golesFavor,
    'contra'  => $golesContra
]);

echo json_encode(['ok' => true]);
