var x = d3.scale.linear().range([450, 1150]),
    y = d3.scale.linear().range([500, 80]);

var color = d3.scale.category20();

var apiKey = 'WKCIHDBJBZ3QEWWVA',
    results = 30;
    jQuery.ajaxSettings.traditional = true,
    genre = Arg("genre");

var width = 1300,
    height = 650;

var svg = d3.select("body").append("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)

var xLabel = svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "middle")
    .attr("x", 800)
    .attr("y", 610)
    .attr("fill-opacity", 0.4)
    .text("ARTIST POPULARITY COEFFICIENT")
    .style("font-family", "sans-serif")
    .style("font-size", "15px");

var yLabel = svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "middle")
    .attr("x", 340)
    .attr("y", 290)
    .attr("transform", "rotate(-90 340,290)")
    .attr("fill-opacity", 0.4)
    .text("ARTIST FAMILIARITY COEFFICIENT")
    .style("font-family", "sans-serif")
    .style("font-size", "15px");

var relatedText = svg.append("text")
    .attr("class", "relatedText")
    .attr("x", 10)
    .attr("y", 15)
    .attr("font-family", "sans-serif")
    .attr("fill", "black") 
    .attr("fill-opacity", 0.3)
    .attr("visibility", "hidden")
    .text("RELATED ARTISTS FOR:")
    .style("font-size", 15);

var announcementText = svg.append("text")
    .attr("class", "announcementText")
    .attr("x", 25)
    .attr("y", 13)
    .attr("font-family", "sans-serif")
    .attr("fill", "black") 
    .attr("fill-opacity", 0.3)
    .text("TOP ARTISTS FOR:")
    .style("font-size", 15);

var genrenameText = svg.append("text")
    .attr("class", "announcementText")
    .attr("x", 25)
    .attr("y", 50)
    .attr("font-family", "sans-serif")
    .attr("fill", "black") 
    .attr("fill-opacity", 0.3)
    .text(genre.toUpperCase())
    .style("font-size", 40);

// load descriptions related to specified genre
var descriptions = returnDescriptions(genre);

window.onload = function(){
    // load top artists with descriptions according to mapping
    topArtists(descriptions)
}

// returns descriptions linked to specified genre to improve search results from API request
function returnDescriptions(genre){
    var mapping = {"Disco": ["disco"],"Dub": ["dub"],"Classic House": ["early house", "classic house"],"New Wave": ["deep new wave", "new wave", "europop", "eurodance", "eurobeat", "deep eurodance", "deep neo-synthpop"],"Acid House": ["acid house", "acid", "roland", "acid trax", "acid burning"],"Classic Techno": ["techno", "classic techno", "early techno"],"Chicago House": ["chicago house", "classic chicago house"],"Detroit House": ["detroit house", "classic detroit house"],"Garage House": ["garage house", "us garage"],"Detroit Techno (1st wave)": ["detroit techno", "detroit", "techno", "80's"],"Deep House": ["old school deep house", "deep house", "deep deep house", "deep funky house", "deep disco house"],"Ambient House": ["deep ambient", "future ambient"],"Balearic Beat": ["balearic beat"],"Baltimore Club (Booty Bass)": ["baltimore", "booty bass", "bmore", "bmore house", "bmore club"],"Diva House": ["vocal house", "diva house"],"Euro House": ["deep euro house", "eurodance", "deep euro house"],"Chicago Deep House": ["early house", "chicago", "deep chicago house"],"Latin House": ["latin house", "latin", "house"],"Hip House": ["hip house"],"Italo House": ["deep italo disco", "italo dance", "italian disco", "italo disco"],"Kwaito": ["kwaito"],"Madchester": ["madchester", "baggy"],"New Beat": ["new beat"],"Tech House": ["tech house", "deep tech house", "deep deep tech house", "minimal tech house"],"Detroit Techno (2nd wave)": ["detroit techno", "detroit", "techno"],"Acid Techno": ["acid techno"],"Detroit Techno (3rd wave)": ["detroit techno", "detroit", "techno"],"Progressive House": ["progressive house", "deep progressive house", "progressive"],"Tribal House": ["tribal house", "percussion house", "polyrhythm"],"Tribal Techno" : ["tribal techno", "percussion techno", "polyrhythm"],"Minimal House": ["minimal house", "minimal dub", "minimal"],"Soulful House": ["soulful house", "lounge house"],"French House": ["french house", "filter house"],"Funky House": ["funk house", "funky house", "deep funk house"],"Jazz House": ["lounge house", "jazz house"],"Glitch House": ["glitch house"],"Hard Dance": ["hard dance"],"Hard House": ["hard house"],"NRG (Hard NRG)": ["nu nrg", "nrg", "hard nrg"],"Dub Techno": ["ambient dub techno", "deep dub techno", "dub techno"],"Hard Techno": ["dark minimal techno", "destroy techno", "hard techno"],"Micro House": ["microhouse", "micro house"],"Disco House": ["deep italo disco", "disco house", "nu disco", "deep disco house", "deep disco"],"Electro House": ["electro house", "nu electro"],"Bassline House": ["bass music", "bass trip", "bassline", "bassline house", "miami bass", ],"Swing House": ["swing house"],"Ghetto House": ["ghetto tech", "ghetto house"],"Big Room House": ["big room", "big room house"],"Complextro": ["complextro"],"Future House": ["outsider house", "future house"]}
    return mapping[genre];
}

