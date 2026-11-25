<?php
require 'cors.php';
require 'conexion.php';

$partidaId = filter_input(INPUT_GET, 'partida_id', FILTER_VALIDATE_INT);

if (!$partidaId) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta una partida válida']);
    exit;
}

$sql = "SELECT ep.slot,
               pj.id AS plantel_jugador_id,
               j.nombre,
               j.apellido,
               pj.posicion,
               pj.dorsal,
               pj.valoracion,
               s.nombre AS seleccion,
               m.anio
        FROM equipo_partida ep
        JOIN plantel_jugadores pj ON pj.id = ep.plantel_jugador_id
        JOIN jugadores j ON j.id = pj.jugador_id
        JOIN planteles p ON p.id = pj.plantel_id
        JOIN selecciones s ON s.id = p.seleccion_id
        JOIN mundiales m ON m.id = p.mundial_id
        WHERE ep.partida_id = :partida
        ORDER BY ep.id";

$stmt = $pdo->prepare($sql);
$stmt->execute(['partida' => $partidaId]);

echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
