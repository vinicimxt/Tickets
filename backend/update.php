<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Se for uma preflight request (OPTIONS), encerra aqui
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ... seu código PHP continua aqui ...

include 'conexao.php'; // conexão com o banco

$data = json_decode(file_get_contents('php://input'), true);

$nome = $data['nome'];
$emailNovo = $data['emailNovo'];
$emailAntigo = $data['emailAntigo'];
$senha = $data['senha'];


// Você pode usar uma forma segura com password_hash
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

// Atualizar no banco (exemplo usando o e-mail como identificador único)
$sql = "UPDATE usuarios SET nome=?, email=?, senha=? WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $emailNovo, $senha_hash, $emailAntigo);


if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "message" => $stmt->error]);
}
?>
