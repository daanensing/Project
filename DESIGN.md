### Design document


**Student**: Daan Ensing
**Studentnummer**: 10003216
**Begeleiding**: Martijn Stegeman & Thijs Coenen
**Datum**: 04-06-2015


### Minimum viable product

My dataset currently consists of a list of 50 subgenres, sorted out by year of origin. These genres are also given a rating based upon popularity, varying from 1 to 3. Last, all genres might have been influenced by other genres, which is also incorporated in my dataset. 

The idea is to visualize all genres as a graph in which it is clear how genres relate to each other (distance), what the year of origin of each genre (color) is and how populair each genre is (size). The mimumum viable product consists of 50 subgenres, and depending on the popularity of a genre, the top 30 (rating of 1) or top 15 (rating between 2 and 3) artists per genre (according to last.FM and spotify data). 

The problem in this rating lies, as said, in the subjectivity of the manner. I'm currently thinking about a less complex rating system (1 to 3) to make it both more objective and less of a research project and more into a visualization project. 

The artist data is based upon some own research from 2 books and several sources from the internet. This also, as noted before, still is subjective. The artist data isn't finished yet. My deadline for the finished data is 06-07-2015. 

When clicking on an artist, a web page should pop up with the following information about a artist:

* Picture
* Biography
* Top hits

Retreiving this information will be done by the Echo Nest API which i have already tested for retreiving biography's and pictures. The API can be freely accessed with a limited request rate of 20 per minute. This however shouldn't be a problem in the scope of this project. 

As an error check, i would like to build a function which checks if an internet connection is present. If not, an alternative web page should load (when visiting an artist page) which states that artist information can't be retreived without acces to the internet. 

### Challenges

I've already implemented the D3 bubble chart template (with some adjustments) as a basis to work with. This however seems to give some problems in that it's hard to adjust the place of any genre according to the variables i've incorporated in my dataset. I'm currently looking at more examples and thinking about implementing a force directed lay out as the basis of my genres page. The artist page however can be done in the way the bubble chart tepmlate works because there only will be differences in size (popularity, varying from 1 to 3) and color (year of origin)

### Technical details

Although the prototype of my project now uses the bubble chart layout as a basis, i will change this into a force directed layout. I have 2 datasets which i can use for both the bubble chart as the force directed lay out.  

### Technical challenges

On of my current challenges is to find a way in which i can create a force directed graph in which i can give the x coordinates of any node as a specific value, depending on the year the genre originally is from (so that the genres can be viewed from oldest to newest (left to right). This also is a challenge for 

Another technical challenge ahead is gettin the artist page ready. I have however already implemented a way of passing a genre's name's as argument to the genre page when clicking on a certain genre. The same goes for the artist pages. This way, i only have to make 1 genre page (although i do have to make several json files for every artist) and 1 artist page (because the artist name is given as argument to the API request on this page). The callenge lies in structuring the artist page's in that way that the best information is being displayed. 





 

