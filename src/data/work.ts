// Single source of truth for everything we show as "our work":
// the portfolio grid, the app showcases, the service pages and the hero visual.
// Copy is deliberately short: one line per project.
import hournookImg from '../assets/work/hournook.webp';
import lumoraImg from '../assets/work/lumora.webp';
import klinaritiImg from '../assets/work/klinariti.webp';
import lifemuseumSiteImg from '../assets/work/lifemuseum-site.webp';
import advancedDermaImg from '../assets/work/advanceddermaimage.webp';
import tparkingSiteImg from '../assets/work/tparking.webp';
import leonidionHousesImg from '../assets/work/leonidionhouses.webp';
import clinicImg from '../assets/work/clinic.webp';
import architectureImg from '../assets/work/architecture.webp';
import hydrogenImg from '../assets/work/hydrogen.webp';
import hotelImg from '../assets/work/hotel.webp';
import jewelsImg from '../assets/work/jewels.webp';
import bagImg from '../assets/work/bag.webp';
import cryptoImg from '../assets/work/crypto.webp';
import wellbeingImg from '../assets/work/wellbeing.webp';

import lmIcon from '../assets/work/lm-icon.png';
import lmHome from '../assets/work/lm-home.webp';
import lmWings from '../assets/work/lm-wings.webp';
import lmExhibit from '../assets/work/lm-exhibit.webp';
import lmJourney from '../assets/work/lm-journey.webp';
import lmStats from '../assets/work/lm-stats.webp';

import tparkingLogo from '../assets/tparkinglogo.png';
import tparkingMap from '../assets/work/tparkingmap.webp';
import tparkingNavigation from '../assets/work/tparkingnavigation.webp';
import tparkingAwards from '../assets/work/tparkingawards.webp';
import tparkingHistory from '../assets/work/tparkingparkinghistory.webp';

import logoGymImg from '../assets/logoGym.png';
import v1 from '../assets/work/v1.webp';
import v2 from '../assets/work/v2.webp';
import v3 from '../assets/work/v3.webp';
import v4 from '../assets/work/v4.webp';
import v5 from '../assets/work/v5.webp';
import v6 from '../assets/work/v6.webp';
import v7 from '../assets/work/v7.webp';
import v8 from '../assets/work/v8.webp';
import v9 from '../assets/work/v9.webp';
import v10 from '../assets/work/v10.webp';
import v11 from '../assets/work/v11.webp';
import v12 from '../assets/work/v12.webp';

export type Lang = 'el' | 'en' | 'fr';
type L = Record<Lang, string>;

export interface SiteProject {
  key: string;
  title: L;
  kind: L;
  description: L;
  tags: string[];
  url: string;
  image: string;
  /** newest work: listed in the hero strip and hero visual */
  isNew?: boolean;
  /** has online booking / payments: also listed on the e-commerce page */
  commerce?: boolean;
}

