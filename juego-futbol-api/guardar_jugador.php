<?php
require 'cors.php';
require 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);
$partidaId = (int)($datos['partida_id'] ?? 0);
$plantelJugadorId = (int)($datos['plantel_jugador_id'] ?? 0);
$slot = trim($datos['slot'] ?? '');

if ($partidaId <= 0 || $plantelJugadorId <= 0 || $slot === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos para guardar el jugador']);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO equipo_partida (partida_id, plantel_jugador_id, slot)
         VALUES (:partida, :jugador, :slot)"
    );
    $stmt->execute([
        'partida' => $partidaId,
        'jugador' => $plantelJugadorId,
        'slot'    => $slot
    ]);
    echo json_encode(['ok' => true]);
} catch (PDOException $e) {
    http_response_code(409);
    echo json_encode([
        'error' => 'Ese lugar ya está ocupado o el jugador ya fue elegido'
    ]);
}
