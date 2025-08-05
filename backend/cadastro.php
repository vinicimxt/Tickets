<?php
header("Access-Control-Allow-Origin: *"); // ou http://localhost:5173 para maior segurança
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexao.php'; // conexão com banco de dados

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome'] ?? '';
$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';
$tipo = $data['tipo'] ?? 'user'; // padrão como "user" se não enviado

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$conn = new mysqli("localhost", "root", "", "tickets");

$sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $email, $senhaHash, $tipo);

$response = [];

if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $conn->error;
}

echo json_encode($response);
?>