export const siteProjects: SiteProject[] = [
  {
    key: 'hournook',
    title: { el: 'Hournook', en: 'Hournook', fr: 'Hournook' },
    kind: { el: 'SaaS πλατφόρμα', en: 'SaaS platform', fr: 'Plateforme SaaS' },
    description: {
      el: 'Online ραντεβού για επαγγελματίες. Δική σου σελίδα κρατήσεων σε λίγα λεπτά, σε 15 γλώσσες.',
      en: 'Online booking for professionals. Your own booking page in minutes, in 15 languages.',
      fr: 'Réservation en ligne pour les professionnels. Votre page de réservation en quelques minutes, en 15 langues.',
    },
    tags: ['Next.js', 'Booking', 'Stripe'],
    url: 'https://www.hournook.com/',
    image: hournookImg,
    isNew: true,
    commerce: true,
  },
  {
    key: 'lumora',
    title: { el: 'Lumora Predictions', en: 'Lumora Predictions', fr: 'Lumora Predictions' },
    kind: { el: 'Web εφαρμογή', en: 'Web app', fr: 'Application web' },
    description: {
      el: 'Προβλέψεις με ταρώ, φλιτζάνι και κρυστάλλινη σφαίρα. Λογαριασμοί, online πληρωμές και admin panel.',
      en: 'Predictions with tarot, coffee cup and crystal ball. Accounts, online payments and an admin panel.',
      fr: 'Prédictions par tarot, marc de café et boule de cristal. Comptes, paiements en ligne et panneau admin.',
    },
    tags: ['Next.js', 'Supabase', 'Stripe'],
    url: 'https://lumorapredictions.com/',
    image: lumoraImg,
    isNew: true,
    commerce: true,
  },
  {
    key: 'klinariti',
    title: { el: 'KLINARITI', en: 'KLINARITI', fr: 'KLINARITI' },
    kind: { el: 'Προσωπικό brand', en: 'Personal brand', fr: 'Marque personnelle' },
    description: {
      el: 'Ιστοσελίδα για αστρολόγο και κλινική ψυχολόγο. Ζώδια του μήνα, βίντεο και κράτηση συνεδρίας.',
      en: 'Website for an astrologer and clinical psychologist. Monthly signs, videos and session booking.',
      fr: 'Site pour une astrologue et psychologue clinicienne. Signes du mois, vidéos et prise de séance.',
    },
    tags: ['React', 'Motion', '3D'],
    url: 'https://klinariti.com/',
    image: klinaritiImg,
    isNew: true,
  },
  {
    key: 'lifemuseumSite',
    title: { el: 'LifeMuseum', en: 'LifeMuseum', fr: 'LifeMuseum' },
    kind: { el: 'Site εφαρμογής', en: 'App website', fr: "Site d'application" },
    description: {
      el: 'Το επίσημο site της εφαρμογής LifeMuseum. Έξι γλώσσες και κονσόλα διαχείρισης.',
      en: 'The official website of the LifeMuseum app. Six languages and an admin console.',
      fr: "Le site officiel de l'application LifeMuseum. Six langues et une console d'administration.",
    },
    tags: ['Next.js', 'i18n', 'Supabase'],
    url: 'https://lifemuseumapp.com/',
    image: lifemuseumSiteImg,
    isNew: true,
  },
  {
    key: 'advancedDerma',
    title: { el: 'Advanced Derma', en: 'Advanced Derma', fr: 'Advanced Derma' },
    kind: { el: 'Ιατρείο', en: 'Clinic', fr: 'Cabinet médical' },
    description: {
      el: 'Δερματολογικό ιατρείο σε Αθήνα και Πειραιά, με online ραντεβού.',
      en: 'Dermatology clinic in Athens and Piraeus, with online appointments.',
      fr: 'Cabinet de dermatologie à Athènes et au Pirée, avec rendez-vous en ligne.',
    },
    tags: ['React', 'Booking'],
    url: 'https://advanced-derma.com/',
    image: advancedDermaImg,
    commerce: true,
  },
  {
    key: 'tparkingSite',
    title: { el: 'T-Parking', en: 'T-Parking', fr: 'T-Parking' },
    kind: { el: 'Site εφαρμογής', en: 'App website', fr: "Site d'application" },
    description: {
      el: 'Το επίσημο site της εφαρμογής που βρίσκει ελεύθερο parking στον δρόμο.',
      en: 'The official website of the app that finds free street parking.',
      fr: "Le site officiel de l'application qui trouve des places libres dans la rue.",
    },
    tags: ['Landing', 'Maps'],
    url: 'https://t-parking.com/',
    image: tparkingSiteImg,
  },
  {
    key: 'leonidionHouses',
    title: { el: 'Leonidion Houses', en: 'Leonidion Houses', fr: 'Leonidion Houses' },
    kind: { el: 'Booking καταλυμάτων', en: 'Property booking', fr: 'Réservation de logements' },
    description: {
      el: 'Κρατήσεις για 6 καταλύματα, με online πληρωμές και admin panel.',
      en: 'Bookings for 6 properties, with online payments and an admin panel.',
      fr: 'Réservations pour 6 logements, avec paiements en ligne et panneau admin.',
    },
    tags: ['Booking', 'Payments'],
    url: 'https://www.leonidionhouses.com/',
    image: leonidionHousesImg,
    commerce: true,
  },
  {
    key: 'clinic',
    title: {
      el: 'Διαδικτυακό Ιατρείο Γονέων και Εφήβων',
      en: 'Online Parent & Teen Clinic',
      fr: 'Clinique en ligne Parents et Ados',
    },
    kind: { el: 'Τηλεϊατρική', en: 'Telemedicine', fr: 'Télémédecine' },
    description: {
      el: 'Συμβουλευτική για γονείς και εφήβους, με online ραντεβού.',
      en: 'Counselling for parents and teens, with online appointments.',
      fr: 'Consultations pour parents et adolescents, avec rendez-vous en ligne.',
    },
    tags: ['React', 'Booking'],
    url: 'https://onlineparentteenclinic.com/',
    image: clinicImg,
    commerce: true,
  },
  {
    key: 'architecture',
    title: {
      el: 'Αρχιτεκτονικό και Κατασκευαστικό Γραφείο',
      en: 'Architecture & Construction Office',
      fr: "Bureau d'architecture et de construction",
    },
    kind: { el: 'Εταιρική ιστοσελίδα', en: 'Company website', fr: "Site d'entreprise" },
    description: {
      el: 'Παρουσίαση υπηρεσιών και portfolio έργων, χτισμένη για SEO.',
      en: 'Services and project portfolio, built for SEO.',
      fr: 'Services et portfolio de projets, conçu pour le SEO.',
    },
    tags: ['React', 'SEO'],
    url: 'https://in-mavridis.gr/',
    image: architectureImg,
  },
  {
    key: 'wellness',
    title: { el: 'HydrogenLife', en: 'HydrogenLife', fr: 'HydrogenLife' },
    kind: { el: 'Κέντρο ευεξίας', en: 'Wellness center', fr: 'Centre de bien-être' },
    description: {
      el: 'Κέντρο ευεξίας με παρουσίαση υπηρεσιών και online κρατήσεις.',
      en: 'Wellness center with services and online bookings.',
      fr: 'Centre de bien-être avec services et réservations en ligne.',
    },
    tags: ['Booking', 'CMS'],
    url: 'https://hydrogenlife.eu/',
    image: hydrogenImg,
    commerce: true,
  },
  {
    key: 'hotel',
    title: { el: 'Serenity Hotel', en: 'Serenity Hotel', fr: 'Serenity Hotel' },
    kind: { el: 'Ξενοδοχείο', en: 'Hotel', fr: 'Hôtel' },
    description: {
      el: 'Ξενοδοχείο με gallery δωματίων και online κρατήσεις.',
      en: 'Hotel with a room gallery and online bookings.',
      fr: 'Hôtel avec galerie de chambres et réservations en ligne.',
    },
    tags: ['React', 'Booking'],
    url: 'https://serenity-hotel-lux.netlify.app/',
    image: hotelImg,
    commerce: true,
  },
  {
    key: 'jewelry',
    title: { el: 'Κοσμηματοπωλείο Πολυτελείας', en: 'Luxury Jewelry Store', fr: 'Joaillerie de luxe' },
    kind: { el: 'E-shop', en: 'E-shop', fr: 'E-shop' },
    description: {
      el: 'E-shop για κοσμήματα και ρολόγια πολυτελείας.',
      en: 'E-shop for luxury jewelry and watches.',
      fr: 'E-shop de bijoux et montres de luxe.',
    },
    tags: ['E-commerce', 'Luxury'],
    url: 'https://stsrr.netlify.app/',
    image: jewelsImg,
    commerce: true,
  },
  {
    key: 'handmadeBags',
    title: { el: 'HANDSTUFF', en: 'HANDSTUFF', fr: 'HANDSTUFF' },
    kind: { el: 'E-shop', en: 'E-shop', fr: 'E-shop' },
    description: {
      el: 'E-shop για χειροποίητες δερμάτινες τσάντες.',
      en: 'E-shop for handmade leather bags.',
      fr: 'E-shop de sacs en cuir faits main.',
    },
    tags: ['E-commerce', 'Branding'],
    url: 'https://idyllic-mermaid-415d9f.netlify.app/',
    image: bagImg,
    commerce: true,
  },
  {
    key: 'crypto',
    title: { el: 'Panitos CryptoCoin', en: 'Panitos CryptoCoin', fr: 'Panitos CryptoCoin' },
    kind: { el: 'Landing page', en: 'Landing page', fr: 'Landing page' },
    description: {
      el: 'Landing page με animations για custom κρυπτονόμισμα.',
      en: 'Animated landing page for a custom cryptocurrency.',
      fr: 'Landing page animée pour une cryptomonnaie sur mesure.',
    },
    tags: ['Landing', 'Animation'],
    url: 'https://panitoscryptocoin.com/',
    image: cryptoImg,
  },
  {
    key: 'blog',
    title: { el: 'Blog Ευ Ζην', en: 'Wellbeing Blog', fr: 'Blog Bien-être' },
    kind: { el: 'Blog', en: 'Blog', fr: 'Blog' },
    description: {
      el: 'Blog με άρθρα για υγιεινή ζωή και προσωπική ανάπτυξη.',
      en: 'Blog with articles on healthy living and personal growth.',
      fr: 'Blog sur la vie saine et le développement personnel.',
    },
    tags: ['Blog', 'Content'],
    url: 'https://clever-peony-930036.netlify.app/',
    image: wellbeingImg,
  },
];

