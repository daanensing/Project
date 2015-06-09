var x = d3.scale.linear().range([80, 1200]),
    y = d3.scale.linear().range([50, 600]);

    x.domain([1965, 2010]);
    y.domain([1, 20]);

var color = d3.scale.category20c();

var width = 1300,
    height = 800,
    check = 0,
    connected = {};

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force();

d3.json("genres.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start()

  var path = svg.selectAll(".path").data(graph.links).enter().insert("path")
        .style("fill", "none").style("stroke", "black").style("stroke-opacity", 0.2)        
        .attr("class", "link")
        .attr("d", function(d) {
            var dx = x(d.target.year) - x(d.source.year),
            dy = y(d.target.centrality) - y(d.source.centrality),
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + x(d.source.year) + "," + y(d.source.centrality) + "A" + dr + "," + dr + " 0 0,1 " + x(d.target.year) + "," + y(d.target.centrality); });

  var node = svg.selectAll(".node").data(graph.nodes).enter().append("circle")
        .attr("class", "node")
        .style("opacity", 1)
        .attr("title", function(d) { return d.name; })
        .attr("cx", function(d) { return (x(d.year)); })
        .attr("cy", function(d) { return (y(d.centrality)); })     
        .attr("r", function(d) { return (d.radius); })
        .attr("fill", function(d) { return color(d.group); })
        .on("mouseover", function(d){ d3.select(this).transition().attr("r", function(d){ return 50; })})
        .on("mouseout", function(d){ d3.select(this).transition().attr("r", function(d){ return d.radius; })})        
        .on("click", connectedNodes)
        .on("click", connectedNodes)
        .on("dblclick", function(d){ window.location.assign("Artists-genre/artists-genre.html" + "?genre=" + d.name) });

    var text = svg.selectAll(".text").data(graph.nodes).enter().append("text")
        .text(function(d){ return d.name;})
        .attr("x", function(d) { return (x(d.year)) - 10; })
        .attr("y", function(d) { return (y(d.centrality)); })
        // .attr("visibility", "hidden");  
  
  for (i = 0; i < graph.nodes.length; i++) {
       connected[i + "," + i] = 1; 
  };

  graph.links.forEach(function (d) {
      connected[d.source.index + "," + d.target.index] = 1;
  });

  function connectedNodes() {
      if (check == 0) {
          d = d3.select(this).node().__data__;
          node.style("opacity", function (o) { return neighbour(d, o) | neighbour(o, d) ? 1 : 0.15; });
        check = 1;
      } 
      else {
          node.style("opacity", 1);
          check = 0; } 
      }

  function neighbour(a, b) {
      return connected[a.index + "," + b.index]; }

});