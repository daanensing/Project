window.onload = function(){
    topArtists(descriptions)
}

var color = d3.scale.category20c();

var returnColor = d3.scale.linear().range([0, 9]);

var svg = d3.select("body").append("svg")
    .attr("width", 1300)
    .attr("height", 1000)

var apiKey = 'secret';
    jQuery.ajaxSettings.traditional = true; 

// Retreived from: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
var queryString = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

var returnX = d3.scale.linear().range([320, 1100]),
  returnY = d3.scale.linear().range([600, 70]);

var genre = queryString["genre"];

var descriptions = allDescriptions(genre);

function allDescriptions(genre){
    var mapping = {"Disco": ["disco", "discofox", "italian disco"],"Dub": ["dub", "minimal dub"],"Classic House": ["classic house", "test"],"New Wave": ["deep new wave", "new wave", "europop", "eurodance", "eurobeat", "deep eurodance", "deep neo-synthpop"],"Acid House": ["acid house"],"Classic Techno": ["classic techno", "german techno"],"Chicago House": ["chicago house", "classic chicago house"],"Detroit House": ["detroit house"],"Garage House": ["future garage"],"Detroit Techno (1st wave)": ["detroit techno", "detroit", "techno"],"Deep House": ["deep house", "deep deep house", "deep deep tech house", "deep disco", ],"Ambient House": ["deep ambient", "future ambient"],"Balearic Beat": ["balearic"],"Baltimore Club (Booty Bass)": ["baltimore", "booty bass", "bmore", "bmore house", "bmore club"],"Diva House": ["deep vocal house"],"Euro House": ["deep euro house", "eurodance", "deep euro house"],"Chicago Deep House": ["chicago", "chicago deep house", "deep chicago house"],"Latin House": ["latin house", "electro latino"],"Hip House": ["hip house"],"Italo House": ["deep italo disco", "italo dance", "italian disco"],"Kwaito": ["kwaito"],"Madchester": ["madchester"],"New Beat": ["new beat"],"Tech House": ["tech house", "deep tech house", "deep deep tech house", "minimal tech house"],"Detroit Techno (2nd wave)": ["detroit techno", "detroit", "techno"],"Acid Techno": ["acid techno"],"Detroit Techno (3rd wave)": ["detroit techno", "detroit", "techno"],"Progressive House": ["progressive house", "dark progressive house", "deep progressive house"],"Tribal House": ["tribal house", "percussion house", "polyrhythm"],"Tribal Techno" : ["tribal techno", "percussion techno", "polyrhythm"],"Minimal House": ["minimal house"],"Soulful House": ["soulful house", "lounge house"],"French House": ["french house", "filter house"],"Funky House": ["funk house", "funky house", "deep funk house"],"Jazz House": ["lounge house", "jazz house"],"Glitch House": ["glitch house"],"Hard Dance": ["hard dance"],"Hard House": ["hard house"],"NRG (Hard NRG)": ["nu nrg", "nrg", "hard nrg"],"Dub Techno": ["ambient dub techno", "deep dub techno", "dub techno"],"Hard Techno": ["dark minimal techno", "destroy techno", "hard techno"],"Micro House": ["microhouse", "micro house"],"Disco House": ["deep italo disco", "disco house", "nu disco", "deep disco house", "deep disco"],"Electro House": ["electro", "electro house", "nu electro"],"Bassline House": ["bass music", "bass trip", "bassline", "bassline house", "miami bass", ],"Swing House": ["swing house"],"Ghetto House": ["ghetto tech", "ghetto house"],"Big Room House": ["big room", "big room house"],"Complextro": ["complextro"],"Future House": ["outsider house", "future house"]}
    return mapping[genre];
}

