### Proposal document

### House en Techno: Een Visualisatie van Overeenkomsten, Sub-genres en Invloedrijke Artiesten Binnen deze Genres
*Programmeerproject -  Minor Programmeren*


**Student**: Daan Ensing
**Studentnummer**: 10003216
**Begeleiding**: Martijn Stegeman & Thijs Coenen
**Datum**: 02-06-2015


### Inleiding

House en Techno muziek zijn de laatste jaren aan een ontzettende opmars bezig binnen de Nederlandse Dance scene. 
Waar House muziek, en met name Techno muziek voorheen bekend stonden als muziekstijlen met een doorgaans 
meer “underground” karakter trekken deze elektronische muziekgenres vandaag de dag een steeds groter wordend publiek. 
Door deze aanzienlijke groei in populariteit worden de termen House en Techno te pas en te onpas gebruikt om allerlei 
verschillende stijlen aan te duiden waar het eigenlijk gaat om genres die zijn ontstaan vanuit deze stijlen. 
Deze trend is goed te zien op bijvoorbeeld affiches voor festivals. Ook op gerenommeerde sites waar muziek op 
kan worden aangeschaft wordt veelal weinig onderscheid gemaakt tussen de verschillende genres die binnen deze 
muziekstromingen bestaan. 

Het doel van deze visualisatie is om enerzijds een onderscheid te maken tussen de verschillende sub-genres binnen 
deze muziekstromingen en anderzijds te laten zijn hoe bepaalde sub-genres uit elkaar zijn ontstaan of gelijkenissen 
vertonen. Daarnaast is het doel van deze visualisatie om voor verschillende sub-genres doorslaggevende artiesten te 
laten zien met daarbij behorende informatie zoals biografieën, foto’s en muziek. Het doel is om op een overzichtelijke, 
gestructureerde manier wegwijs te kunnen worden binnen alle sub-genres die binnen de genoemde stromingen bestaan 
en zowel liefhebbers als mensen die minder affiniteit hebben met deze soorten muziek te kunnen laten zien binnen welk 
genre bepaalde artiesten thuis horen en welke artiesten doorslaggevend zijn geweest voor de ontwikkeling van deze genres. 

### Opbouw 

De homepage van de pagina zal bestaan uit een introductie van het onderwerp en een overzicht van alle subgenres uit mijn dataset. 
Dit wordt een verzameling van tussen de 70 en 80 verschillende sub-genres binnen House en Techno muziek. Sub-genres worden
geplaatst als nodes (in een graaf) waarbij de populariteit van een sub-genre de grootte van de node bepaald en de gelijkenis tussen
sub-genres de posities van een node ten opzichte van elkaar bepalen. 

Door klikken op een sub-genre komt men op de artiestenpagina terecht. Hierin komt een verzameling van grote/invloedrijke artiesten
binnen dit sub-genre, geordend binnen een tijdsperiode vanaf het begin van dit sub-genre t/m 2010 of 2015 (dit laat ik afhangen 
van de data die ik hierover vind). 

Een artiestenpagina kan vervolgens worden bekeken door op de artiest te klikken. Hier krijgt met een biografie, een foto, populaire
hits en eventueel verwante artiesten te zien. 

### Externe componenten

Een belangrijke component waarvan deze visualisatie gebruik gaat maken is de API van The Echo Nest. The Echo Nest biedt een API 
die is gekoppeld aan tal van sites die content over muziek aanbieden, waaronder Deezer, Discogs, Free Music Archive, last.FM, 
MusicBrainz en Spotify. Ik wil deze API gebruiken om real time info binnen te halen over artiesten, namelijk:
* Foto artiest
* Biografie 
* Populaire nummers
* Verwante artiesten

De API maakt gebruik van een maximaal aantal requests van 20 per minuut. Met het oog op het gebruik van deze visualisatie binnen 
het project verwacht ik dat dit geen belemmering zal vormen. Naast de API van Echo Nest maak ik gebruik van de bibliotheek 
van D3 om mijn visualisatie te creëren. Er zijn een aantal projecten van de site waar ik verschillende componenten uit wil 
halen om mogelijk te implementeren in mijn visualisatie. 
1. Zoomable Circle Packing
Om de cirkels (bij sub-genres of artiesten) mooi te positioneren wil ik gebruik maken van het voorbeeld D3 Circle Packing 
(zie voorbeeld). Dit maakt het mogelijk om verwante stijlen naast elkaar te positioneren en in te zoomen op cirkels. 
Zodra er op een artiest wordt geklikt zou het mooi zijn als er wordt ingezoomd en het beeld overspringt op de artiest 
info pagina zoals deze in het design staat. 


### Data sets / bronnen
De dataset die ik ga gebruiken om verschillende genres te definiëren binnen de stijlen House/Techno is gebaseerd op data van 
verschillende bronnen. 

### Vergelijkbare applicatie/visualisatie
Een vergelijkbare applicatie die mij erg aansprak is [History of rock in 100 songs](http://svds.com/rockandroll/#thebeatles). 
Deze visualisatie maakt tevens gebruik van invloed van muziek, in dit geval specifieke nummers binnen 1 genre. Ik vind het
erg prettig dat er veel informatie in deze visualisatie terug komt maar duidelijkheid blijft bestaan. 


