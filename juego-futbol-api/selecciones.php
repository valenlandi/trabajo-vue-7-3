<?php
require 'cors.php';
require 'conexion.php';

$sql = "SELECT id, nombre FROM selecciones ORDER BY nombre";
$filas = $pdo->query($sql)->fetchAll();

echo json_encode($filas, JSON_UNESCAPED_UNICODE);
