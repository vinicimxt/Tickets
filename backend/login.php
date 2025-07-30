<?php
// Permite requisições de fora (React)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conecta ao banco
$conn = new mysqli("localhost", "root", "", "tickets"); // ajuste o nome do banco

// Verifica a conexão
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "mensagem" => "Erro ao conectar ao banco."]));
}

// Lê os dados JSON enviados
$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];
$senha = $data["senha"];

// Verifica o usuário no banco
$sql = "SELECT * FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($senha, $user["senha"])) {
        echo json_encode(["status" => "ok", "mensagem" => "Login realizado com sucesso!", "nome" => $user["nome"]]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Senha incorreta."]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não encontrado."]);
}

$conn->close();
?>
