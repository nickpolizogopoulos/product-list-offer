import { AboutContent } from "./about-types";

export const contentGr: AboutContent = {
    pageHeader: 'Σχετικά με την Εφαρμογή',
    appDescription: `
        Αυτή η <strong><u>δωρεάν και ανοιχτού κώδικα</u></strong> εφαρμογή, που αναπτύχθηκε με τα πιο σύγχρονα εργαλεία, 
        απλοποιεί τη δημιουργία και την κοινοποίηση επαγγελματικών προτάσεων προϊόντων. 
        Δημιουργημένη με τη χρήση σύγχρονων τεχνολογιών web, προσφέρει μια φιλική προς τον χρήστη και αποδοτική εμπειρία, 
        επιτρέποντας στις επιχειρήσεις να δημιουργούν λεπτομερή PDF προσφορών προϊόντων μέσα σε λίγα λεπτά, 
        απλώς συμπληρώνοντας μια φόρμα. 
        Αυτές οι προσφορές μπορούν στη συνέχεια να αποσταλούν απευθείας σε πελάτες ή συνεργάτες.
    `,
    keyFeaturesHeader: 'Τα βασικά χαρακτηριστικά περιλαμβάνουν:',
    features: [
        {
            name: 'Δυναμική Προσαρμογή',
            information: `
                Η εταιρεία μπορεί να εισάγει τα στοιχεία της, τα στοιχεία του πελάτη ή συνεργάτη της, 
                να προσαρμόσει την προσφορά και να δημιουργήσει ένα εξατομικευμένο PDF.
            `
        },
        {
            name: 'Λειτουργία Εξοικονόμησης Χρόνου',
            information: 'Οι πληροφορίες της εταιρείας αποθηκεύονται τοπικά στον περιηγητή, καθιστώντας τη μελλοντική χρήση πιο γρήγορη και πιο εύκολη.'
        },
        {
            name: 'Ημερομηνίας Λήξης Προσφοράς',
            information: 'Η εφαρμογή σας επιτρέπει να προσθέσετε ημερομηνία λήξης στην προσφορά στο PDF.'
        },
        {
            name: 'Προσθήκη Σημειώσεων',
            information: `
                Για να προσθέσετε σημειώσεις, πατήστε το κουμπί "Προσθήκη σημειώσεων" και συμπληρώστε το πεδίο.
                Σε περίπτωση που θέλετε να αποκλείσετε τις σημειώσεις από το PDF, απλώς πατήστε "Διαγραφή σημειώσεων" και οι σημειώσεις θα αφαιρεθούν.
            `
        },
        {
            name: 'Πολύγλωσσο PDF',
            information: `
                Το PDF θα δημιουργηθεί στη γλώσσα που έχει επιλέξει ο χρήστης στο πάνω μέρος (μενού) της εφαρμογής.
            `
        },
        {
            name: 'Δυναμική λίστα προϊόντων',
            information: `
                Προσθέστε προϊόντα στη λίστα κάνοντας ένα κλικ στο κουμπί με τον πράσινο σταυρό σε κύκλο.
                Αφαιρέστε προϊόντα απο την λίστα πατώντας το κουμπί δεξιά του προϊόντος με τον κόκκινο κάδο.
                Επιλέξτε ποσότητα και τιμή για την μονάδα προϊόντος. Η εφαρμογή θα υπολογίσει μόνη της το συνολικό κόστος.
            `
        },
        {
            name: 'PDF με χρώμα ή χωρίς',
            information: `
                Επιλέξτε αν θέλετε το PDF να είναι με έγχρωμες λεπτομέρειες ή χωρίς.
                Η έγχρωμη επιλογή περιλαμβάνει μπλε φόντο στα στοιχεία της εταιρείας και χρωματιστό πίνακα προϊόντων.
            `
        }
    ],
    customPdfHeader: 'Προσαρμοσμένο PDF',
        contact: [
        `Η εφαρμογή μπορεί να προσαρμοστεί ώστε να επιτρέπει σε μια επιχείρηση να δημιουργεί το δικό της 
        προσαρμοσμένο αρχείο PDF, συμπεριλαμβανομένου του λογότυπου της εταιρείας και οποιουδήποτε άλλου περιεχομένου θέλει να προβάλλει.`,
        `Υπάρχει η δυνατότητα δημιουργίας κάθε είδους αρχείων PDF, όχι μόνο προσφορών προϊόντων.`,
        `Μη διστάσετε να επικοινωνήσετε μαζί μου
        <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=Σχετικά με προσαρμοσμένη εφαρμογή δημιουργίας PDF">
        εδώ</a>.`,
        `- Νίκος Πολυζωγόπουλος`,
    ],
    credits: 'Η εικόνα της αρχικής σελίδας είναι από το&nbsp;<a href="https://undraw.co/" target="_blank">unDraw</a>&nbsp;- Κατερίνα Λιμπιτσούνη. (ευχαριστώ πολύ!)',
    buttonText: 'Φτιάξτε το δικό σας .pdf!'
};