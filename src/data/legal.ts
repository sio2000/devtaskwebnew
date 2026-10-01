// Everything the /terms page shows: who runs the site, the terms of use and the
// privacy notice (GDPR). The business details live once, here, and are printed
// into all three languages.
import type { Lang } from './work';

export const business = {
  legalName: 'ΣΙΩΖΟΣ ΘΕΟΧΑΡΗΣ ΠΑΝΑΓΙΩΤΗΣ',
  legalNameLatin: 'SIOZOS THEOCHARIS PANAGIOTIS',
  tradeName: 'DevTaskHub.com',
  address: {
    el: 'Μάρκου Μπότσαρη 83, 54644 Θεσσαλονίκη, Ελλάδα',
    en: 'Markou Mpotsari 83, 54644 Thessaloniki, Greece',
    fr: 'Markou Mpotsari 83, 54644 Thessalonique, Grèce',
  },
  afm: '169481343',
  gemi: '186989906000',
  email: 'devtaskhub@devtaskhub.com',
  phone: '+30 697 198 2563',
  phoneHref: 'tel:+306971982563',
} as const;

export type LegalSectionId =
  | 'company'
  | 'identity'
  | 'siteUse'
  | 'services'
  | 'intellectualProperty'
  | 'liability'
  | 'controller'
  | 'dataCollection'
  | 'legalBasis'
  | 'recipients'
  | 'internationalTransfers'
  | 'dataRetention'
  | 'yourRights'
  | 'cookies'
  | 'dataSecurity'
  | 'disputes'
  | 'modifications'
  | 'contact';

export interface LegalSection {
  id: LegalSectionId;
  title: string;
  /** trusted markup written in this file */
  content: string;
  note?: string;
}

export interface LegalCopy {
  title: string;
  intro: string;
  sections: LegalSection[];
  acceptance: string;
  lastUpdate: string;
}

const B = business;
const A = 'class="text-iris-bright underline underline-offset-2"';
const UL = 'class="mt-3 list-disc space-y-2 pl-5"';
const mail = `<a href="mailto:${B.email}" ${A}>${B.email}</a>`;
const tel = `<a href="${B.phoneHref}" ${A}>${B.phone}</a>`;
const dpa = `<a href="https://www.dpa.gr" ${A} target="_blank" rel="noopener noreferrer">www.dpa.gr</a>`;
const ombudsman = `<a href="https://www.synigoroskatanaloti.gr" ${A} target="_blank" rel="noopener noreferrer">www.synigoroskatanaloti.gr</a>`;

