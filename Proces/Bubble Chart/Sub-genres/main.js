function getQueryString(){
    var queryString = window.location.search
    var temp = queryString.replace("?genre=", "")
    var genre = temp.replace("%20", " ")
    return genre
}

var genre = getQueryString()
console.log(genre)

var diameter = 950,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(7);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble")

var circle = svg.append("circle")
    .attr("r", 0)
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("visibility", "hidden")
    .attr("class", "back")
    .on("mouseover", function(){
      d3.select(this)
        .style("fill-opacity", 0.2)
    })
    .on("mouseout", function(){
      d3.select(this)
        .style("fill-opacity", 1)
    })
    .on("click", function(d){
      window.location.assign("///Users/daan_ensing/Documents/Studie/Minor%20Programmeren/Project/Proces/Bubble%20chart/index.html")
    })
    .style("stroke", "black")
    .style("stroke-width", 5)
    .style("stroke-opacity", 0)
    .style("fill-opacity", 1)
    .style("fill", "#C6DBEF")

d3.json("JSON/" + genre + ".json", function(error, root) {
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  var circle = node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill-opacity", 1)
      .style("fill", function(d) { return color(d.packageName); })
      .style("stroke", "black")
      .style("stroke-width", 5)
      .style("stroke-opacity", 0.1)
      .on("mouseover", function(){
        d3.select(this)
          .style("fill-opacity", 0.2)
      })
      .on("mouseout", function(){
        d3.select(this)
          .style("fill-opacity", 1)
      })
      .on("click", function(d){
        window.location.assign("Artists/index.html?artist=" + d.className)
      });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");

window.onload = function(){
  circle.transition()
    .attr("visibility", "visible")
    .attr("r", 60)
    .duration(1750) 
    .style("stroke-opacity", 0.1)
}


