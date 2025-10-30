<?php
// db.php - configuración de conexión (modificar con tus credenciales)
$DB_HOST = 'localhost';
$DB_NAME = 'bibliotecafifemi';
$DB_USER = 'root';
$DB_PASS = ''; // poner contraseña si aplica

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    http_response_code(500);
    echo "Error de conexión db: " . $e->getMessage();
    exit;
}

require_once _DIR_.'/db.php';

// Validación básica del lado servidor
$nombre = trim($_POST['nombre'] ?? '');
$email  = trim($_POST['email'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $email === '' || $mensaje === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => 'Todos los campos son obligatorios']);
    exit;
}

// Insert seguro con prepared statements
try {
    $stmt = $pdo->prepare("INSERT INTO contacto (nombre, email, mensaje) VALUES (:nombre, :email, :mensaje)");
    $stmt->execute([':nombre' => $nombre, ':email' => $email, ':mensaje' => $mensaje]);

    echo json_encode(['ok' => true, 'msg' => 'Mensaje recibido. Gracias']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => 'Error al guardar: '.$e->getMessage()]);
}
