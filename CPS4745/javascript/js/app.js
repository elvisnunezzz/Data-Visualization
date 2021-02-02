let data = [];
let dataSelect = 0;
let dataSet = [];
$(document).ready(function(){
    $("#loginForm").on("click", function(event){
        event.preventDefault();
        var user = $("#user").val();
        var pass = $("#pass").val();

        if( user === "" ){
            Swal.fire("No user data","Type a username", "warning");
            return false;
        }

        if( pass === "" ){
          Swal.fire("No password data","Type a password", "warning");
          return false;
        }

        $.ajax({
            url: "login.php",
            type: "POST",
            dataType: "JSON",
            data: {
                user: user,
                pass: pass
            },
            success: function(response){
                if( response.status ){
                    Swal.fire("Login Success","","success");
                    location.reload();
                }else{
                  Swal.fire(response.title,response.response,"warning");
                }
            },
            error: function(error){
              console.error(error.responseText);
            }
        });


    });

    $("#logout").on("click", function(event){
        Swal.fire({
          title: 'Do you want to logout?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
              let timerInterval
              Swal.fire({
                title: 'Successfully logout',
                html: 'I will close in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                willOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                      const b = content.querySelector('b')
                      if (b) {
                        b.textContent = Swal.getTimerLeft()
                      }
                    }
                  }, 100)
                },
                willClose: () => {
                  location.href="logout.php";
                  clearInterval(timerInterval)
                }
              });             
          }
        })
    });

    $("#loadData1").on("click", function(event){
        event.preventDefault();
        dataSelect = 1
        $.ajax({
            url: "data.php",
            type: "POST",
            dataType: "JSON",
            data: {
                opc: 1,
                slide: $("#avgWagesSlide").val()
            },
            success: function(response){
                console.log(response);
                // Mostrar tabla con datos
                google.charts.load('current', {'packages':['table']});
                google.charts.setOnLoadCallback(drawTable);

                function drawTable() {
                    var data = new google.visualization.DataTable();
                    $.each(response.head, function(index, value){
                        data.addColumn('string', value);
                    });
                    console.log(response.body.length);
                    data.addRows(response.body);
                    //data.setCell(0, 2, "", {'style': 'background-color: red;'});

                    var table = new google.visualization.Table(document.getElementById('table_div'));

                    table.draw(data, {showRowNumber: true, width: '100%', height: '100%', page: true, allowHtml: true });
                }

                $("#barChart").fadeIn();
                $("#lineChart").fadeIn();

                dataSet = response.data;
                var option = $(".typeGraf:checked").val();

                if( option == "option1" ){
                    AvgWages();
                }

                if( option == "option2" ){
                    EstimatedPopulation();
                }

                if( option == "option3" ){
                    State();
                }
            },
            error: function(error){
                console.error(error.responseText);
            }
        });
    });

    $("#loadData2").on("click", function(event){
        event.preventDefault();
        dataSelect = 2;

        $.ajax({
            url: "data.php",
            type: "POST",
            dataType: "JSON",
            data: {
                opc: 2,
                slide: $("#avgWagesSlide").val()
            },
            success: function(response){
                console.log(response);
                // Mostrar tabla con datos
                google.charts.load('current', {'packages':['table']});
                google.charts.setOnLoadCallback(drawTable);

                function drawTable() {
                    var data = new google.visualization.DataTable();
                    $.each(response.head, function(index, value){
                        data.addColumn('string', value);
                    });
                    data.addRows(response.body);

                    var table = new google.visualization.Table(document.getElementById('table_div'));

                    table.draw(data, {showRowNumber: true, width: '100%', height: '100%', page: true, allowHtml: true });
                }

                $("#barChart").fadeIn();
                $("#lineChart").fadeIn();

                dataSet = response.data;
                var option = $(".typeGraf:checked").val();

                if( option == "option1" ){
                    AvgWages();
                }

                if( option == "option2" ){
                    EstimatedPopulation();
                }

                if( option == "option3" ){
                    State();
                }
            },
            error: function(error){
                console.error(error.responseText);
            }
        });
    });

    $(".typeGraf").on("click",function(){
        if( dataSet.length > 0 ){
            var option = $(this).val();

            if( option == "option1" ){
                AvgWages();
            }

            if( option == "option2" ){
                EstimatedPopulation();
            }

            if( option == "option3" ){
                State();
            }
        }
    });

    function AvgWages(){
        $("#titleChart1").text("Bar Chart");

        let headData = [];
        $.each(dataSet, function(index,value){
            headData.push(value[3]);
        });

        var uniqHead = headData.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        });

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['bar']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart1);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart1() {
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'State');
            data.addColumn('number', 'AvgWages');

            $.each(uniqHead, function(i,v){
                let sum = 0;
                let rec = 0;
                $.each(dataSet, function(index,value){
                    if( value[3] === v ){
                        if( parseFloat(value[5]) > 0 ){
                            rec += 1;
                            sum += parseFloat(value[5]);
                        }
                    }
                });

                data.addRow([v, (sum/rec)]);
                sum = 0;
                rec = 0;
            });

            // Set chart options
            var options = {
                'legend':'left',
                'width': "100%",
                'height':300
            };

            // Instantiate and draw our chart, passing in some options.
            var barChart1 = new google.charts.Bar(document.getElementById('Chart1'));

            // printing the graph
            barChart1.draw(data, google.charts.Bar.convertOptions(options));
        }

        $("#titleChart2").text("Line Chart");
        // Load the Visualization API and the corechart package.
        // google.charts.load('current', {'packages':['corechart']});
        google.charts.load('current', {'packages':['line']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChartLine1);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChartLine1() {
            // Create the data table.
            var data1 = new google.visualization.DataTable();
            data1.addColumn('string', 'State');
            data1.addColumn('number', 'AvgWages');

            $.each(uniqHead, function(i,v){
                let sum = 0;
                let rec = 0;
                $.each(dataSet, function(index,value){
                    if( value[3] === v ){
                        if( parseFloat(value[5]) > 0 ){
                            rec += 1;
                            sum += parseFloat(value[5]);
                        }
                    }
                });

                data1.addRow([v, (sum/rec)]);
                sum = 0;
                rec = 0;
            });

            // Set chart options
            var options1 = {
                'legend':'left',
                'width': "100%",
                'height':300
            };

            // Instantiate and draw our chart, passing in some options.
            var lineChart1 = new google.charts.Line(document.getElementById('Chart2'));
            // printing the graph
            lineChart1.draw(data1, google.charts.Line.convertOptions(options1));
        }
    }

    function EstimatedPopulation(){
        $("#titleChart1").text("Bar Chart");
        let headData = [];
        $.each(dataSet, function(index,value){
            headData.push(value[3]);
        });

        var uniqHead = headData.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        });

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['bar']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart2);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart2() {
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'State');
            data.addColumn('number', 'EstimatedPopulation');

            $.each(uniqHead, function(i,v){
                let sum = 0;
                let rec = 0;
                $.each(dataSet, function(index,value){
                    if( value[3] === v ){
                        if( parseFloat(value[4]) > 0 ){
                            rec += 1;
                            sum += parseFloat(value[4]);
                        }
                    }
                });

                data.addRow([v, (sum/rec)]);
                sum = 0;
                rec = 0;
            });

            // Set chart options
            var options = {
                'legend':'left',
                'width': "100%",
                'height':300
            };

            // Instantiate and draw our chart, passing in some options.
            var barChart2 = new google.charts.Bar(document.getElementById('Chart1'));

            // printing the graph
            barChart2.draw(data, google.charts.Bar.convertOptions(options));
        }

        $("#titleChart2").text("Line Chart");
        // Load the Visualization API and the corechart package.
        // google.charts.load('current', {'packages':['corechart']});
        google.charts.load('current', {'packages':['line']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChartLine2);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChartLine2() {
            // Create the data table.
            var data1 = new google.visualization.DataTable();
            data1.addColumn('string', 'State');
            data1.addColumn('number', 'EstimatedPopulation');

            $.each(uniqHead, function(i,v){
                let sum = 0;
                let rec = 0;
                $.each(dataSet, function(index,value){
                    if( value[3] === v ){
                        if( parseFloat(value[4]) > 0 ){
                            rec += 1;
                            sum += parseFloat(value[4]);
                        }
                    }
                });

                data1.addRow([v, (sum/rec)]);
                sum = 0;
                rec = 0;
            });

            // Set chart options
            var options1 = {
                'legend':'left',
                'width': "100%",
                'height':300
            };

            // Instantiate and draw our chart, passing in some options.
            var lineChart2 = new google.charts.Line(document.getElementById('Chart2'));
            // printing the graph
            lineChart2.draw(data1, google.charts.Line.convertOptions(options1));
        }
    }

    function State(){
        $("#titleChart1").text("Bar Chart");

        let headData = [];
        $.each(dataSet, function(index,value){
            headData.push(value[3]);
        });

        var uniqHead = headData.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        });

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['bar']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart3);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart3() {
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'State');
            data.addColumn('number', 'City');

            $.each(uniqHead, function(i,v){
                let sum = 0;
                let rec = 0;
                $.each(dataSet, function(index,value){
                    if( value[3] === v ){
                        //if( parseFloat(value[7]) > 0 ){
                            rec += 1;
                            //sum += parseFloat(value[7]);
                        //}
                    }
                });

                // data.addRow([v, (sum/rec)]);
                data.addRow([v, rec]);
                sum = 0;
                rec = 0;
            });

            // Set chart options
            var options = {
                'legend':'left',
                'width': "100%",
                'height':300
            };

            // Instantiate and draw our chart, passing in some options.
            var barChart3 = new google.charts.Bar(document.getElementById('Chart1'));

            // printing the graph
            barChart3.draw(data, google.charts.Bar.convertOptions(options));
        }

        $("#titleChart2").text("Pie Chart");
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {
            // Create the data table.
            var data1 = new google.visualization.DataTable();
            data1.addColumn('string', 'State');
            data1.addColumn('number', 'City');

            $.each(uniqHead, function(i,v){
                let sum = 0;
                $.each(dataSet, function(index,value){
                    if( value[3] === v ){
                        sum += 1;
                    }
                });

                data1.addRow([v, sum]);
            });

            // Set chart options
            var options1 = {
                'legend':'left',
                'width': "100%",
                'height': 300
            };

            // Instantiate and draw our chart, passing in some options.
            var pieChart = new google.visualization.PieChart(document.getElementById('Chart2'));

            // printing the graph
            pieChart.draw(data1, options1);
        }
    }

    $("#avgWagesSlide").on("change", function(){
        if( $("#avgWages:checked").val() === "option1" ){
            var avgWages = $(this).val();
            $("#avgCount").text(avgWages);

            $.ajax({
                url: "data.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    opc: dataSelect,
                    slideOpc: 1,
                    slide: $("#avgWagesSlide").val()
                },
                success: function(response){
                    // Mostrar tabla con datos
                    google.charts.load('current', {'packages':['table']});
                    google.charts.setOnLoadCallback(drawTable);

                    function drawTable() {
                        var data = new google.visualization.DataTable();
                        $.each(response.head, function(index, value){
                            data.addColumn('string', value);
                        });
                        console.log(response.body.length);
                        data.addRows(response.body);
                        //data.setCell(0, 2, "", {'style': 'background-color: red;'});

                        var table = new google.visualization.Table(document.getElementById('table_div'));

                        table.draw(data, {showRowNumber: true, width: '100%', height: '100%', page: true, allowHtml: true });
                    }

                    $("#barChart").fadeIn();
                    $("#lineChart").fadeIn();

                    dataSet = response.data;
                    var option = $(".typeGraf:checked").val();

                    if( option == "option1" ){
                        AvgWages();
                    }

                    if( option == "option2" ){
                        EstimatedPopulation();
                    }

                    if( option == "option3" ){
                        State();
                    }
                },
                error: function(error){
                    console.error(error.responseText);
                }
            });
        }
    });

    $("#estPopSlide").on("change", function(){
        if( $("#estimatedPop:checked").val() === "option2" ){
            $("#populationCount").text($(this).val());
            $.ajax({
                url: "data.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    opc: dataSelect,
                    slideOpc: 2,
                    slide: $("#estPopSlide").val()
                },
                success: function(response){
                    // Mostrar tabla con datos
                    google.charts.load('current', {'packages':['table']});
                    google.charts.setOnLoadCallback(drawTable);

                    function drawTable() {
                        var data = new google.visualization.DataTable();
                        $.each(response.head, function(index, value){
                            data.addColumn('string', value);
                        });
                        console.log(response.body.length);
                        data.addRows(response.body);
                        //data.setCell(0, 2, "", {'style': 'background-color: red;'});

                        var table = new google.visualization.Table(document.getElementById('table_div'));

                        table.draw(data, {showRowNumber: true, width: '100%', height: '100%', page: true, allowHtml: true });
                    }

                    $("#barChart").fadeIn();
                    $("#lineChart").fadeIn();

                    dataSet = response.data;
                    var option = $(".typeGraf:checked").val();

                    if( option == "option1" ){
                        AvgWages();
                    }

                    if( option == "option2" ){
                        EstimatedPopulation();
                    }

                    if( option == "option3" ){
                        State();
                    }
                },
                error: function(error){
                    console.error(error.responseText);
                }
            });
        }
    });

    $("#saveUserSetting").on("click", function(){
        $.ajax({
            url: "configData.php",
            type: "POST",
            dataType: "JSON",
            data: {
                avgWagesSlide: $("#avgWagesSlide").val(),
                estPopSlide: $("#estPopSlide").val()
            },
            success: function(response){
                if( response.status ){
                    Swal.fire("User Setting Saved","","success");
                }else{
                    Swal.fire(response.title,response.response,"warning");
                }
            },
            error: function(error){
                console.error(error.responseText);
            }
        });
    });



    $("#UploadFile").on("click", function(){
        // Validar que hallas seleccionado un archivo
        if( $("#files")[0].files.length > 0 ){
            // Validar que el archivo es de tipo csv
            if( $("#files")[0].files[0].name.split(".")[1] == "csv" ){
                let file = $("#files")[0].files[0];
                let reader = new FileReader();  

                // Leer archivo csv
                reader.onload = (e) => {
                    data = parseCSV(e.target.result);
                    let dataHead = [];
                    $.each(data, function(index, value){
                        if( index == 0 ){
                          dataHead.push(value);
                        }

                        if (index > 0 && value != "") {
                            dataSet.push(value);
                        }
                    });

                    // Mostrar cantidad de datos cargados
                    $("#alertMessage").text("Rows: "+dataSet.length);
                    $("#alertMessage").addClass("alert-success");
                    $("#alertMessage").show();

                    // Mostrar tabla con datos
                    google.charts.load('current', {'packages':['table']});
                    google.charts.setOnLoadCallback(drawTable);
                  
                    function drawTable() {
                      var data = new google.visualization.DataTable();
                      $.each(dataHead[0], function(index, value){
                          data.addColumn('string', value);
                      });                                        
                      data.addRows(dataSet);

                      var table = new google.visualization.Table(document.getElementById('table_div'));

                      table.draw(data, {showRowNumber: true, width: '100%', height: '100%', page: true });
                    }

                    // ocultar ventanda de cargar archivo
                    $('#fileModal').modal('hide');
                };

                // Leemos el contenido del archivo seleccionado
                reader.readAsBinaryString(file);
            }else{
                Swal.fire("Debes seleccionar un archivo .csv","","warning");
            }
        }else{
            Swal.fire("Debes seleccionar un archivo","","warning");
        }        
    });

    $("#exit").on("click", function(){
        Swal.fire({
          title: 'Exit',
          text: "Are you sure you want to exit?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
    });

    $("#lineChartShow").on("click", function(){
        // Validar que hay datos cargados
        if( dataSet.length == 0  ){
            // Poner mensaje de que debes cargar los datos
            Swal.fire("","","warning");
            return false;
        }

        let headData = [];
        $.each(dataSet, function(index,value){
            headData.push(value[3]);
        });

        var uniqHead = headData.filter(function(item, index, array) {
          return array.indexOf(item) === index;
        });

        var option = $(".typeGraf:checked").val();
        if( option == "option1" || option == "option2" ){
            $("#lineChart").show();
            $("#pieChart").hide();
            $("#barChart").hide();
            $("#map").hide();            

            if( option == "option1" ){
              // Load the Visualization API and the corechart package.
              // google.charts.load('current', {'packages':['corechart']});
              google.charts.load('current', {'packages':['line']});

              // Set a callback to run when the Google Visualization API is loaded.
              google.charts.setOnLoadCallback(drawChart);

                // Callback that creates and populates a data table,
                // instantiates the pie chart, passes in the data and
                // draws it.
                function drawChart() {
                    // Create the data table.
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'State');
                    data.addColumn('number', 'AvgWages');

                    $.each(uniqHead, function(i,v){
                      let sum = 0;
                      let rec = 0;
                      $.each(dataSet, function(index,value){
                          if( value[3] === v ){
                              if( parseFloat(value[7]) > 0 ){
                                rec += 1;
                                sum += parseFloat(value[7]);
                              }                        
                          }
                      });

                      data.addRow([v, (sum/rec)]);
                      sum = 0;
                      rec = 0;
                    });

                    // Set chart options
                    var options = {
                      'legend':'left',
                      'width': 1400,
                      'height':600
                    };

                    // Instantiate and draw our chart, passing in some options.
                    var lineChart = new google.charts.Line(document.getElementById('lineChartG'));
                    // printing the graph
                    lineChart.draw(data, google.charts.Line.convertOptions(options));                    
                }
            }

            if( option == "option2" ){
                // Load the Visualization API and the corechart package.
                // google.charts.load('current', {'packages':['corechart']});
                google.charts.load('current', {'packages':['line']});

                // Set a callback to run when the Google Visualization API is loaded.
                google.charts.setOnLoadCallback(drawChart);

                // Callback that creates and populates a data table,
                // instantiates the pie chart, passes in the data and
                // draws it.
                function drawChart() {
                  // Create the data table.
                  var data = new google.visualization.DataTable();
                  data.addColumn('string', 'State');
                  data.addColumn('number', 'EstimatedPopulation');

                  $.each(uniqHead, function(i,v){
                    let sum = 0;
                    let rec = 0;
                    $.each(dataSet, function(index,value){
                        if( value[3] === v ){
                            if( parseFloat(value[6]) > 0 ){
                              rec += 1;
                              sum += parseFloat(value[6]);
                            }                        
                        }
                    });

                    data.addRow([v, (sum/rec)]);
                    sum = 0;
                    rec = 0;
                  });

                  // Set chart options
                  var options = {
                    'legend':'left',
                    'width': 1400,
                    'height':600
                  };

                  // Instantiate and draw our chart, passing in some options.
                  // var chart = new google.visualization.LineChart(document.getElementById('lineChartG'));
                  // chart.draw(data, options);
                  var lineChart = new google.charts.Line(document.getElementById('lineChartG'));
                  // printing the graph
                  lineChart.draw(data, google.charts.Line.convertOptions(options));
                }
            }            
        }else{
            // Poner mensaje de que no es la opcion correcta
            Swal.fire("","","warning");
            return false;
        }
    });

    $("#PieChartShow").on("click", function(){
        if( dataSet.length == 0  ){
            // Poner mensaje de que debes cargar los datos
            Swal.fire("","","warning");
            return false;
        }

        let headData = [];
        $.each(dataSet, function(index,value){
            headData.push(value[3]);
        });

        var uniqHead = headData.filter(function(item, index, array) {
          return array.indexOf(item) === index;
        });

        var option = $(".typeGraf:checked").val();

        if( option == "option3" ){
            $("#pieChart").show();
            $("#lineChart").hide();
            $("#barChart").hide();
            $("#map").hide();

            if( option == "option3" ){
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);

                // Callback that creates and populates a data table,
                // instantiates the pie chart, passes in the data and
                // draws it.
                function drawChart() {
                    // Create the data table.
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'State');
                    data.addColumn('number', 'City');

                    $.each(uniqHead, function(i,v){
                      let sum = 0;
                      $.each(dataSet, function(index,value){
                          if( value[3] === v ){
                              sum += 1;
                          }
                      });

                      data.addRow([v, sum]);
                    });



                    // Set chart options
                    var options = {
                      'legend':'left',
                      'width': 1400,
                      'height':600
                    };

                    // Instantiate and draw our chart, passing in some options.
                    var pieChart = new google.visualization.PieChart(document.getElementById('pieChartG'));

                    // printing the graph
                    pieChart.draw(data, options);                    
                }
            }
        }else{
          // Poner mensaje de que no es la opcion correcta
          Swal.fire("","","warning");
        }
    });

    $("#BarChartShow").on("click", function(){

        if( dataSet.length == 0  ){
            // Poner mensaje de que debes cargar los datos
            Swal.fire("","","warning");
            return false;
        }
        
        let headData = [];
        $.each(dataSet, function(index,value){
            headData.push(value[3]);
        });

        var uniqHead = headData.filter(function(item, index, array) {
          return array.indexOf(item) === index;
        });

        var option = $(".typeGraf:checked").val();

        if( option == "option1" || option == "option2" || option == "option3" ){
            $("#pieChart").hide();
            $("#lineChart").hide();
            $("#barChart").show();
            $("#map").hide();

            if( option == "option1" ){
                // Load the Visualization API and the corechart package.
                google.charts.load('current', {'packages':['bar']});

                // Set a callback to run when the Google Visualization API is loaded.
                google.charts.setOnLoadCallback(drawChart);

                // Callback that creates and populates a data table,
                // instantiates the pie chart, passes in the data and
                // draws it.
                function drawChart() {
                    // Create the data table.
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'State');
                    data.addColumn('number', 'AvgWages');

                    $.each(uniqHead, function(i,v){
                      let sum = 0;
                      let rec = 0;
                      $.each(dataSet, function(index,value){
                          if( value[3] === v ){
                              if( parseFloat(value[7]) > 0 ){
                                rec += 1;
                                sum += parseFloat(value[7]);
                              }                        
                          }
                      });

                      data.addRow([v, (sum/rec)]);
                      sum = 0;
                      rec = 0;
                    });



                    // Set chart options
                    var options = {
                      'legend':'left',
                      'width': 1400,
                      'height':600
                    };

                    // Instantiate and draw our chart, passing in some options.
                    var barChart = new google.charts.Bar(document.getElementById('barChartG'));

                    // printing the graph
                    barChart.draw(data, google.charts.Bar.convertOptions(options));                    
                }
            }

            if( option == "option2" ){
                // Load the Visualization API and the corechart package.
                google.charts.load('current', {'packages':['bar']});

                // Set a callback to run when the Google Visualization API is loaded.
                google.charts.setOnLoadCallback(drawChart);

                // Callback that creates and populates a data table,
                // instantiates the pie chart, passes in the data and
                // draws it.
                function drawChart() {
                    // Create the data table.
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'State');
                    data.addColumn('number', 'EstimatedPopulation');

                    $.each(uniqHead, function(i,v){
                      let sum = 0;
                      let rec = 0;
                      $.each(dataSet, function(index,value){
                          if( value[3] === v ){
                              if( parseFloat(value[6]) > 0 ){
                                rec += 1;
                                sum += parseFloat(value[6]);
                              }                        
                          }
                      });

                      data.addRow([v, (sum/rec)]);
                      sum = 0;
                      rec = 0;
                    });



                    // Set chart options
                    var options = {
                      'legend':'left',
                      'width': 1400,
                      'height':600
                    };

                    // Instantiate and draw our chart, passing in some options.
                    var barChart = new google.charts.Bar(document.getElementById('barChartG'));

                    // printing the graph
                    barChart.draw(data, google.charts.Bar.convertOptions(options));                    
                }
            }

            if( option == "option3" ){
                // Load the Visualization API and the corechart package.
                google.charts.load('current', {'packages':['bar']});

                // Set a callback to run when the Google Visualization API is loaded.
                google.charts.setOnLoadCallback(drawChart);

                // Callback that creates and populates a data table,
                // instantiates the pie chart, passes in the data and
                // draws it.
                function drawChart() {
                    // Create the data table.
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'State');
                    data.addColumn('number', 'City');

                    $.each(uniqHead, function(i,v){
                      let sum = 0;
                      $.each(dataSet, function(index,value){
                          if( value[3] === v ){
                              sum += 1;
                          }
                      });

                      data.addRow([v, sum]);
                    });



                    // Set chart options
                    var options = {
                      'legend':'left',
                      'width': 1400,
                      'height':600
                    };

                    // Instantiate and draw our chart, passing in some options.
                    var barChart = new google.charts.Bar(document.getElementById('barChartG'));

                    // printing the graph
                    barChart.draw(data, google.charts.Bar.convertOptions(options));                    
                }
            }
        }else{
          // Poner mensaje de que no es la opcion correcta
          Swal.fire("","","warning");
        }
    });

    $("#MapShow").on("click", function(){
        if( data.length == 0  ){
            // Poner mensaje de que debes cargar los datos
            Swal.fire("","","warning");
            return false;
        }
        
        if( $(".typeGraf:checked").val() == "" ){
        }else{
          // Poner mensaje de que no es la opcion correcta
          Swal.fire("","","warning");
        }

        $("#map").show();
        $("#lineChart").hide();
        $("#pieChart").hide();
        $("#barChart").hide();
    });

    $("#modalTriggerClient").on("click", function(){
      console.log(navigator);
        var appname = navigator.appCodeName;
        var version = navigator.appVersion;
        var name = navigator.appName;
        var cookie = navigator.cookieEnabled;
        var java = navigator.javaEnabled();
        var html = '';

        html += "<p><b>User's browser:</b> "+appname+"</p>";
        html += '<p><b>OS information:</b> '+version+'</p>';
        html += '<p><b>Name:</b> '+name+'</p>';
        html += '<p><b>Cookie enable:</b> '+cookie+'</p>';
        html += '<p><b>Java enable:</b> '+java+'</p>';

        $("#textClientModal").html(html);
        $("#clientModal").modal();
    });

});

function parseCSV(text) {
  // Obtenemos las lineas del texto
  let lines = text.replace(/\r/g, '').split('\n');
  return lines.map(line => {
    // Por cada linea obtenemos los valores
    let values = line.split(',');
    return values;
  });
}



