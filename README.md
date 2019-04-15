Εκανα την αναάπτηξη με το  docker toolbox επειδή την έκανα σε  windows home. 

# Πως να τρέξεις το Project:

1) Στο backEnd/src/config/ πρέπει να μπούν οι ρυθμίσεις για να συνδεθεί στο docker. Θέλει και τον φάκελο που είναι τα Pem καθώς είανι https.

2) στο backend -> terminal -> npm start

3) στο frontend -> terminal -> ng serve --open . κάνει connection στο localhost:5858. Το 5858 το έχω default στον backend.

4) ready to go.

# General

Χρήση του κανόνα ότι τα αρχεία που αλλάζουν μαζί πανε στον ίδιο φάκελο.
Εχω αφήσει κάποια TODO που δεν πρόλαβα.

# Shared

Shared type μέσω interface για frontend και backend.

# backend

Χρήση composition Root "pattern" με awilix dependency injection. Χρήση convict και dotenv για config. 
Στον φάκελο core, έχω την βασική αρχικοποίηση για: docker,config, express route, socket io, logger(log4js).
Χρήση Multer για το upload αρχειο.

Στα utilits έχω μια class που φτιάχνει ένα dictionary όπου τα values τους είναι generate απο τα key μέσω τις callback που έδωσα στον constructor.

Η υπόλοιπη αρχιτεκντονική (features) χωρίζεται σε δύο Layer: service και route(ή controller). Οπου διαχωρίζω τα route για το express και για το socket io.

Στην συγκεκριμένη υλοποιήση τα services έχουν την αρμοδιότητα να επικοινωνήσουν με το docker και τα route να επικοινωνήσουμε με τον client.

Αποφάσισα να μετατρέψω σε subject(rxjs) τα stream καθως και ότι θέλει live ενημέρωση και να τα βάλω σε socket. Χρησιμοποιήσα σχεδον ολοκληρωτικά socket(εκτός απο το multer/express), παρόλου που σε κάποια σημεια δεν ήταν αναγκαίο. Η διαφορά με το express είναι πολυ μικρή, που θεωρώ ότι είναι too much για λίγα calls να έχω δύο τρόπους επικοινωνίας. Θα έκανα refactory σε χρήση και των δυο αν μεγάλωνε το project.

Επίσης ότι ο client δεν πρέπει να ρωτάει ένα ένα τα container με τα Ids για την κατάσταση τους αλλα ενα api που βρίσκει μόνο του όλα τα containers  και να  απαντάει με stream(subject) .(Αν και επιλογή για ενα υποστηριζεται απο το service).

Κανω unsubscribe στο disconnect για να μην έχουμε leak memory λόγο των observer με χρήση subscription και take(1).


# frontend

angular material/lodash/flex-layout/ng2-file-upload/ngx-socket-io

Την δομη την κράτησα πολυ απλή, είναι μια σελίδα μονο και σκεφτηκά ότι θα είναι over-engineer να βάλω πολλά. 

Ξανα δύο layer service και components. Ιδια νοοτροπία.  Εκανα κάποια διαχείριση για την μνήμη αλλα τυπικά καθως τα components δεν διαγράφονται ποτε.

Χρησιμοποίησα class viewmodel για να κάνω κάποιες μετατροπές. Σε κάποια σημεία ίσως μπορούσε να μπει automaper(overenginerring again).

Δεν πρόλαβα να δω το error handler. Θα το έκανα μεσω interceptor για Http αλλα και event error για socket io και χρήση της error κατάστασης στους Observer.
  
  

  