export interface AppProject {
  key: string;
  name: string;
  logo: string;
  tagline: L;
  description: L;
  features: Record<Lang, string[]>;
  badges?: Record<Lang, string[]>;
  ios?: string;
  android?: string;
  web?: string;
  screens: { src: string; alt: string }[];
  /** tailwind class for the feature bullet colour */
  dot: string;
}

export const appProjects: AppProject[] = [
  {
    key: 'lifemuseum',
    name: 'LifeMuseum',
    logo: lmIcon,
    tagline: {
      el: 'Η ζωή σου, σαν μουσείο.',
      en: 'Your life, like a museum.',
      fr: 'Votre vie, comme un musée.',
    },
    description: {
      el: 'Κάθε στιγμή που μέτρησε γίνεται έκθεμα. Τη βρίσκεις σε δευτερόλεπτα και βλέπεις τη χρονιά σου σαν ταινία.',
      en: 'Every moment that mattered becomes an exhibit. Find it in seconds and watch your year as a film.',
      fr: 'Chaque moment qui a compté devient une pièce de musée. Retrouvez-le en quelques secondes et regardez votre année comme un film.',
    },
    features: {
      el: ['Εκθέματα και γκαλερί', 'Χρονολόγιο ζωής', 'Ταινίες αναμνήσεων', 'Λειτουργεί και offline'],
      en: ['Exhibits and galleries', 'Life timeline', 'Memory films', 'Works offline too'],
      fr: ['Pièces et galeries', 'Chronologie de vie', 'Films de souvenirs', 'Fonctionne aussi hors ligne'],
    },
    ios: 'https://apps.apple.com/us/app/lifemuseum/id6799032000',
    android: 'https://play.google.com/store/apps/details?id=com.lifemuseum.app',
    web: 'https://lifemuseumapp.com/',
    screens: [
      { src: lmHome, alt: 'LifeMuseum: home' },
      { src: lmWings, alt: 'LifeMuseum: galleries' },
      { src: lmExhibit, alt: 'LifeMuseum: exhibit' },
      { src: lmJourney, alt: 'LifeMuseum: journey' },
      { src: lmStats, alt: 'LifeMuseum: stats' },
    ],
    dot: 'bg-amber-soft',
  },
  {
    key: 'tparking',
    name: 'T-Parking',
    logo: tparkingLogo,
    tagline: {
      el: 'Βρες parking στον δρόμο, σε πραγματικό χρόνο.',
      en: 'Find street parking, in real time.',
      fr: 'Trouvez une place dans la rue, en temps réel.',
    },
    description: {
      el: 'Η πρώτη εφαρμογή στην Ελλάδα που δείχνει ελεύθερες θέσεις στον δρόμο. Δωρεάν, με πόντους και κουπόνια.',
      en: 'The first app in Greece that shows free street parking spots. Free to use, with points and coupons.',
      fr: 'La première application en Grèce qui montre les places libres dans la rue. Gratuite, avec points et coupons.',
    },
    features: {
      el: ['Χάρτης θέσεων real-time', 'Πλοήγηση με ένα tap', 'Πόντοι και κουπόνια', 'Ειδοποιήσεις για κοντινές θέσεις'],
      en: ['Real-time spot map', 'One-tap navigation', 'Points and coupons', 'Alerts for nearby spots'],
      fr: ['Carte des places en temps réel', 'Navigation en un geste', 'Points et coupons', 'Alertes pour les places proches'],
    },
    badges: {
      el: ['1η στην Ελλάδα', 'Real-time', '100% δωρεάν'],
      en: ['1st in Greece', 'Real-time', '100% free'],
      fr: ['1re en Grèce', 'Temps réel', '100% gratuite'],
    },
    ios: 'https://apps.apple.com/gr/app/t-parking/id6756634872',
    android: 'https://play.google.com/store/apps/details?id=com.tparking.app',
    web: 'https://t-parking.com/',
    screens: [
      { src: tparkingMap, alt: 'T-Parking: map' },
      { src: tparkingNavigation, alt: 'T-Parking: navigation' },
      { src: tparkingAwards, alt: 'T-Parking: rewards' },
      { src: tparkingHistory, alt: 'T-Parking: history' },
    ],
    dot: 'bg-signal',
  },
  {
    key: 'getfit',
    name: 'GetFit',
    logo: logoGymImg,
    tagline: {
      el: 'Το γυμναστήριο στο κινητό.',
      en: 'The gym in your pocket.',
      fr: 'La salle de sport dans la poche.',
    },
    description: {
      el: 'Εφαρμογή γυμναστηρίου: μέλη, προγράμματα, ραντεβού και πληρωμές σε ένα σημείο.',
      en: 'Gym app: members, programs, bookings and payments in one place.',
      fr: 'Application de salle de sport : membres, programmes, réservations et paiements au même endroit.',
    },
    features: {
      el: ['Διαχείριση μελών', 'Προγράμματα προπόνησης', 'Σύστημα ραντεβού', 'Αναφορές και στατιστικά'],
      en: ['Member management', 'Training programs', 'Booking system', 'Reports and stats'],
      fr: ['Gestion des membres', "Programmes d'entraînement", 'Système de réservation', 'Rapports et statistiques'],
    },
    ios: 'https://apps.apple.com/us/app/getfit-skg/id6753928093',
    web: 'https://getfitskg.com/',
    screens: [v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12].map((src, i) => ({
      src,
      alt: `GetFit: screen ${i + 1}`,
    })),
    dot: 'bg-iris',
  },
];

export const newSiteProjects = siteProjects.filter((p) => p.isNew);
