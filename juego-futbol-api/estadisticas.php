<?php
require 'cors.php';
require 'conexion.php';

$sql = "SELECT s.nombre AS seleccion,
               COUNT(pj.id) AS cantidad_jugadores,
               ROUND(AVG(pj.valoracion), 1) AS promedio_valoracion
        FROM selecciones s
        JOIN planteles p ON p.seleccion_id = s.id
        JOIN plantel_jugadores pj ON pj.plantel_id = p.id
        GROUP BY s.id, s.nombre
        HAVING COUNT(pj.id) > 0
        ORDER BY promedio_valoracion DESC";

$datos = $pdo->query($sql)->fetchAll();
echo json_encode($datos, JSON_UNESCAPED_UNICODE);
