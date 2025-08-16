<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json");
require_once 'conexao.php';

$q = isset($_GET['q']) ? trim($_GET['q']) : '';

if ($q !== '') {
    $stmt = $conn->prepare("SELECT id, titulo, local, data, organizador_id, imagem 
                             FROM eventos 
                             WHERE titulo LIKE ?
                             ORDER BY data ASC");
    $like = "%" . $q . "%";
    $stmt->bind_param("s", $like);
} else {
    $stmt = $conn->prepare("SELECT id, titulo, local, data, organizador_id, imagem 
                             FROM eventos 
                             ORDER BY data ASC");
}

$stmt->execute();
$result = $stmt->get_result();

$eventos = [];
while ($row = $result->fetch_assoc()) {
    $eventos[] = $row;
}

echo json_encode($eventos);
$stmt->close();
?>