function topArtists(descriptions) {
    var url = 'http://developer.echonest.com/api/v4/artist/search?';
    var results = 30;
    var args = { 
            api_key: apiKey,
            bucket: ["hotttnesss", "familiarity", "biographies"], 
            description: descriptions,
            results: results,
    }; 
    $.getJSON(url, args, function(data) {
            
            var data = data.response.artists;           
                returnColor.domain([d3.min(data, function(data) { return data.familiarity; }), d3.max(data, function(data) { return data.familiarity; })]);
                returnX.domain([d3.min(data, function(data) { return data.hotttnesss; }), d3.max(data, function(data) { return data.hotttnesss; })]);
                returnY.domain([d3.min(data, function(data) { return data.familiarity; }), d3.max(data, function(data) { return data.familiarity; })]);

            for (var i = 0; i < results; i++){                
                var circle = svg.append("circle").attr("title", data[i].name).attr("class", "circle").attr("r", 10).attr("cx", returnX(data[i].hotttnesss)).attr("cy", returnY(data[i].familiarity)).on("click", relatedArtists)
                    .style("fill", colorCoding(returnColor(data[i].familiarity))).style("fill-opacity", 0.6).style("stroke", "black").style("stroke-width", 2).style("stroke-opacity", 0.6);
                var text = svg.append("text").text(data[i].name.toUpperCase())
                    .attr("x", returnX(data[i].hotttnesss)).attr("y", returnY(data[i].familiarity) - 20).attr("font-family", "sans-serif").attr("font-size", "10px").attr("fill", "black");
            } 
        }
    );
}

function relatedArtists(){
    var artist = d3.select(this).attr("title");
    var results = 29
    var url = 'http://developer.echonest.com/api/v4/artist/similar?';
    var args = { 
            api_key: apiKey,
            bucket: ["hotttnesss", "familiarity", "biographies"],            
            description: descriptions,            
            limit: false,
            name: artist,
            results: results,
    }; 
    $.getJSON(url, args,
            function(data) {
                svg.selectAll("circle").remove()
                svg.selectAll("text").remove()
                
                var name = svg.append("text").text(artist.toUpperCase()).style("font-weight", "bold").style("font-size", 20)
                    .attr("x", 20).attr("y", 40).attr("font-family", "sans-serif").attr("fill", "black");

                var data = data.response.artists;
                    returnColor.domain([d3.min(data, function(data) { return data.familiarity; }), d3.max(data, function(data) { return data.familiarity; })]);
                    returnX.domain([d3.min(data, function(data) { return data.hotttnesss; }), d3.max(data, function(data) { return data.hotttnesss; })]);
                    returnY.domain([d3.min(data, function(data) { return data.familiarity; }), d3.max(data, function(data) { return data.familiarity; })]);

                for (var i = 0; i < results; i++){
                    var circle = svg.append("circle").attr("title", data[i].name).attr("class", "circle").attr("title", data[i].name).attr("r", 10).attr("cx", returnX(data[i].hotttnesss)).attr("cy", returnY(data[i].familiarity)).on("click", relatedArtists)
                        .style("fill", colorCoding(returnColor(data[i].familiarity))).style("fill-opacity", 0.6).style("stroke", "black").style("stroke-width", 2).style("stroke-opacity", 0.6);
                    var text = svg.append("text").text(data[i].name.toUpperCase())
                        .attr("x", returnX(data[i].hotttnesss)).attr("y", returnY(data[i].familiarity) - 20).attr("font-family", "sans-serif").attr("font-size", "10px").attr("fill", "black")
                }   
            }
        );
}

function colorCoding(x){
    if (x < 1.01){ return "#fff7f3" }
    if (x < 2.01){ return "#fde0dd" }
    if (x < 3.01){ return "#fcc5c0" }
    if (x < 4.01){ return "#fa9fb5" }
    if (x < 5.01){ return "#f768a1" }
    if (x < 6.01){ return "#dd3497" }
    if (x < 7.01){ return "#ae017e" }
    if (x < 8.01){ return "#7a0177" }
    if (x < 9.01){ return "#49006a" }
}










