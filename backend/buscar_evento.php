<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json");
require_once 'conexao.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    $stmt = $conn->prepare("SELECT id, titulo, local, data, organizador, imagem FROM eventos WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $evento = $resultado->fetch_assoc();

    echo json_encode($evento ?: []);
    $stmt->close();
} else {
    echo json_encode([]);
}
?>
