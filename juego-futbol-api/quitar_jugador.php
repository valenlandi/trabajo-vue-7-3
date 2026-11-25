<?php
require 'cors.php';
require 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);
$partidaId = (int)($datos['partida_id'] ?? 0);
$slot = trim($datos['slot'] ?? '');

if ($partidaId <= 0 || $slot === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos para quitar el jugador']);
    exit;
}

$stmt = $pdo->prepare(
    "DELETE FROM equipo_partida
     WHERE partida_id = :partida AND slot = :slot"
);
$stmt->execute([
    'partida' => $partidaId,
    'slot'    => $slot
]);

echo json_encode(['ok' => true]);
