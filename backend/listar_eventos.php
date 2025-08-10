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
    $stmt = $conn->prepare("SELECT * FROM eventos WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $evento = $resultado->fetch_assoc();

    if ($evento) {
        echo json_encode($evento);
    } else {
        echo json_encode(null);
    }
} else {
    // Caso não tenha id, pode retornar todos os eventos ou erro
    $sql = "SELECT * FROM eventos ORDER BY data ASC";
    $result = $conn->query($sql);

    $eventos = [];
    while ($row = $result->fetch_assoc()) {
        $eventos[] = $row;
    }
    echo json_encode($eventos);
}
?>
