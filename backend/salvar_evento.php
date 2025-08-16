<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php'; 

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $titulo = $data['titulo'];
    $local = $data['local'];
    $data_evento = $data['data'];
    $organizador_id = $data['organizador_id'];
    $imagem = $data['imagem'];
    $descricao = $data ['descricao'];
    $lineup = $data ['lineup'];
    $imagemMapa = $data ['imagemMapa'];

    $stmt = $conn->prepare("INSERT INTO eventos (titulo, local, data, organizador_id, imagem, descricao, lineup, imagemMapa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssissss", $titulo, $local, $data_evento, $organizador_id, $imagem, $descricao, $lineup, $imagemMapa);

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
