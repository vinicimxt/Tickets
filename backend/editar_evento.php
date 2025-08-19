<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';



$data = json_decode(file_get_contents("php://input"), true);

if (
    $data && 
    isset($data['id']) && 
    isset($data['titulo']) && 
    isset($data['local']) && 
    isset($data['data']) && 
    isset($data['organizador_id']) && 
    isset($data['imagem'])&&
    isset($data['descricao'])&&
    isset($data['lineup'])&&
    isset($data['imagemMapa'])
) {
    $id = intval($data['id']);
    $titulo = $data['titulo'];
    $local = $data['local'];
    $data_evento = $data['data'];
    $organizador_id = $data['organizador_id'];
    $imagem = $data['imagem'];
    $descricao = $data ['descricao'];
    $lineup = $data ['lineup'];
    $imagemMapa = $data ['imagemMapa'];

    $stmt = $conn->prepare("UPDATE eventos SET titulo = ?, local = ?, data = ?, organizador_id = ?, imagem = ?, descricao = ?, lineup = ? , imagemMapa = ? WHERE id = ?");
    $stmt->bind_param("sssisssss", $titulo, $local, $data_evento, $organizador_id, $imagem,$descricao, $lineup, $imagemMapa, $id);

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