// gets top artists from API request and plots a these artists
function topArtists(descriptions) {
    var url = 'http://developer.echonest.com/api/v4/artist/search?',
        args = { 
            api_key: apiKey,
            bucket: ["hotttnesss", "familiarity", "images", "urls", "id:deezer"], 
            description: descriptions,
            results: results,
    }; 
       
    // API request which returns data (specified above) in JSON format    
    $.getJSON(url, args, function(data) {        
        var data = data.response.artists; 

        // set domain depending on min. and max. data points in response to scale axis and to decide color scheme
        x.domain([d3.min(data, function(data) { return data.hotttnesss; }), d3.max(data, function(data) { return data.hotttnesss; })]);
        y.domain([d3.min(data, function(data) { return data.familiarity; }), d3.max(data, function(data) { return data.familiarity; })]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom"),
            yAxis = d3.svg.axis().scale(y).orient("left");

        var xAxis = svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (560) + ")")
            .attr("fill-opacity", 0.5)
            .call(xAxis);

        var yAxis = svg.append("g")
            .attr("transform", "translate(" + 390 + ",0)")
            .attr("class", "axis")
            .attr("fill-opacity", 0.5)
            .call(yAxis);                
        
        // iterate over dataset to append artists
        data.forEach(function(d){     

            // check for succesful data responses
            if (d.foreign_ids !== undefined){ var id = d.foreign_ids[0].foreign_id; }
            if (Object.keys(d.images).length > 0){ var image = d.images[0].url; }

            var circle = svg.append("circle")
                .attr("title", d.name)
                .attr("url", d.urls.lastfm_url)
                .attr("id", id)
                .attr("image", image)
                .attr("class", "circle")
                .attr("r", 0)
                .attr("cx", x(d.hotttnesss))
                .attr("cy", y(d.familiarity))
                .on("click", relatedArtists)
                .on("mouseover", function(){ highlightArtist(d3.select(this).attr("title")) })
                .on("mouseout", function(){ d3.selectAll(".artist-name").remove() })
                .style("fill", color(Math.floor(Math.random() * 30) + 1))
                .style("opacity", 1);

            circle.transition().duration(1000).attr("r", 10)
        })
    });
}

