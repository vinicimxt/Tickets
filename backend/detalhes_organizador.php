<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT * FROM organizadores WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $organizador = $resultado->fetch_assoc();

    if ($organizador) {
        echo json_encode($organizador);
    } else {
        echo json_encode(["success" => false, "message" => "Organizador não encontrado"]);
    }
} else {
    // Lista todos organizadores caso não passe id
    $sql = "SELECT * FROM organizadores ORDER BY nome ASC";
    $result = $conn->query($sql);

    $organizadores = [];
    while ($row = $result->fetch_assoc()) {
        $organizadores[] = $row;
    }
    echo json_encode($organizadores);
}
?>
