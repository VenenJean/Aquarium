<?php
// Set response type and CORS headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Helper to send JSON response and exit
function send_json($payload, $code = 200) {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $params = $_GET;
    send_json([
        'method' => 'GET',
        'received' => $params
    ]);
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        send_json(['error' => 'Invalid JSON input', 'details' => json_last_error_msg()], 400);
    }

    // Support both { q1,q2,q3,q4 } and { aquariumState: { q1,... } }
    if (isset($data['aquariumState']) && is_array($data['aquariumState'])) {
        $data = $data['aquariumState'];
    }

    // Extract and normalize fields
    $q1 = array_key_exists('q1', $data) ? (is_numeric($data['q1']) ? (int)$data['q1'] : $data['q1']) : null;
    $q2 = array_key_exists('q2', $data) ? (is_numeric($data['q2']) ? (int)$data['q2'] : $data['q2']) : null;
    $q3 = array_key_exists('q3', $data) ? (is_numeric($data['q3']) ? (int)$data['q3'] : $data['q3']) : null;
    $q4 = array_key_exists('q4', $data) ? (is_numeric($data['q4']) ? (int)$data['q4'] : $data['q4']) : null;

    $payload = [
        'timestamp' => date('Y-m-d H:i:s'),
        'q1' => $q1,
        'q2' => $q2,
        'q3' => $q3,
        'q4' => $q4
    ];

    // Save atomically with lock
    $dataFile = __DIR__ . DIRECTORY_SEPARATOR . 'data.json';
    $tmp = tempnam(sys_get_temp_dir(), 'aq_');
    if ($tmp === false) {
        send_json(['error' => 'Could not create temp file'], 500);
    }

    $json = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents($tmp, $json, LOCK_EX) === false || !rename($tmp, $dataFile)) {
        @unlink($tmp);
        send_json(['error' => 'Failed to save data'], 500);
    }

    send_json([
        'status' => 'success',
        'message' => 'Data received and saved successfully!',
        'received' => $payload
    ], 201);
}

// Method not allowed
send_json(['error' => 'Method not allowed'], 405);
?>

<script>
    const data = <?= json_encode($payload) ?>
</script>