<?php
$jsonString = file_get_contents('status.json');
$data = json_decode($jsonString, true);

if ($_GET['action'] == 'sim') {
	// Settings Q values
	if (isset($_GET['Q1']) && isset($_GET['Q2']) && isset($_GET['Q3']) && isset($_GET['Q4'])) {
		$data['Q1'] = $_GET['Q1'];
		$data['Q2'] = $_GET['Q2'];
		$data['Q3'] = $_GET['Q3'];
		$data['Q4'] = $_GET['Q4'];
	}

	// Settings I values
	$data['I1'] = $data['Q1'];
	$data['I2'] = $data['Q2'];
	$data['I3'] = $data['Q3'];
	$data['I4'] = $data['Q4'];

	$data['last_call'] =  time();

	// File status data to file
	$jsonString = json_encode($data);
	file_put_contents('status.json', $jsonString);

	echo json_encode(array_intersect_key($data, array_flip(['I1', 'I2', 'I3', 'I4'])));
}
