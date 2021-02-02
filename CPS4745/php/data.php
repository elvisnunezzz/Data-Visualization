<?php
$value = 0;
$option = 1;

if (isset($_GET['value']) && !empty($_GET['value'])) {
    $value = $_GET['value'];
}

if (isset($_GET['opt']) && !empty($_GET['opt'])) {
    $option = $_GET['opt'];
}
// Creating the credentials for desired database.
$hostName = "imc.kean.edu";
$username = "nuneelvi";
$password = "1025095";
$databaseName = "datamining";

// Creating the connection to the database
$conn = mysqli_connect($hostName, $username, $password, $databaseName);

if ($option == 2) {
    // BUscar datos Population_metro
    $sql = "SELECT t.State, t.Population_metro AS value FROM datamining.State_capital t WHERE t.Population_metro BETWEEN 0 AND " . $value;
} else {
    // Buscar datps Population City
    $sql = "SELECT t.State, t.Population_city AS value FROM datamining.State_capital t WHERE t.Population_city BETWEEN 0 AND " . $value;
}

// Checking if the database is connected
if (!$conn) {
    die("Connection to databases was unsuccessfully! " . mysqli_connect_error());
}

$result = mysqli_query($conn, $sql);

$data = array();
for ($z = 0; $z < mysqli_num_rows($result); $z++) {
    $data[] = mysqli_fetch_assoc($result);
}

header('Content-Type: application/json');
echo json_encode($data, JSON_NUMERIC_CHECK);
