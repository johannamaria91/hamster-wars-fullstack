# Hamster Wars 

Detta är andra delen i inlämningsuppgiften Hamster Wars. 
Hamster Wars är en applikation där användaren är med och röstar fram den sötaste hamstern.
I förra delen gjorde jag backend-delen av uppgiften som inkluderade att bygga ett REST API med Node.js, Express och Firestore 
Nu i sista delen har jag använd React för att bygga frontend-appen.

## Funktioner 

### Start
På startsidan visas den hamster som just nu har bäst statistik.
Finns det flera med samma så slumpas en av dem fram.
Den här sidan använder backend-routen /hamsters/cutest

På startsidan finns även info kring hur appen fungerar.

### Tävla
På tävlingssidan slumpas två hamstrar fram och användaren får välja vilken som är sötast av dem, 
och tas sedan vidare till en sida med resultat. Där syns både vem som vann och förlorade matchen, samt mer info om de olika tävlanden.

Användaren får också möjlighet att starta en ny match.

### Galleri
I galleriet finns alla hamstrar listade, med namn och bild. På baksidan av korten finns all info om hamstrarna, och användaren kan även klicka för att se alla hamstrar en specifik hamster har besegrat. Det finns även möjlighet att ta bort en hamster.

Högst upp på sidan finns en knapp för att lägga till en ny hamster. Då tas användaren till en overlay där hen får fylla i all info om den nya hamstern, samt länka till en bild eller välja att använda appens standardbild. 


### Statistik
Under statistik kan användaren se vilka 5 hamstrar som vunnit flest matcher, samt vilka 5 som förlorat flest. 

### Historik
I historiken syns alla spelade matcher. Det finns möjlighet för användaren att ta bort en match.




