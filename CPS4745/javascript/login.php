<?php
@session_start();
// Creating the credentials for desired database.
$hostName = "imc.kean.edu";
$username = "nuneelvi";
$password = "1025095";
$databaseName = "datamining";

// Creating the connection to the database
$conn = mysqli_connect($hostName, $username, $password, $databaseName);

// Checking if the database is connected
if (!$conn) {
    die("Connection to databases was unsuccessfully! " . mysqli_connect_error());
}

$user = $_POST["user"];
$pass = $_POST["pass"];

$sql = "SELECT u.*, us.AvgWage AS conf_AvgWage, us.EstPop AS conf_EstPop
        FROM DV_User AS u
            LEFT JOIN `2020F_nuneelvi`.User_Setting us ON us.login = u.login
        WHERE u.login = '$user' AND u.password = '$pass'";
$result = mysqli_query($conn, $sql);

header("Content-Type: application/json");

if ( mysqli_num_rows($result) > 0 ) {
    $data = mysqli_fetch_assoc($result);
    $_SESSION["uid"] = $data["uid"];
    $_SESSION["usuario"] = $data["login"];
    $_SESSION["name"] = $data["name"];
    $_SESSION["conf_AvgWage"] = $data["conf_AvgWage"];
    $_SESSION["conf_EstPop"] = $data["conf_EstPop"];
    $_SESSION["is_login"] = true;


    echo json_encode(array("status" => true));
} else {
    echo json_encode(array("status" => false, "title" => "User or password incorrect", "response" => "Please try again"));
}
