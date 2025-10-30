<?php
require_once _DIR_.'/db.php';
$stmt = $pdo->query("SELECT contacto_id, nombre, email, mensaje, fecha FROM contacto ORDER BY fecha DESC");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($rows, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
