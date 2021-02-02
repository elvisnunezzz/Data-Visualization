$(document).on('change', '#rangePopulation', function() {
  $('#showValueRange').html( $(this).val() );
  showGraph($("#selectArea_MI").val(),$(this).val());
});

$(document).on('change', '#selectArea_MI', function() {
  if( $(this).val() == 1 ){
    $("#rangePopulation").attr("min",0);
    $("#rangePopulation").attr("max",1000000);
  }else if( $(this).val() == 2 ){
    $("#rangePopulation").attr("min",0);
    $("#rangePopulation").attr("max",5000000);
  }
  showGraph($(this).val(),$("#rangePopulation").val());
});

showGraph(1,1000000);

function showGraph(option, value)
{
  $("#my_dataviz").empty();
  var margin = {top: 200, right: 0, bottom: 200, left: 0},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom,
    innerRadius = 50,
    outerRadius = Math.min(width, height) / 5;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    //IMPLEMENTING DATA 
d3.json("php/data.php?opt="+option+"&value="+value, function(data) {
  // X scale: common for 2 data series
  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data.map(function(d) { return d.State; })); // The domain of the X axis is the list of states.

  // Y scale outer variable
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 13000]); // Domain of Y is from 0 to the max seen in the data

  // Second barplot Scales
  var ybis = d3.scaleRadial()
      .range([innerRadius, 5])   // Domain will be defined later.
      .domain([0, 13000]);

  // Add the bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("class", "yo")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['value']); })
          .startAngle(function(d) { return x(d.State); })
          .endAngle(function(d) { return x(d.State) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.State) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['value'])+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.State)})
        .attr("transform", function(d) { return (x(d.State) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

});
}