var x = d3.scale.linear().range([450, 1150]),
    y = d3.scale.linear().range([70, 550]);

    x.domain([1965, 2010]);
    y.domain([1, 0]);

var color = d3.scale.category20();

var width = 1300,
    height = 650,
    check = 0,
    connected = {};

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.format("d"));

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var xAxis = svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + (560) + ")")
  .attr("fill-opacity", 0.5)  
  .call(xAxis);

var yAxis = svg.append("g")
  .attr("transform", "translate(" + 390 + ",0)")
  .attr("class", "y-axis")
  .attr("fill-opacity", 0.5)      
  .call(yAxis);

var xLabel = svg.append("text")
  .attr("class", "x-label")
  .attr("text-anchor", "middle")
  .attr("x", 800)
  .attr("y", 610)
  .attr("fill-opacity", 0.4) 
  .text("YEAR OF ORIGIN")
  .style("font-size", "15px")
  .style("font-family", "sans-serif");

var yLabel = svg.append("text")
  .attr("class", "y-label")
  .attr("text-anchor", "middle")
  .attr("x", 240)
  .attr("y", 400)
  .attr("transform", "rotate(-90 240,300)")
  .attr("fill-opacity", 0.4)    
  .text("MUSIC INTENSITY COEFFICIENT")
  .style("font-size", "15px")
  .style("font-family", "sans-serif");

var force = d3.layout.force();

// iterate over dataset to append genres
d3.json("json/genres.json", function(error, graph) {
  
  force.nodes(graph.nodes)
    .links(graph.links)
    .start()

  var node = svg.selectAll(".node").data(graph.nodes).enter().append("circle")
    .attr("class", "node")
    .attr("title", function(d) { return d.name; })
    .attr("cx", function(d) { return (x(d.year)); })
    .attr("cy", function(d) { return (y(d.intensity)); })     
    .attr("r", 0)
    .attr("fill", function(d) { return color(d.color); })
    .on("mouseover", function(){ highlightGenre(d3.select(this).attr("title"))})
    .on("mouseout", function(){ d3.selectAll(".genre-name").remove() })       
    .on("click", connectedNodes)
    .on("dblclick", function(){ window.location.assign("Artists-genre/artists-genre.html" + "?genre=" + d.name) })
    .style("opacity", 1);

  node.transition().attr("r", function(d) { return (d.radius); }).duration(1000)
  
  // adapted code: partially retrieved from http://www.coppelia.io/2014/07/an-a-to-z-of-extra-features-for-the-d3-force-layout/ 
  for (i = 0; i < graph.nodes.length; i++) {
    connected[i + "," + i] = 1; 
  };

  graph.links.forEach(function (d) {
      connected[d.source.index + "," + d.target.index] = 1;
  });

  // lower opacity for nodes which aren't related to selected genre
  function connectedNodes() {
    if (check == 0) {
        d = d3.select(this).node().__data__;
        node.style("opacity", function (o) { return neighbour(d, o) | neighbour(o, d) ? 1 : 0.05; });
      check = 1;
    } 
    else {
        node.style("opacity", 1);
        check = 0; } 
    }

  function neighbour(a, b) {
    return connected[a.index + "," + b.index]; }

});

// show tooltip when hovering over a genre
function highlightGenre(genre){
  svg.append("text")
    .attr("class", "genre-name")
    .attr("text-anchor", "end")
    .attr("x", 1250)
    .attr("y", 50)
    .attr("font-family", "sans-serif")
    .attr("font-size", "50px")
    .attr("fill", "black")
    .attr("fill-opacity", 0.1)
    .text(genre.toUpperCase());
}