<?php
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

$opc = $_POST["opc"];
$slide = $_POST["slide"];
$sql = "";

switch ($opc) {
    case 1:
        if( isset($_POST["slideOpc"]) && !empty($_POST["slideOpc"]) ){
            if( $_POST["slideOpc"] == 1 ){
                $sql = "SELECT RecordNumber, Zipcode, City, State, EstimatedPopulation,AvgWages,Latitude, Longitude FROM vDV_Data1 WHERE AvgWages BETWEEN 0 AND " . $_POST["slide"];
            }else{
                $sql = "SELECT RecordNumber, Zipcode, City, State, EstimatedPopulation,AvgWages,Latitude, Longitude FROM vDV_Data1 WHERE EstimatedPopulation BETWEEN 0 AND " . $_POST["slide"];
            }
        }else{
            $sql = "SELECT RecordNumber, Zipcode, City, State, EstimatedPopulation,AvgWages,Latitude, Longitude FROM vDV_Data1";
        }

        break;

    case 2:
        if( isset($_POST["slideOpc"]) && !empty($_POST["slideOpc"]) ){
            if( $_POST["slideOpc"] == 1 ){
                $sql = "SELECT RecordNumber, Zipcode, City, State, EstimatedPopulation,AvgWages,Latitude, Longitude FROM vDV_Data2 WHERE AvgWages BETWEEN 0 AND " . $_POST["slide"];
            }else{
                $sql = "SELECT RecordNumber, Zipcode, City, State, EstimatedPopulation,AvgWages,Latitude, Longitude FROM vDV_Data2 WHERE EstimatedPopulation BETWEEN 0 AND " . $_POST["slide"];
            }
        }else{
            $sql = "SELECT RecordNumber, Zipcode, City, State, EstimatedPopulation,AvgWages,Latitude, Longitude FROM vDV_Data2";
        }
        break;
}


$result = mysqli_query($conn, $sql);

$dataHead = array();
$dataBody = array();
$count = 0;
$avg = 0;
$avgPopulation = 0;
$data = array();
$data2 = array();

while ($d = mysqli_fetch_assoc($result)) {
    $count++;
    $avg += $d["AvgWages"];
    $avgPopulation += $d["EstimatedPopulation"];
    $data[] = $d;
    $data2[] = array_values($d);
}

foreach($data as $value){
    $dataHead = array_keys($value);
    if( $value["AvgWages"] > ($avg/$count) ){
        $value["AvgWages"] = "<span style='color: red'>".$value["AvgWages"]."</span>";
    }

    if( $value["EstimatedPopulation"] > ($avgPopulation/$count) ){
        $value["EstimatedPopulation"] = "<span style='color: green'>".$value["EstimatedPopulation"]."</span>";
    }
    $dataBody[] = array_values($value);
}

mysqli_free_result($result);

if( $count == 0){
    $count = 1;
}

header("Content-Type: application/json");
echo json_encode(["head" => $dataHead, "body" => $dataBody, "data" => $data2, "avg" => ($avg/$count), "avgPopulation" =>($avgPopulation/$count) ]);
