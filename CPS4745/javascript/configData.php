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

if( isset($_POST) ){
    if( !empty($_POST["avgWagesSlide"]) && !empty($_POST["estPopSlide"]) ){
        $sql = "SELECT id, uid, login, AvgWage, EstPop, datetime from `2020F_nuneelvi`.User_Setting WHERE login = '".$_SESSION["usuario"]."'";
        $result = mysqli_query($conn, $sql);
        if ( mysqli_num_rows($result) > 0 ) {
            // Update
            $query = "UPDATE `2020F_nuneelvi`.User_Setting SET AvgWage = '".$_POST["avgWagesSlide"]."', EstPop = '".$_POST["estPopSlide"]."', datetime = '".date("Y-m-d H:i:s")."' WHERE login = '".$_SESSION["usuario"]."'";
        }else{
            // Insert
            $query = "INSERT INTO `2020F_nuneelvi`.User_Setting(uid,login,AvgWage,EstPop,datetime) VALUES ('".$_SESSION["uid"]."','".$_SESSION["usuario"]."','".$_POST["avgWagesSlide"]."','".$_POST["estPopSlide"]."','".date("Y-m-d H:i:s")."')";
        }

        if( mysqli_query($conn, $query) ){
            echo json_encode(array("status" => true));
        }else{
            echo json_encode(array("status" => false, "title" => "Configuration was not save", "response" => "Please try again"));
        }
    }
}