export const legal: Record<Lang, LegalCopy> = {
  el: {
    title: 'Όροι Χρήσης & Προστασία Δεδομένων',
    intro:
      'Εδώ θα βρείτε ποιος λειτουργεί την ιστοσελίδα devtaskhub.com, τους όρους χρήσης της και την Πολιτική Απορρήτου, σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (Κανονισμός (ΕΕ) 2016/679, GDPR) και την ελληνική νομοθεσία.',
    sections: [
      {
        id: 'company',
        title: 'Στοιχεία Επιχείρησης',
        content: `Η ιστοσελίδα devtaskhub.com ανήκει και λειτουργεί από την παρακάτω επιχείρηση:<ul ${UL}><li><b>Επωνυμία:</b> ${B.legalName} (ατομική επιχείρηση)</li><li><b>Διακριτικός τίτλος:</b> ${B.tradeName}</li><li><b>Έδρα:</b> ${B.address.el}</li><li><b>ΑΦΜ:</b> ${B.afm}</li><li><b>Αριθμός Γ.Ε.ΜΗ.:</b> ${B.gemi}</li><li><b>Email:</b> ${mail}</li><li><b>Τηλέφωνο:</b> ${tel}</li></ul>`,
      },
      {
        id: 'identity',
        title: 'Ποιοι Είμαστε',
        content:
          'Το DevTaskHub είναι ο διακριτικός τίτλος της ατομικής επιχείρησης του <b>Θεοχάρη Παναγιώτη Σιώζου</b>, με έδρα τη Θεσσαλονίκη. Σχεδιάζουμε και αναπτύσσουμε ιστοσελίδες, e-shop, εφαρμογές κινητών και λύσεις τεχνητής νοημοσύνης. Υπεύθυνος για το περιεχόμενο της ιστοσελίδας και για κάθε συνεργασία είναι ο ίδιος.',
      },
      {
        id: 'siteUse',
        title: 'Χρήση της Ιστοσελίδας',
        content: `Η ιστοσελίδα έχει ενημερωτικό χαρακτήρα. Χρησιμοποιώντας την, δέχεστε ότι:<ul ${UL}><li>θα τη χρησιμοποιείτε με νόμιμο τρόπο και χωρίς να εμποδίζετε τη λειτουργία της,</li><li>δεν θα επιχειρήσετε να παρακάμψετε τα μέτρα ασφαλείας της,</li><li>τα στοιχεία που μας στέλνετε είναι αληθινά και δικά σας.</li></ul><p class="mt-3">Η ιστοσελίδα περιέχει συνδέσμους προς ιστοσελίδες τρίτων, όπως έργα πελατών, καταστήματα εφαρμογών και κοινωνικά δίκτυα. Δεν ελέγχουμε το περιεχόμενο και τις πολιτικές τους.</p>`,
      },
      {
        id: 'services',
        title: 'Υπηρεσίες, Προσφορές & Συμβάσεις',
        content: `Η ιστοσελίδα παρουσιάζει τις υπηρεσίες και τα έργα μας. Δεν γίνονται παραγγελίες ή πληρωμές μέσα από αυτήν.<ul ${UL}><li>Κάθε συνεργασία συμφωνείται με γραπτή προσφορά ή σύμβαση, που ορίζει το αντικείμενο, τα παραδοτέα, το χρονοδιάγραμμα, την αμοιβή και τον τρόπο πληρωμής.</li><li>Η αμοιβή ορίζεται ανά έργο και η προσφορά αναφέρει ρητά αν περιλαμβάνει ΦΠΑ.</li><li>Για κάθε πληρωμή εκδίδεται νόμιμο φορολογικό παραστατικό.</li><li>Όσα αναφέρονται στην ιστοσελίδα έχουν ενημερωτικό χαρακτήρα και δεν αποτελούν δεσμευτική προσφορά.</li></ul><p class="mt-3"><b>Αν είστε καταναλωτής</b> και η σύμβαση συνάπτεται από απόσταση ή εκτός εμπορικού καταστήματος, έχετε δικαίωμα υπαναχώρησης μέσα σε 14 ημέρες, χωρίς να αναφέρετε λόγο, σύμφωνα με τον Ν. 2251/1994. Το δικαίωμα δεν ισχύει στις περιπτώσεις που εξαιρεί ο νόμος, για παράδειγμα όταν η υπηρεσία έχει εκτελεστεί πλήρως αφού το ζητήσατε ρητά ή όταν το παραδοτέο φτιάχνεται ειδικά για εσάς. Οι παρόντες όροι δεν περιορίζουν κανένα δικαίωμα που σας δίνει ο νόμος.</p>`,
      },
      {
        id: 'intellectualProperty',
        title: 'Πνευματικά Δικαιώματα',
        content:
          'Τα κείμενα, τα γραφικά, ο κώδικας και τα λογότυπα της ιστοσελίδας ανήκουν στην επιχείρηση, εκτός αν αναφέρεται διαφορετικά. Δεν επιτρέπεται η αναπαραγωγή ή η αναδημοσίευσή τους χωρίς γραπτή άδεια. Τα σήματα και τα λογότυπα των έργων που παρουσιάζουμε ανήκουν στους δικαιούχους τους. Τα δικαιώματα πάνω στα παραδοτέα κάθε έργου ορίζονται στη σύμβαση του έργου.',
      },
      {
        id: 'liability',
        title: 'Περιορισμός Ευθύνης',
        content:
          'Φροντίζουμε το περιεχόμενο να είναι ακριβές και ενημερωμένο, χωρίς να εγγυόμαστε ότι δεν υπάρχουν λάθη ή διακοπές. Στον βαθμό που επιτρέπει ο νόμος, δεν ευθυνόμαστε για ζημιές από τη χρήση της ιστοσελίδας ή από ιστοσελίδες τρίτων στις οποίες παραπέμπουμε. Ο περιορισμός αυτός δεν ισχύει για δόλο ή βαριά αμέλεια και δεν θίγει τα δικαιώματα των καταναλωτών που ο νόμος δεν επιτρέπει να αποκλειστούν.',
        note: 'Το περιεχόμενο της ιστοσελίδας δεν αποτελεί νομική, φορολογική ή άλλη επαγγελματική συμβουλή.',
      },
      {
        id: 'controller',
        title: 'Πολιτική Απορρήτου: Υπεύθυνος Επεξεργασίας',
        content: `Υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων είναι η επιχείρηση <b>${B.legalName}</b> (${B.tradeName}), ${B.address.el}, email ${mail}.<p class="mt-3">Επεξεργαζόμαστε δεδομένα σύμφωνα με τον Κανονισμό (ΕΕ) 2016/679 (GDPR) και τον Ν. 4624/2019: νόμιμα και με διαφάνεια, μόνο όσα χρειάζονται, μόνο για όσο χρειάζονται. Δεν έχει οριστεί Υπεύθυνος Προστασίας Δεδομένων (DPO), επειδή δεν απαιτείται για τη δραστηριότητά μας. Για κάθε σχετικό θέμα απευθυνθείτε στα παραπάνω στοιχεία.</p>`,
      },
      {
        id: 'dataCollection',
        title: 'Ποια Δεδομένα Συλλέγουμε',
        content: `<ul class="list-disc space-y-2 pl-5"><li><b>Φόρμα επικοινωνίας:</b> όνομα, email, θέμα, μήνυμα και προαιρετικά η υπηρεσία που σας ενδιαφέρει. Αν ήρθατε από σύνδεσμο καμπάνιας, το μήνυμα συνοδεύεται από την ετικέτα του συνδέσμου.</li><li><b>Email και τηλέφωνο:</b> όσα στοιχεία μας δίνετε εσείς όταν επικοινωνείτε μαζί μας.</li><li><b>Chat:</b> ό,τι γράφετε στο παράθυρο συνομιλίας, μόνο αν το ανοίξετε.</li><li><b>Στατιστικά επισκεψιμότητας:</b> σελίδα, διάρκεια επίσκεψης, τύπος συσκευής, περιηγητής, λειτουργικό, γλώσσα, πηγή αναφοράς, ετικέτες καμπάνιας, χώρα και πόλη κατά προσέγγιση, και ένα τυχαίο αναγνωριστικό που υπάρχει μόνο στη μνήμη της σελίδας και χάνεται όταν κλείσει η καρτέλα. Δεν αποθηκεύεται τίποτα στη συσκευή σας και δεν αναγνωρίζουμε τον ίδιο επισκέπτη από τη μία επίσκεψη στην επόμενη.</li><li><b>Τεχνικά δεδομένα:</b> διεύθυνση IP και αρχεία καταγραφής του παρόχου φιλοξενίας, για την ασφάλεια και τη λειτουργία της ιστοσελίδας.</li></ul><p class="mt-3">Δεν ζητάμε ειδικές κατηγορίες δεδομένων και η ιστοσελίδα δεν απευθύνεται σε ανηλίκους. Δεν πουλάμε και δεν νοικιάζουμε προσωπικά δεδομένα.</p>`,
      },
      {
        id: 'legalBasis',
        title: 'Σκοποί & Νομική Βάση',
        content: `<ul class="list-disc space-y-2 pl-5"><li><b>Απάντηση σε μήνυμα ή αίτημα προσφοράς:</b> μέτρα πριν από τη σύναψη σύμβασης, μετά από δικό σας αίτημα (άρθρο 6 παρ. 1 στοιχ. β΄ GDPR).</li><li><b>Εκτέλεση συνεργασίας και τιμολόγηση:</b> εκτέλεση σύμβασης (στοιχ. β΄) και συμμόρφωση με φορολογικές και λογιστικές υποχρεώσεις (στοιχ. γ΄).</li><li><b>Στατιστικά, ασφάλεια και βελτίωση της ιστοσελίδας:</b> έννομο συμφέρον μας (στοιχ. στ΄), χωρίς ταυτοποίηση επισκεπτών.</li></ul><p class="mt-3">Η παροχή των στοιχείων είναι προαιρετική. Χωρίς όνομα και email δεν μπορούμε να απαντήσουμε στο μήνυμά σας. Δεν στέλνουμε διαφημιστικά μηνύματα χωρίς τη συγκατάθεσή σας. Δεν λαμβάνουμε αυτοματοποιημένες αποφάσεις και δεν δημιουργούμε προφίλ (άρθρο 22 GDPR).</p>`,
      },
      {
        id: 'recipients',
        title: 'Ποιοι Λαμβάνουν τα Δεδομένα',
        content: `Τα δεδομένα τα βλέπουμε μόνο εμείς και οι πάροχοι που χρειάζονται για τη λειτουργία της ιστοσελίδας, οι οποίοι ενεργούν για λογαριασμό μας:<ul ${UL}><li><b>Netlify:</b> φιλοξενία της ιστοσελίδας και αποθήκευση των στατιστικών.</li><li><b>Resend:</b> αποστολή των μηνυμάτων της φόρμας επικοινωνίας.</li><li><b>ImprovMX και Google (Gmail):</b> παραλαβή και αποθήκευση της αλληλογραφίας.</li><li><b>Google Fonts:</b> οι γραμματοσειρές φορτώνονται από διακομιστές της Google, που λαμβάνουν τη διεύθυνση IP σας για να τις παραδώσουν.</li><li><b>FastBots:</b> παράθυρο συνομιλίας, μόνο αν το ανοίξετε. Ισχύει και η πολιτική του παρόχου.</li></ul><p class="mt-3">Δεδομένα δίνονται σε λογιστή ή σε δημόσιες αρχές μόνο όταν το επιβάλλει ο νόμος.</p>`,
      },
      {
        id: 'internationalTransfers',
        title: 'Διαβίβαση Δεδομένων εκτός ΕΕ',
        content:
          'Ορισμένοι από τους παραπάνω παρόχους έχουν έδρα στις ΗΠΑ. Όπου δεδομένα διαβιβάζονται εκτός Ευρωπαϊκού Οικονομικού Χώρου, η διαβίβαση στηρίζεται στην απόφαση επάρκειας για το Πλαίσιο Προστασίας Δεδομένων ΕΕ-ΗΠΑ (Data Privacy Framework), εφόσον ο πάροχος είναι πιστοποιημένος, ή στις Τυποποιημένες Συμβατικές Ρήτρες της Ευρωπαϊκής Επιτροπής.',
      },
      {
        id: 'dataRetention',
        title: 'Διάρκεια Διατήρησης',
        content:
          '<ul class="list-disc space-y-2 pl-5"><li><b>Μηνύματα επικοινωνίας:</b> έως 12 μήνες από την τελευταία επικοινωνία, εκτός αν ακολουθήσει συνεργασία ή ζητήσετε νωρίτερα τη διαγραφή.</li><li><b>Συμβάσεις και παραστατικά:</b> για όσο ορίζει η φορολογική και λογιστική νομοθεσία.</li><li><b>Στατιστικά:</b> έως 90 ημέρες.</li><li><b>Αρχεία καταγραφής διακομιστή:</b> σύμφωνα με την πολιτική του παρόχου φιλοξενίας.</li></ul>',
      },
      {
        id: 'yourRights',
        title: 'Τα Δικαιώματά σας',
        content: `Σύμφωνα με τα άρθρα 15 έως 22 του GDPR έχετε δικαίωμα:<ul ${UL}><li><b>Πρόσβασης</b> στα δεδομένα που διατηρούμε για εσάς.</li><li><b>Διόρθωσης</b> ανακριβών ή ελλιπών δεδομένων.</li><li><b>Διαγραφής</b>, όπου εφαρμόζεται.</li><li><b>Περιορισμού</b> της επεξεργασίας.</li><li><b>Φορητότητας</b> των δεδομένων σας.</li><li><b>Εναντίωσης</b> στην επεξεργασία που βασίζεται σε έννομο συμφέρον.</li><li><b>Ανάκλησης της συγκατάθεσης</b>, όπου η επεξεργασία βασίζεται σε αυτήν, χωρίς να θίγεται η νομιμότητα όσων προηγήθηκαν.</li></ul><p class="mt-3">Για να ασκήσετε τα δικαιώματά σας στείλτε email στο ${mail}. Απαντάμε μέσα σε έναν μήνα. Έχετε επίσης δικαίωμα καταγγελίας στην <b>Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα</b>: ${dpa}.</p>`,
      },
      {
        id: 'cookies',
        title: 'Cookies & Τοπική Αποθήκευση',
        content: `Η ιστοσελίδα δεν τοποθετεί δικά της cookies και δεν χρησιμοποιεί cookies διαφήμισης ή παρακολούθησης.<ul ${UL}><li><b>Τοπική αποθήκευση (localStorage):</b> μόνο η γλώσσα που επιλέξατε. Είναι απαραίτητη για τη λειτουργία που ζητήσατε και δεν χρειάζεται συγκατάθεση.</li><li><b>Στατιστικά:</b> δικά μας, χωρίς cookies και χωρίς αποθήκευση στη συσκευή σας.</li><li><b>Παράθυρο συνομιλίας:</b> φορτώνεται μόνο αν το ανοίξετε. Ο πάροχός του μπορεί τότε να τοποθετήσει δικά του cookies.</li></ul><p class="mt-3">Μπορείτε να διαγράψετε την τοπική αποθήκευση από τις ρυθμίσεις του περιηγητή σας.</p>`,
      },
      {
        id: 'dataSecurity',
        title: 'Ασφάλεια Δεδομένων',
        content:
          'Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα: κρυπτογράφηση HTTPS/TLS, περιορισμένη πρόσβαση στο περιβάλλον διαχείρισης και ασφαλή φιλοξενία. Κανένα σύστημα δεν είναι απόλυτα ασφαλές. Σε περίπτωση παραβίασης δεδομένων θα ενημερώσουμε την Αρχή Προστασίας Δεδομένων και όσους επηρεάζονται, όπως ορίζουν τα άρθρα 33 και 34 του GDPR.',
      },
      {
        id: 'disputes',
        title: 'Εφαρμοστέο Δίκαιο & Επίλυση Διαφορών',
        content: `Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Για κάθε διαφορά αρμόδια είναι τα δικαστήρια της Θεσσαλονίκης, με την επιφύλαξη των διατάξεων που προστατεύουν τους καταναλωτές.<p class="mt-3">Πριν από κάθε άλλη ενέργεια, επικοινωνήστε μαζί μας στο ${mail} ώστε να βρούμε λύση. Αν είστε καταναλωτής, μπορείτε επίσης να απευθυνθείτε στον <b>Συνήγορο του Καταναλωτή</b> (${ombudsman}) για εξωδικαστική επίλυση της διαφοράς.</p>`,
      },
      {
        id: 'modifications',
        title: 'Τροποποιήσεις',
        content:
          'Μπορεί να ενημερώσουμε τους όρους και την Πολιτική Απορρήτου. Κάθε αλλαγή αναρτάται σε αυτή τη σελίδα, με νέα ημερομηνία ενημέρωσης.',
      },
      {
        id: 'contact',
        title: 'Επικοινωνία',
        content: `Για οποιοδήποτε θέμα σχετικά με τους όρους ή τα προσωπικά σας δεδομένα:<p class="mt-3"><b>${B.legalName}</b> (${B.tradeName})<br/>${B.address.el}<br/>Email: ${mail}<br/>Τηλέφωνο: ${tel}</p>`,
      },
    ],
    acceptance: 'Χρησιμοποιώντας την ιστοσελίδα αποδέχεστε τους παραπάνω όρους χρήσης.',
    lastUpdate: 'Τελευταία ενημέρωση: Οκτώβριος 2026',
  },

  en: {
    title: 'Terms of Use & Privacy',
    intro:
      'This page explains who runs devtaskhub.com, the terms of use of the website and our Privacy Policy, in line with the General Data Protection Regulation (Regulation (EU) 2016/679, GDPR) and Greek law.',
    sections: [
      {
        id: 'company',
        title: 'Business Details',
        content: `The website devtaskhub.com is owned and operated by the following business:<ul ${UL}><li><b>Registered name:</b> ${B.legalName} (${B.legalNameLatin}), sole proprietorship</li><li><b>Trade name:</b> ${B.tradeName}</li><li><b>Registered office:</b> ${B.address.en}</li><li><b>Tax ID (AFM):</b> ${B.afm}</li><li><b>Business Registry (G.E.MI.) number:</b> ${B.gemi}</li><li><b>Email:</b> ${mail}</li><li><b>Phone:</b> ${tel}</li></ul>`,
      },
      {
        id: 'identity',
        title: 'Who We Are',
        content:
          'DevTaskHub is the trade name of the sole proprietorship of <b>Theocharis Panagiotis Siozos</b>, based in Thessaloniki, Greece. We design and build websites, online stores, mobile apps and AI solutions. He is responsible for the content of this website and for every engagement.',
      },
      {
        id: 'siteUse',
        title: 'Use of the Website',
        content: `The website is informational. By using it you agree that:<ul ${UL}><li>you will use it lawfully and without disrupting its operation,</li><li>you will not try to bypass its security measures,</li><li>the details you send us are true and your own.</li></ul><p class="mt-3">The website links to third-party websites, such as client projects, app stores and social networks. We do not control their content or policies.</p>`,
      },
      {
        id: 'services',
        title: 'Services, Quotes & Contracts',
        content: `The website presents our services and our work. No orders or payments are made through it.<ul ${UL}><li>Every engagement is agreed in a written quote or contract that sets out the scope, deliverables, timeline, fee and payment terms.</li><li>The fee is set per project and the quote states clearly whether it includes VAT.</li><li>A lawful tax document is issued for every payment.</li><li>What is shown on the website is for information and is not a binding offer.</li></ul><p class="mt-3"><b>If you are a consumer</b> and the contract is concluded at a distance or off premises, you have the right to withdraw within 14 days without giving a reason, under Greek Law 2251/1994. The right does not apply in the cases the law excludes, for example when the service has been fully performed after your express request or when the deliverable is made to your specifications. These terms do not limit any right the law gives you.</p>`,
      },
      {
        id: 'intellectualProperty',
        title: 'Intellectual Property',
        content:
          'The texts, graphics, code and logos of the website belong to the business unless stated otherwise. They may not be reproduced or republished without written permission. The trademarks and logos of the projects we present belong to their owners. Rights in the deliverables of each project are set out in the project contract.',
      },
      {
        id: 'liability',
        title: 'Limitation of Liability',
        content:
          'We take care to keep the content accurate and up to date, without guaranteeing that it is free of errors or interruptions. To the extent the law allows, we are not liable for damage arising from the use of the website or of third-party websites we link to. This limitation does not apply to intent or gross negligence and does not affect consumer rights that cannot be excluded by law.',
        note: 'The content of the website is not legal, tax or other professional advice.',
      },
      {
        id: 'controller',
        title: 'Privacy Policy: Data Controller',
        content: `The controller of your personal data is the business <b>${B.legalName}</b> (${B.tradeName}), ${B.address.en}, email ${mail}.<p class="mt-3">We process data in line with Regulation (EU) 2016/679 (GDPR) and Greek Law 4624/2019: lawfully and transparently, only what is needed, only for as long as it is needed. No Data Protection Officer (DPO) has been appointed, as one is not required for our activity. For any related matter use the contact details above.</p>`,
      },
      {
        id: 'dataCollection',
        title: 'What We Collect',
        content: `<ul class="list-disc space-y-2 pl-5"><li><b>Contact form:</b> name, email, subject, message and, optionally, the service you are interested in. If you arrived from a campaign link, the message carries the tag of that link.</li><li><b>Email and phone:</b> whatever details you give us when you contact us.</li><li><b>Chat:</b> what you type in the chat window, only if you open it.</li><li><b>Visit statistics:</b> page, visit duration, device type, browser, operating system, language, referrer, campaign tags, approximate country and city, and a random identifier that exists only in the memory of the page and is lost when the tab closes. Nothing is stored on your device and we do not recognise the same visitor from one visit to the next.</li><li><b>Technical data:</b> IP address and hosting provider logs, for the security and operation of the website.</li></ul><p class="mt-3">We do not ask for special categories of data and the website is not aimed at minors. We do not sell or rent personal data.</p>`,
      },
      {
        id: 'legalBasis',
        title: 'Purposes & Legal Basis',
        content: `<ul class="list-disc space-y-2 pl-5"><li><b>Replying to a message or quote request:</b> steps prior to entering into a contract, at your request (Article 6(1)(b) GDPR).</li><li><b>Carrying out an engagement and invoicing:</b> performance of a contract (point (b)) and compliance with tax and accounting obligations (point (c)).</li><li><b>Statistics, security and improving the website:</b> our legitimate interest (point (f)), without identifying visitors.</li></ul><p class="mt-3">Providing your details is optional. Without a name and an email we cannot reply to your message. We do not send marketing messages without your consent. We do not make automated decisions and we do not build profiles (Article 22 GDPR).</p>`,
      },
      {
        id: 'recipients',
        title: 'Who Receives the Data',
        content: `The data is seen only by us and by the providers needed to run the website, who act on our behalf:<ul ${UL}><li><b>Netlify:</b> website hosting and storage of the statistics.</li><li><b>Resend:</b> delivery of contact form messages.</li><li><b>ImprovMX and Google (Gmail):</b> receiving and storing correspondence.</li><li><b>Google Fonts:</b> the fonts are loaded from Google servers, which receive your IP address in order to deliver them.</li><li><b>FastBots:</b> chat window, only if you open it. The provider's own policy also applies.</li></ul><p class="mt-3">Data is given to an accountant or to public authorities only when the law requires it.</p>`,
      },
      {
        id: 'internationalTransfers',
        title: 'Transfers Outside the EU',
        content:
          'Some of the providers above are based in the United States. Where data is transferred outside the European Economic Area, the transfer relies on the adequacy decision for the EU-US Data Privacy Framework, where the provider is certified, or on the Standard Contractual Clauses of the European Commission.',
      },
      {
        id: 'dataRetention',
        title: 'How Long We Keep Data',
        content:
          '<ul class="list-disc space-y-2 pl-5"><li><b>Contact messages:</b> up to 12 months after the last contact, unless an engagement follows or you ask for deletion sooner.</li><li><b>Contracts and tax documents:</b> for as long as tax and accounting law requires.</li><li><b>Statistics:</b> up to 90 days.</li><li><b>Server logs:</b> according to the hosting provider\'s policy.</li></ul>',
      },
      {
        id: 'yourRights',
        title: 'Your Rights',
        content: `Under Articles 15 to 22 of the GDPR you have the right to:<ul ${UL}><li><b>Access</b> the data we hold about you.</li><li><b>Rectify</b> inaccurate or incomplete data.</li><li><b>Erase</b> your data, where applicable.</li><li><b>Restrict</b> the processing.</li><li><b>Port</b> your data.</li><li><b>Object</b> to processing based on legitimate interest.</li><li><b>Withdraw consent</b>, where processing is based on it, without affecting what came before.</li></ul><p class="mt-3">To exercise your rights, email ${mail}. We reply within one month. You also have the right to lodge a complaint with the <b>Hellenic Data Protection Authority</b>: ${dpa}.</p>`,
      },
      {
        id: 'cookies',
        title: 'Cookies & Local Storage',
        content: `The website sets no cookies of its own and uses no advertising or tracking cookies.<ul ${UL}><li><b>Local storage (localStorage):</b> only the language you chose. It is necessary for the function you asked for and needs no consent.</li><li><b>Statistics:</b> our own, with no cookies and nothing stored on your device.</li><li><b>Chat window:</b> loaded only if you open it. Its provider may then set its own cookies.</li></ul><p class="mt-3">You can clear local storage in your browser settings.</p>`,
      },
      {
        id: 'dataSecurity',
        title: 'Data Security',
        content:
          'We apply appropriate technical and organisational measures: HTTPS/TLS encryption, restricted access to the admin area and secure hosting. No system is completely secure. In the event of a data breach we will notify the Data Protection Authority and the people affected, as Articles 33 and 34 of the GDPR require.',
      },
      {
        id: 'disputes',
        title: 'Governing Law & Disputes',
        content: `These terms are governed by Greek law. The courts of Thessaloniki, Greece have jurisdiction over any dispute, subject to the provisions that protect consumers.<p class="mt-3">Before anything else, contact us at ${mail} so we can find a solution. If you are a consumer, you may also turn to the <b>Hellenic Consumer Ombudsman</b> (${ombudsman}) for out-of-court resolution of the dispute.</p>`,
      },
      {
        id: 'modifications',
        title: 'Changes',
        content:
          'We may update these terms and the Privacy Policy. Every change is posted on this page with a new update date.',
      },
      {
        id: 'contact',
        title: 'Contact',
        content: `For any matter about these terms or your personal data:<p class="mt-3"><b>${B.legalName}</b> (${B.tradeName})<br/>${B.address.en}<br/>Email: ${mail}<br/>Phone: ${tel}</p>`,
      },
    ],
    acceptance: 'By using the website you accept the terms of use above.',
    lastUpdate: 'Last update: October 2026',
  },

  fr: {
    title: 'Conditions d\'utilisation & Confidentialité',
    intro:
      'Cette page indique qui exploite devtaskhub.com, les conditions d\'utilisation du site et notre Politique de confidentialité, conformément au Règlement général sur la protection des données (Règlement (UE) 2016/679, RGPD) et au droit grec.',
    sections: [
      {
        id: 'company',
        title: 'Informations sur l\'entreprise',
        content: `Le site devtaskhub.com appartient à l'entreprise suivante, qui l'exploite :<ul ${UL}><li><b>Dénomination :</b> ${B.legalName} (${B.legalNameLatin}), entreprise individuelle</li><li><b>Nom commercial :</b> ${B.tradeName}</li><li><b>Siège :</b> ${B.address.fr}</li><li><b>Numéro fiscal (AFM) :</b> ${B.afm}</li><li><b>Numéro au registre du commerce (G.E.MI.) :</b> ${B.gemi}</li><li><b>Email :</b> ${mail}</li><li><b>Téléphone :</b> ${tel}</li></ul>`,
      },
      {
        id: 'identity',
        title: 'Qui sommes-nous',
        content:
          'DevTaskHub est le nom commercial de l\'entreprise individuelle de <b>Theocharis Panagiotis Siozos</b>, établie à Thessalonique, en Grèce. Nous concevons et développons des sites web, des boutiques en ligne, des applications mobiles et des solutions d\'IA. Il est responsable du contenu de ce site et de chaque collaboration.',
      },
      {
        id: 'siteUse',
        title: 'Utilisation du site',
        content: `Le site a un caractère informatif. En l'utilisant, vous acceptez :<ul ${UL}><li>de l'utiliser de manière licite et sans perturber son fonctionnement,</li><li>de ne pas tenter de contourner ses mesures de sécurité,</li><li>que les informations que vous nous envoyez sont exactes et vous appartiennent.</li></ul><p class="mt-3">Le site contient des liens vers des sites tiers, comme des projets de clients, des boutiques d'applications et des réseaux sociaux. Nous ne contrôlons ni leur contenu ni leurs politiques.</p>`,
      },
      {
        id: 'services',
        title: 'Services, devis & contrats',
        content: `Le site présente nos services et nos réalisations. Aucune commande ni aucun paiement ne s'effectue sur le site.<ul ${UL}><li>Chaque collaboration fait l'objet d'un devis ou d'un contrat écrit qui précise l'objet, les livrables, le calendrier, la rémunération et les modalités de paiement.</li><li>La rémunération est fixée par projet et le devis indique clairement si elle inclut la TVA.</li><li>Un justificatif fiscal conforme est émis pour chaque paiement.</li><li>Les informations du site sont données à titre indicatif et ne constituent pas une offre ferme.</li></ul><p class="mt-3"><b>Si vous êtes consommateur</b> et que le contrat est conclu à distance ou hors établissement, vous disposez d'un droit de rétractation de 14 jours, sans avoir à donner de motif, conformément à la loi grecque 2251/1994. Ce droit ne s'applique pas dans les cas exclus par la loi, par exemple lorsque le service a été entièrement exécuté après votre demande expresse ou lorsque le livrable est réalisé selon vos spécifications. Les présentes conditions ne limitent aucun droit que la loi vous accorde.</p>`,
      },
      {
        id: 'intellectualProperty',
        title: 'Propriété intellectuelle',
        content:
          'Les textes, les graphismes, le code et les logos du site appartiennent à l\'entreprise, sauf mention contraire. Ils ne peuvent être reproduits ni republiés sans autorisation écrite. Les marques et logos des projets présentés appartiennent à leurs titulaires. Les droits sur les livrables de chaque projet sont définis dans le contrat du projet.',
      },
      {
        id: 'liability',
        title: 'Limitation de responsabilité',
        content:
          'Nous veillons à ce que le contenu soit exact et à jour, sans garantir l\'absence d\'erreurs ou d\'interruptions. Dans la mesure permise par la loi, nous ne sommes pas responsables des dommages résultant de l\'utilisation du site ou des sites tiers vers lesquels nous renvoyons. Cette limitation ne s\'applique pas en cas de dol ou de faute lourde et ne porte pas atteinte aux droits des consommateurs que la loi interdit d\'exclure.',
        note: 'Le contenu du site ne constitue pas un conseil juridique, fiscal ou professionnel.',
      },
      {
        id: 'controller',
        title: 'Politique de confidentialité : responsable du traitement',
        content: `Le responsable du traitement de vos données personnelles est l'entreprise <b>${B.legalName}</b> (${B.tradeName}), ${B.address.fr}, email ${mail}.<p class="mt-3">Nous traitons les données conformément au Règlement (UE) 2016/679 (RGPD) et à la loi grecque 4624/2019 : de manière licite et transparente, uniquement ce qui est nécessaire, uniquement le temps nécessaire. Aucun délégué à la protection des données (DPO) n'a été désigné, car notre activité ne l'exige pas. Pour toute question, utilisez les coordonnées ci-dessus.</p>`,
      },
      {
        id: 'dataCollection',
        title: 'Données collectées',
        content: `<ul class="list-disc space-y-2 pl-5"><li><b>Formulaire de contact :</b> nom, email, sujet, message et, en option, le service qui vous intéresse. Si vous arrivez par un lien de campagne, le message porte l'étiquette de ce lien.</li><li><b>Email et téléphone :</b> les informations que vous nous donnez lorsque vous nous contactez.</li><li><b>Chat :</b> ce que vous écrivez dans la fenêtre de discussion, uniquement si vous l'ouvrez.</li><li><b>Statistiques de visite :</b> page, durée de visite, type d'appareil, navigateur, système d'exploitation, langue, référent, étiquettes de campagne, pays et ville approximatifs, et un identifiant aléatoire qui n'existe que dans la mémoire de la page et disparaît à la fermeture de l'onglet. Rien n'est stocké sur votre appareil et nous ne reconnaissons pas un même visiteur d'une visite à l'autre.</li><li><b>Données techniques :</b> adresse IP et journaux de l'hébergeur, pour la sécurité et le fonctionnement du site.</li></ul><p class="mt-3">Nous ne demandons aucune catégorie particulière de données et le site ne s'adresse pas aux mineurs. Nous ne vendons ni ne louons de données personnelles.</p>`,
      },
      {
        id: 'legalBasis',
        title: 'Finalités & base juridique',
        content: `<ul class="list-disc space-y-2 pl-5"><li><b>Réponse à un message ou à une demande de devis :</b> mesures précontractuelles prises à votre demande (article 6, paragraphe 1, point b) du RGPD).</li><li><b>Exécution d'une collaboration et facturation :</b> exécution d'un contrat (point b) et respect des obligations fiscales et comptables (point c).</li><li><b>Statistiques, sécurité et amélioration du site :</b> notre intérêt légitime (point f), sans identification des visiteurs.</li></ul><p class="mt-3">La fourniture de vos informations est facultative. Sans nom ni email, nous ne pouvons pas répondre à votre message. Nous n'envoyons pas de messages publicitaires sans votre consentement. Nous ne prenons aucune décision automatisée et n'établissons aucun profil (article 22 du RGPD).</p>`,
      },
      {
        id: 'recipients',
        title: 'Destinataires des données',
        content: `Les données ne sont vues que par nous et par les prestataires nécessaires au fonctionnement du site, qui agissent pour notre compte :<ul ${UL}><li><b>Netlify :</b> hébergement du site et stockage des statistiques.</li><li><b>Resend :</b> envoi des messages du formulaire de contact.</li><li><b>ImprovMX et Google (Gmail) :</b> réception et conservation de la correspondance.</li><li><b>Google Fonts :</b> les polices sont chargées depuis les serveurs de Google, qui reçoivent votre adresse IP pour les fournir.</li><li><b>FastBots :</b> fenêtre de discussion, uniquement si vous l'ouvrez. La politique du prestataire s'applique également.</li></ul><p class="mt-3">Des données ne sont communiquées à un comptable ou aux autorités publiques que lorsque la loi l'impose.</p>`,
      },
      {
        id: 'internationalTransfers',
        title: 'Transferts hors UE',
        content:
          'Certains des prestataires ci-dessus sont établis aux États-Unis. Lorsque des données sont transférées hors de l\'Espace économique européen, le transfert repose sur la décision d\'adéquation relative au Cadre de protection des données UE-États-Unis (Data Privacy Framework), si le prestataire est certifié, ou sur les Clauses contractuelles types de la Commission européenne.',
      },
      {
        id: 'dataRetention',
        title: 'Durée de conservation',
        content:
          '<ul class="list-disc space-y-2 pl-5"><li><b>Messages de contact :</b> jusqu\'à 12 mois après le dernier échange, sauf si une collaboration suit ou si vous demandez la suppression plus tôt.</li><li><b>Contrats et justificatifs fiscaux :</b> aussi longtemps que l\'exige la législation fiscale et comptable.</li><li><b>Statistiques :</b> jusqu\'à 90 jours.</li><li><b>Journaux du serveur :</b> selon la politique de l\'hébergeur.</li></ul>',
      },
      {
        id: 'yourRights',
        title: 'Vos droits',
        content: `Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit :<ul ${UL}><li><b>D'accès</b> aux données que nous détenons sur vous.</li><li><b>De rectification</b> des données inexactes ou incomplètes.</li><li><b>D'effacement</b>, le cas échéant.</li><li><b>De limitation</b> du traitement.</li><li><b>De portabilité</b> de vos données.</li><li><b>D'opposition</b> au traitement fondé sur l'intérêt légitime.</li><li><b>De retrait du consentement</b>, lorsque le traitement repose sur celui-ci, sans effet sur ce qui a précédé.</li></ul><p class="mt-3">Pour exercer vos droits, écrivez à ${mail}. Nous répondons dans un délai d'un mois. Vous avez également le droit d'introduire une réclamation auprès de l'<b>Autorité hellénique de protection des données</b> : ${dpa}.</p>`,
      },
      {
        id: 'cookies',
        title: 'Cookies & stockage local',
        content: `Le site ne dépose aucun cookie propre et n'utilise aucun cookie publicitaire ou de suivi.<ul ${UL}><li><b>Stockage local (localStorage) :</b> uniquement la langue que vous avez choisie. Il est nécessaire à la fonction demandée et ne requiert pas de consentement.</li><li><b>Statistiques :</b> les nôtres, sans cookies et sans rien stocker sur votre appareil.</li><li><b>Fenêtre de discussion :</b> chargée uniquement si vous l'ouvrez. Son prestataire peut alors déposer ses propres cookies.</li></ul><p class="mt-3">Vous pouvez effacer le stockage local dans les paramètres de votre navigateur.</p>`,
      },
      {
        id: 'dataSecurity',
        title: 'Sécurité des données',
        content:
          'Nous appliquons des mesures techniques et organisationnelles appropriées : chiffrement HTTPS/TLS, accès restreint à l\'espace d\'administration et hébergement sécurisé. Aucun système n\'est totalement sûr. En cas de violation de données, nous informerons l\'Autorité de protection des données et les personnes concernées, comme l\'exigent les articles 33 et 34 du RGPD.',
      },
      {
        id: 'disputes',
        title: 'Droit applicable & litiges',
        content: `Les présentes conditions sont régies par le droit grec. Les tribunaux de Thessalonique, en Grèce, sont compétents pour tout litige, sous réserve des dispositions qui protègent les consommateurs.<p class="mt-3">Avant toute autre démarche, contactez-nous à ${mail} afin que nous trouvions une solution. Si vous êtes consommateur, vous pouvez également saisir le <b>Médiateur hellénique du consommateur</b> (${ombudsman}) pour un règlement extrajudiciaire du litige.</p>`,
      },
      {
        id: 'modifications',
        title: 'Modifications',
        content:
          'Nous pouvons mettre à jour ces conditions et la Politique de confidentialité. Chaque modification est publiée sur cette page avec une nouvelle date de mise à jour.',
      },
      {
        id: 'contact',
        title: 'Contact',
        content: `Pour toute question sur ces conditions ou sur vos données personnelles :<p class="mt-3"><b>${B.legalName}</b> (${B.tradeName})<br/>${B.address.fr}<br/>Email : ${mail}<br/>Téléphone : ${tel}</p>`,
      },
    ],
    acceptance: 'En utilisant le site, vous acceptez les conditions d\'utilisation ci-dessus.',
    lastUpdate: 'Dernière mise à jour : octobre 2026',
  },
};
