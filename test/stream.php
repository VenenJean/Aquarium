<?php
header("Content-Type: text/event-stream; charset=utf-8");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

set_time_limit(0);

$file = __DIR__ . DIRECTORY_SEPARATOR . "data.json";
$lastChange = 0;

while (true) {
    if (connection_aborted()) {
        break;
    }

    clearstatcache(false, $file);
    $currentChange = file_exists($file) ? filemtime($file) : 0;

    if ($currentChange !== $lastChange) {
        $lastChange = $currentChange;

        if (file_exists($file)) {
            $data = file_get_contents($file);
            // Send as SSE data: must escape newlines with \n lines already present, but SSE supports json text
            echo "data: " . str_replace("\n", "\ndata: ", $data) . "\n\n";
            @ob_flush();
            @flush();
        }
    }

    // heartbeat to keep connection alive
    echo ": heartbeat\n\n";
    @ob_flush();
    @flush();

}