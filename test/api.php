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
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $body = file_get_contents('php://input'); // raw body
//     $data = json_decode($body, true); // parse JSON
//     echo json_encode([
//         'method' => 'POST',
//         'received' => $data
//     ]);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Read JSON body
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON input']);
        exit;
    }

    // Extract your data fields
    $q1 = $data['q1'] ?? null;
    $q2 = $data['q2'] ?? null;
    $q3 = $data['q3'] ?? null;
    $q4 = $data['q4'] ?? null;

    // Prepare data for saving
    $payload = [
        'timestamp' => date('Y-m-d H:i:s'),
        'q1' => $q1,
        'q2' => $q2,
        'q3' => $q3,
        'q4' => $q4
    ];

    // Save to data.json
    file_put_contents('data.json', json_encode($payload, JSON_PRETTY_PRINT));

    // Send JSON response
    echo json_encode([
        'status' => 'success',
        'message' => 'Data received and saved successfully!',
        'received' => $payload
    ]);
    exit;
}

// Default: if other HTTP method
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
exit;
?>

<script>
    const data = <?= json_encode($payload) ?>
</script>