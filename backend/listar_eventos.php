<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $stmt = $conn->prepare("
        SELECT e.*,
               o.id AS organizador_id,
               o.nome AS organizador_nome,
               (
                   SELECT COUNT(*) 
                   FROM eventos ev 
                   WHERE ev.organizador_id = e.organizador_id
               ) AS qtdEventos
        FROM eventos e
        LEFT JOIN organizadores o ON e.organizador_id = o.id
        WHERE e.id = ?
        LIMIT 1
    ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $evento = $resultado->fetch_assoc();

    echo json_encode($evento ?: null);
} else {
    // Retorna todos os eventos
    $sql = "
        SELECT e.*,
               o.id AS organizador_id,
               o.nome AS organizador_nome,
               (
                   SELECT COUNT(*) 
                   FROM eventos ev 
                   WHERE ev.organizador_id = e.organizador_id
               ) AS qtdEventos
        FROM eventos e
        LEFT JOIN organizadores o ON e.organizador_id = o.id
        ORDER BY e.data ASC
    ";
    $result = $conn->query($sql);

    $eventos = [];
    while ($row = $result->fetch_assoc()) {
        $eventos[] = $row;
    }
    echo json_encode($eventos);
}
?>
