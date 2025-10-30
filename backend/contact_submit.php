<?php
// contact_submit.php - recibe POST del formulario y guarda en tabla 'contacto'
header('Content-Type: application/json; charset=utf-8');

// permitir CORS si probás desde otro origen (opcional)
// header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'msg' => 'Método no permitido']);
    exit;
}