function relatedArtists(){
    var artist = d3.select(this),
        url = 'http://developer.echonest.com/api/v4/artist/similar?',
        args = { 
            api_key: apiKey,
            bucket: ["hotttnesss", "familiarity", "images", "urls", "id:deezer"],            
            description: descriptions,            
            name: artist.attr("title"),
            results: results,
    }; 
    // check for succesful data response
    if (artist.attr("id") !== null){
        var id = artist.attr("id").replace("deezer:artist:", "");
        document.getElementById("link").src = "http://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=300&height=290&color=070708&layout=&size=medium&type=radio&id=artist-" + id + "&title="
    }

    // remove intro text if not already done
    if (document.getElementById("introtext")){
        document.getElementById("introtext").remove()
    }

    // API request which returns data (specified above) in JSON format    
    $.getJSON(url, args, function(data) {
        
        // remove all previous artist data
        removeAll()

        var name = svg.append("text")
            .attr("class", "artistname")
            .attr("x", 10)
            .attr("y", 50)
            .attr("font-family", "sans-serif")
            .attr("fill", "black") 
            .attr("fill-opacity", 0.3)
            .text(artist.attr("title").toUpperCase())
            .style("font-size", 40);

        var lastfmURL = svg.append("text")
            .attr("class", "lastfmurl")
            .attr("x", 10)
            .attr("y", 70)
            .attr("font-family", "sans-serif")
            .attr("fill", "black") 
            .attr("fill-opacity", 0.3)
            .on("click", function(){ window.open(artist.attr("url")) })
            .text("CLICK FOR LAST-FM ARTIST PAGE")
            .style("font-size", 15);

        // load new artist picture
        document.getElementById("artistpicture").src = artist.attr("image")

        var radio = svg.append("text")
            .attr("class", "radio")
            .attr("x", 10)
            .attr("y", 400)
            .attr("font-family", "sans-serif")
            .attr("fill", "black") 
            .attr("fill-opacity", 0.3)
            .text(artist.attr("title").toUpperCase() + " " + "SMART RADIO")
            .style("font-size", 15);

        if (d3.selectAll(".relatedText").attr("visibility") == "hidden"){
            d3.selectAll(".relatedText").attr("visibility", "visible")
        }

        var data = data.response.artists;
        
        // set domain depending on min. and max. data points in response to scale axis and to decide color scheme
        x.domain([d3.min(data, function(data) { return data.hotttnesss; }), d3.max(data, function(data) { return data.hotttnesss; })]);
        y.domain([d3.min(data, function(data) { return data.familiarity; }), d3.max(data, function(data) { return data.familiarity; })]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom"),
            yAxis = d3.svg.axis().scale(y).orient("left");

        var xAxis = svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (560) + ")")
            .attr("fill-opacity", 0.5)
            .call(xAxis);

        var yAxis = svg.append("g")
            .attr("transform", "translate(" + 390 + ",0)")
            .attr("class", "axis")
            .attr("fill-opacity", 0.5)  
            .call(yAxis);        

        // iterate over dataset to append artists
        data.forEach(function(d){

            // check for succesful data response
            if (d.foreign_ids !== undefined){ var id = d.foreign_ids[0].foreign_id; }
            if (Object.keys(d.images).length > 0){ var image = d.images[0].url; }

            var circle = svg.append("circle")
                .attr("title", d.name)
                .attr("url", d.urls.lastfm_url)                    
                .attr("image", image)
                .attr("id", id)
                .attr("class", "circle")
                .attr("r", 0)
                .attr("cx", x(d.hotttnesss))
                .attr("cy", y(d.familiarity))
                .on("click", relatedArtists)
                .on("mouseover", function(){ highlightArtist(d3.select(this).attr("title")) })
                .on("mouseout", function(){ d3.selectAll(".artist-name").remove() })
                .style("fill", color(Math.floor(Math.random() * 30) + 1))
                .style("opacity", 1);

            circle.transition().duration(1000).attr("r", 10)
        })   
    });
}

// show tooltip when hovering over an artist
function highlightArtist(artist){
    svg.append("text")
        .attr("class", "artist-name")
        .attr("text-anchor", "end")
        .attr("x", 1250)
        .attr("y", 50)
        .attr("font-family", "sans-serif")
        .attr("font-size", "40px")
        .attr("fill", "black")
        .attr("fill-opacity", 0.1)
        .text(artist.toUpperCase());
}

// remove all text and artists when appending related artists
function removeAll(){
    d3.selectAll(".announcementText").remove() 
    d3.selectAll(".circle").remove()
    d3.selectAll(".lastfmurl").remove()
    d3.selectAll(".artistname").remove()
    d3.selectAll(".axis").remove()
    d3.selectAll(".radio").remove()
}










