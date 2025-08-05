<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Lê o corpo JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Validação
if (!$data || !isset($data["email"]) || !isset($data["senha"])) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Dados de login inválidos"
    ]);
    exit;
}

$email = $data["email"];
$senha = $data["senha"];

$conn = new mysqli("localhost", "root", "", "tickets");
if ($conn->connect_error) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro na conexão com o banco"
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();
$user = $resultado->fetch_assoc();

if (!$user) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Usuário não encontrado"
    ]);
    exit;
}

if (password_verify($senha, $user["senha"])) {
    echo json_encode([
        "status" => "ok",
        "nome" => $user["nome"],
        "email" => $user["email"],
        "tipo" => $user["tipo"] ?? "cliente"
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Senha incorreta"
    ]);
}


?>
