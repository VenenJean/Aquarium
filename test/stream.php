<?php
// stream.php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

$file = "data.json";
$updateSignal = "data.json";
$lastChange = 0;

while (true) {
    clearstatcache();

    // If file changed, send new data
    $currentChange = file_exists($updateSignal) ? filemtime($updateSignal) : 0;

    if ($currentChange !== $lastChange) {
        $lastChange = $currentChange;

        if (file_exists($file)) {
            $data = file_get_contents($file);
            echo "data: {$data}\n\n";
            ob_flush();
            flush();
        }
    }

    // keep the connection alive
    sleep(1);
}