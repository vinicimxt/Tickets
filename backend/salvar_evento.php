<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php'; // arquivo com conexão

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $titulo = $data['title'];
    $local = $data['location'];
    $data = $data['date'];
    $organizador = $data['organizer'];
    $imagem = $data['image'];

    $stmt = $conn->prepare("INSERT INTO eventos (titulo, local, data, organizador, imagem) VALUES (?, ?, ?, ?, ?)");

    $stmt->bind_param("sssss", $titulo, $local, $data, $organizador, $imagem);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Dados inválidos"]);
}
?>
