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
    $title = $data['title'];
    $location = $data['location'];
    $date = $data['date'];
    $organizer = $data['organizer'];
    $image = $data['image'];

    $stmt = $conn->prepare("INSERT INTO eventos (titulo, local, data, organizador, imagem) VALUES (?, ?, ?, ?, ?)");

    $stmt->bind_param("sssss", $title, $location, $date, $organizer, $image);

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
