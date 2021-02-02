<?php
@session_start();

$conf_AvgWage = 0;
$conf_EstPop = 0;

if (isset($_SESSION["is_login"]) && $_SESSION["is_login"] == true){
    $conf_AvgWage = $_SESSION["conf_AvgWage"];
    $conf_EstPop = $_SESSION["conf_EstPop"];
}

?>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="generator" content="">
  <title>Project 2</title>

  <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/starter-template/">

  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <meta name="theme-color" content="#563d7c">

  <style>
    body {
      padding-top: 5rem;
    }

    .starter-template {
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }
  </style>
</head>

<body>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Project 2 </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            File
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#LoginModal">Login to Database</a>
            <?php if (isset($_SESSION["is_login"]) && $_SESSION["is_login"] == true) : ?>
              <a class="dropdown-item" href="#" id="loadData1">Load DB Data1</a>
              <a class="dropdown-item" href="#" id="loadData2">Load DB Data2</a>
            <?php endif; ?>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#fileModal">Load CSV File</a>
            <a class="dropdown-item" href="#" id="logout">Logout DB</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            View
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" id="lineChartShow">Line Chart</a>
            <a class="dropdown-item" href="#" id="PieChartShow">Pie Chart</a>
            <a class="dropdown-item" href="#" id="BarChartShow">Bar Chart</a>
            <a class="dropdown-item" href="#" id="MapShow">Map</a>
              <a class="dropdown-item" href="graph/" target="_blank">New Chart</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Setting
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">User Info</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Help
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#infoModal">Info</a>
            <a class="dropdown-item" href="#" id="modalTriggerClient">Client</a>
          </div>
        </li>
      </ul>

      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#"><?php
                                        if (isset($_SESSION["is_login"]) && $_SESSION["is_login"] == true) {
                                          echo $_SESSION["name"];
                                          echo"<br>";
                                          echo"Message: Successfully login";
                                        }

                                        ?></a>
        </li>
    </div>
  </nav>

  <main role="main" class="container-fluid">
    <div class="row">
        <div class="col-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Selection</h3>
                </div>
                <div class="card-body">
                    <p><b>Note:</b> The empty, NULL or NaN value will be excluded should be displayed above the radio buttons.</p>
                    <div class="form-check">
                        <input class="form-check-input typeGraf" type="radio" name="typeGraf" id="avgWages" value="option1" checked>
                        <label class="form-check-label" for="avgWages">
                            AvgWages (Bar, Line)
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input typeGraf" type="radio" name="typeGraf" id="estimatedPop" value="option2">
                        <label class="form-check-label" for="estimatedPop">
                            EstimatedPopulation (Bar, Line)
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input typeGraf" type="radio" name="typeGraf" id="state" value="option3">
                        <label class="form-check-label" for="state">
                            State (Bar, Pie)
                        </label>
                    </div>

                    <div class="form-group">
                        <label for="avgWagesSlide">AvgWages - <span id="avgCount"></span></label>
                        <input type="range" class="form-control-range" id="avgWagesSlide" name="avgWagesSlide" min="1" max="150000" value="<?php echo $conf_AvgWage; ?>">
                    </div>

                    <div class="form-group">
                        <label for="estPopSlide">EstimatedPopulation - <span id="populationCount"></span></label>
                        <input type="range" class="form-control-range" id="estPopSlide" name="estPopSlide" min="1" max="60000" value="<?php echo $conf_EstPop; ?>">
                    </div>
                    <?php if (isset($_SESSION["is_login"]) && $_SESSION["is_login"] == true): ?>
                        <button type="button" id="saveUserSetting" class="btn btn-primary btn-block">Save User Setting</button>
                    <?php endif; ?>
                    <div id="alertMessage" class="alert" role="alert" style="display: none;"></div>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
        <div class="col-10" style="margin-bottom: 20px;">
            <div class="row">
                <div class="col-6">
                    <!-- BAR CHART -->
                    <div id="barChart" class="card" style="display: none;">
                        <div class="card-header">
                            <h3 class="card-title" id="titleChart1"></h3>
                        </div>
                        <div class="card-body" style="overflow: auto;">
                            <div id="Chart1"></div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>

                <div class="col-6">
                    <!-- LINE CHART -->
                    <div id="lineChart" class="card" style="display: none;">
                        <div class="card-header">
                            <h3 class="card-title" id="titleChart2"></h3>
                        </div>
                        <div class="card-body" style="overflow: auto;">
                            <div id="Chart2"></div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data</h3>
                </div>
                <div class="card-body">
                    <div id="table_div" style="height:  300px;"></div>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
    </div>
  </main><!-- /.container -->

  <!-- Modal -->
  <div class="modal fade" id="fileModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="input-group">
              <div class="custom-file">
                <input type="file" id="files" class="custom-file-input" accept=".csv" required />
                <label class="custom-file-label" for="inputGroupFile04">Upload a CSV formatted file:</label>
              </div>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="UploadFile">Upload</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Info -->
  <div class="modal fade" id="infoModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p><b>Name:</b> Elvis Nunez</p>
          <p><b>Class ID:</b> CPS4890</p>
          <p><b>Date:</b> 14/12/2020</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Client -->
  <div class="modal fade" id="clientModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id="textClientModal" class="modal-body"></div>
      </div>
    </div>
  </div>

  <!-- Login Modal -->
  <div class="modal fade" id="LoginModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1>Login Database</h1>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="user">User</label>
              <input type="text" class="form-control" id="user" name="user" required>
            </div>
            <div class="form-group">
              <label for="pass">Password</label>
              <input type="password" class="form-control" id="pass" name="pass" required>
            </div>
            <button id="loginForm" type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
  <script type="text/javascript" src="js/app.js"></script>


</body>

</html>