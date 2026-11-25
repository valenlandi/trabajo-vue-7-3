<?php
require 'cors.php';
require 'conexion.php';

$sql = "SELECT p.id AS plantel_id,
               s.nombre AS seleccion,
               m.anio
        FROM planteles p
        JOIN selecciones s ON s.id = p.seleccion_id
        JOIN mundiales m ON m.id = p.mundial_id
        ORDER BY RAND()
        LIMIT 1";

$sorteo = $pdo->query($sql)->fetch();
echo json_encode($sorteo, JSON_UNESCAPED_UNICODE);
