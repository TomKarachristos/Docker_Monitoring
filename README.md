Εκανα την αναάπτηξη με το  docker toolbox επειδή την έκανα σε  windows home. 

# Πως να τρέξεις το Project:

1)Τρέχουμε το docker quickstart terminal, φαντάζομαι πως στα mac/linux μπορεί να έχει άλλη έκδοση. Πιστευώ ότι αυτο δεν επηρεάζει κάπου.

![image](https://user-images.githubusercontent.com/11191440/56229712-3b193200-6083-11e9-979e-60a1d2373d70.png)

2) Αφού ξεκινήσει βρίσκουμε το ip και το port με την εντολη docker-machine ls σε οποίο terminal έχουμε πρόσβαση στο docker. Σημειωμένα με κιτρινο απο κάτω(Προκαθορισμένα μπαίνει στο enviroment οπότε απο ένα απλο terminal θα έχουμε λογικα πρόσβαση.)

![image](https://user-images.githubusercontent.com/11191440/56229896-a6fb9a80-6083-11e9-8873-0f553b5b96a5.png)

3)Μετα πρέπει να βρούμε που είναι αποθηκευμένα τα pem. Το documentation γράφει:

As a point of information, the config.json, certificates, and other data related to each virtual machine created by docker-machine is stored in ~/.docker/machine/machines/ on Mac and Linux and in ~\.docker\machine\machines\ on Windows. 

Οπότε θα είναι αποθηκευμένα στον αντίστοιχο φάκελου του χρήστη που κάνατε έγινε install. Απο κάτω είναι ο δικό μου φάκελο

![image](https://user-images.githubusercontent.com/11191440/56230332-b62f1800-6084-11e9-84b6-0e63e74d62b9.png)

Το documentation γράφει σε άλλο σημείο ότι είναι μεσα στον $HOME/.docker/machine/machines/default.Δείτε και αυτο αν δεν το βρείτε.

3)Μετα βάζουμε τις ρυθμίσεις που κάναμε collect στο config: 
![image](https://user-images.githubusercontent.com/11191440/56230630-61d86800-6085-11e9-8a7e-33c75a74bcbe.png)

4)Στην συνέχεια ο πιο εύκολος τρόπος είναι να φτιάξουμε δυο terminal και να τρέξουμε τις απο κάτω τιμές στους κατάλληλους φάκελους. Πρώτα για τον backend Και μετα για το frontend. Το project θα ανοίξει θεωρητικά μόνο του εκείνη την στιγμη. 

![image](https://user-images.githubusercontent.com/11191440/56231094-4d489f80-6086-11e9-972d-97d81a66ff73.png)

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
  
  

  
