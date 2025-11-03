<?php
// Set response type
header('Content-Type: application/json');

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $params = $_GET; // query parameters, e.g. ?id=123
    echo json_encode([
        'method' => 'GET',
        'received' => $params
    ]);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input'); // raw body
    $data = json_decode($body, true); // parse JSON
    echo json_encode([
        'method' => 'POST',
        'received' => $data
    ]);
    exit;
}