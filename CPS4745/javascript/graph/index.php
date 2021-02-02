<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
    <!-- Load d3.js -->
    <script src="https://d3js.org/d3.v4.js"></script>
    <!-- Function for radial charts -->
    <script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3-scale-radial.js"></script>
</head>
<body>
    <br>
    <br>
    <div class="container-fluid">
        <div class="row">
            <div class="col-8">
                <div id="my_dataviz"></div>
            </div>

            <div class="col-4">
                    <div class="col-auto">
                      <label for="selectArea_MI">Select option</label>
                      <select class="custom-select" id="selectArea_MI">
                        <option>Choose...</option>
                        <option value="1" selected>Population City</option>
                        <option value="2">Population_metro</option>
                      </select>
                    </div>
                    <br> 
                    <div class="col-auto">
                        <label for="customRange3">Example range</label>
                        <input id="rangePopulation" type="range" class="custom-range" min="0" max="1000000" id="customRange3">
                        <p id="showValueRange"></p>
                    </div>
            </div>
        </div>
    </div>

   <script src="graph.js"></script>

    <?php
    $hostName = "imc.kean.edu";
    $username = "nuneelvi";
    $password = "1025095";
    $databaseName = "datamining";

    // Creating the connection to the database
    $conn = mysqli_connect($hostName, $username, $password, $databaseName);
    $sql_="SELECT t.state, COUNT( t.RecordNumber) as count, t.AvgWages,t.EstimatedPopulation from datamining.DV_project1 t group by t.State" ;
    $result_=mysqli_query($conn,$sql_);
    $json_array=array();
    while($row =mysqli_fetch_assoc($result_)){
    $json_array[] = $row;

    }

    print_r($json_array);

?>


</body>
</html>