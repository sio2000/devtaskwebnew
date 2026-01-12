import { IconType } from 'react-icons';
import { FaGlobe, FaMobileAlt, FaRobot, FaUsers, FaVideo, FaSearch, FaPhotoVideo, FaPalette, FaDatabase, FaBrain, FaShoppingCart, FaGamepad } from 'react-icons/fa';

export interface Service {
  slug: string;
  title: { el: string; en: string; fr: string };
  shortDescription: { el: string; en: string; fr: string };
  description: { el: string; en: string; fr: string };
  icon: IconType;
  breadcrumbs: { el: string[]; en: string[]; fr: string[] };
  features?: { el: string[] };
  visual?: string; // asset filename ή animation key
  ctaText?: { el: string };
}

export const servicesData: Service[] = [
  {
    slug: 'web-development',
    title: {
      el: 'Κατασκευή Ιστοσελίδων & Web Εφαρμογών',
      en: 'Website & Web App Development',
      fr: 'Développement de Sites Web & Applications Web'
    },
    shortDescription: {
      el: 'Responsive ιστοσελίδες & web apps με σύγχρονες τεχνολογίες.',
      en: 'Responsive websites & web apps with modern tech.',
      fr: 'Sites web & applications web responsives avec technologies modernes.'
    },
    description: {
      el: 'Σχεδιάζω και υλοποιώ πλήρως responsive ιστοσελίδες και web εφαρμογές με σύγχρονες τεχνολογίες front-end και back-end.',
      en: 'I design and implement fully responsive websites and web applications using modern front-end and back-end technologies.',
      fr: 'Je conçois et implémente des sites web et applications web entièrement responsives utilisant des technologies front-end et back-end modernes.'
    },
    icon: FaGlobe,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Κατασκευή Ιστοσελίδων & Web Εφαρμογών'],
      en: ['Services', 'Website & Web App Development'],
      fr: ['Services', 'Développement de Sites Web & Applications Web']
    },
    features: {
      el: [
        'Πλήρως προσαρμοσμένη σχεδίαση για κάθε επαγγελματία',
        'Υψηλή ταχύτητα φόρτωσης & βελτιστοποίηση SEO',
        'Ασφαλής και προσβάσιμη εμπειρία χρήστη',
        'Εύκολη διαχείριση περιεχομένου',
        'Υποστήριξη για e-shop, blog, portfolio και πολλά άλλα'
      ]
    },
    visual: 'architecture.png',
    ctaText: { el: 'Ζητήστε Προσφορά' },
  },
  {
    slug: 'mobile-app-development',
    title: {
      el: 'Κατασκευή Mobile Εφαρμογών',
      en: 'Mobile App Development',
      fr: 'Développement d\'Applications Mobiles'
    },
    shortDescription: {
      el: 'Mobile apps για Android & iOS με έμφαση στο UX.',
      en: 'Mobile apps for Android & iOS with great UX.',
      fr: 'Applications mobiles pour Android & iOS avec un excellent UX.'
    },
    description: {
      el: 'Δημιουργώ mobile εφαρμογές για Android και iOS με έμφαση στη χρηστικότητα, την απόδοση και το user experience.',
      en: 'I create mobile apps for Android and iOS focusing on usability, performance, and user experience.',
      fr: 'Je crée des applications mobiles pour Android et iOS en me concentrant sur la facilité d\'utilisation, les performances et l\'expérience utilisateur.'
    },
    icon: FaMobileAlt,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Κατασκευή Mobile Εφαρμογών'],
      en: ['Services', 'Mobile App Development'],
      fr: ['Services', 'Développement d\'Applications Mobiles']
    },
    features: {
      el: [
        'Native & cross-platform εφαρμογές για Android & iOS',
        'Εντυπωσιακό UI/UX design',
        'Γρήγορη απόκριση και σταθερότητα',
        'Ενσωμάτωση με APIs, push notifications, χάρτες',
        'Mockups & previews πριν την υλοποίηση'
      ]
    },
    visual: 'smartphone.jpg',
    ctaText: { el: 'Ζητήστε Προσφορά' },
  },
  {
    slug: 'chatbots-ai-agents',
    title: {
      el: 'Chatbots & AI Agents',
      en: 'Chatbots & AI Agents',
      fr: 'Chatbots & Agents IA'
    },
    shortDescription: {
      el: 'Έξυπνοι ψηφιακοί βοηθοί & conversational AI.',
      en: 'Smart digital assistants & conversational AI.',
      fr: 'Assistants numériques intelligents & IA conversationnelle.'
    },
    description: {
      el: 'Αναπτύσσω έξυπνους ψηφιακούς βοηθούς και conversational συστήματα με AI για αυτοματοποιημένη επικοινωνία και υποστήριξη πελατών.',
      en: 'I develop smart digital assistants and conversational systems using AI for automated customer communication and support.',
      fr: 'Je développe des assistants numériques intelligents et des systèmes conversationnels utilisant l\'IA pour la communication et le support clients automatisés.'
    },
    icon: FaRobot,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Chatbots & AI Agents'],
      en: ['Services', 'Chatbots & AI Agents'],
      fr: ['Services', 'Chatbots & Agents IA']
    },
    features: {
      el: [
        'Αυτόματη εξυπηρέτηση πελατών 24/7',
        'Εξατομικευμένες απαντήσεις με AI',
        'Ενσωμάτωση σε ιστοσελίδες & εφαρμογές',
        'Ανάλυση συνομιλιών & στατιστικά',
        'Αύξηση παραγωγικότητας και αυτοματοποίηση διαδικασιών'
      ]
    },
    visual: 'chatbot.png',
    ctaText: { el: 'Επικοινωνήστε' },
  },
  {
    slug: 'social-media-management',
    title: {
      el: 'Διαχείριση Social Media',
      en: 'Social Media Management',
      fr: 'Gestion des Réseaux Sociaux'
    },
    shortDescription: {
      el: 'Στρατηγική & καθημερινή διαχείριση social προφίλ.',
      en: 'Strategic & daily management of social profiles.',
      fr: 'Gestion stratégique & quotidienne des profils sociaux.'
    },
    description: {
      el: 'Στρατηγική και καθημερινή διαχείριση προφίλ σε Facebook, Instagram, LinkedIn και άλλα.',
      en: 'Strategic and daily management of profiles on Facebook, Instagram, LinkedIn, and more.',
      fr: 'Gestion stratégique et quotidienne des profils sur Facebook, Instagram, LinkedIn et plus encore.'
    },
    icon: FaUsers,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Διαχείριση Social Media'],
      en: ['Services', 'Social Media Management'],
      fr: ['Services', 'Gestion des Réseaux Sociaux']
    },
    features: {
      el: [
        'Στρατηγικός σχεδιασμός περιεχομένου',
        'Καθημερινή ανάρτηση & διαχείριση προφίλ',
        'Ανάλυση στατιστικών & αναφορών',
        'Αλληλεπίδραση με το κοινό',
        'Δημιουργία δυναμικών καμπανιών με emojis & visuals'
      ]
    },
    visual: 'social-icons',
    ctaText: { el: 'Ζητήστε Προσφορά' },
  },
  {
    slug: 'video-animation-production',
    title: {
      el: 'Παραγωγή Video & Animation',
      en: 'Video & Animation Production',
      fr: 'Production Vidéo & Animation'
    },
    shortDescription: {
      el: 'Βίντεο & animations για προώθηση, εκπαίδευση ή διαφήμιση.',
      en: 'Videos & animations for promo, education, or ads.',
      fr: 'Vidéos & animations pour promotion, éducation ou publicité.'
    },
    description: {
      el: 'Δημιουργία και επεξεργασία βίντεο και animations για προωθητική, εκπαιδευτική ή εμπορική χρήση.',
      en: 'Creation and editing of videos and animations for promotional, educational, or commercial use.',
      fr: 'Création et édition de vidéos et animations pour usage promotionnel, éducatif ou commercial.'
    },
    icon: FaVideo,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Παραγωγή Video & Animation'],
      en: ['Services', 'Video & Animation Production'],
      fr: ['Services', 'Production Vidéo & Animation']
    }
  },
  {
    slug: 'seo-website-optimization',
    title: {
      el: 'SEO – Βελτιστοποίηση Ιστοσελίδων',
      en: 'SEO – Website Optimization',
      fr: 'SEO – Optimisation de Site Web'
    },
    shortDescription: {
      el: 'Βελτίωση κατάταξης με τεχνικό SEO & περιεχόμενο.',
      en: 'Improve site ranking with technical SEO & content.',
      fr: 'Améliorer le classement avec SEO technique & contenu.'
    },
    description: {
      el: 'Βελτιώνω την κατάταξη της ιστοσελίδας σας στις μηχανές αναζήτησης (π.χ. Google) με τεχνικό SEO και στρατηγικές περιεχομένου.',
      en: 'Improve site ranking in search engines (e.g., Google) through technical SEO and content strategies.',
      fr: 'J\'améliore le classement de votre site web dans les moteurs de recherche (ex. Google) grâce au SEO technique et aux stratégies de contenu.'
    },
    icon: FaSearch,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'SEO – Βελτιστοποίηση Ιστοσελίδων'],
      en: ['Services', 'SEO – Website Optimization'],
      fr: ['Services', 'SEO – Optimisation de Site Web']
    },
    features: {
      el: [
        'Τεχνικό SEO & βελτιστοποίηση ταχύτητας',
        'Βελτίωση κατάταξης σε Google & Bing',
        'Αναλυτικά reports πριν/μετά',
        'Διόρθωση metadata & accessibility',
        'Συνεχής παρακολούθηση & υποστήριξη'
      ]
    },
    visual: 'seo-graph',
    ctaText: { el: 'Ζητήστε SEO Audit' },
  },
  {
    slug: 'multimedia-content-creation',
    title: {
      el: 'Δημιουργία Multimedia Περιεχομένου',
      en: 'Multimedia Content Creation',
      fr: 'Création de Contenu Multimédia'
    },
    shortDescription: {
      el: 'Διαδραστικό περιεχόμενο, animations & βίντεο.',
      en: 'Interactive content, animations & videos.',
      fr: 'Contenu interactif, animations & vidéos.'
    },
    description: {
      el: 'Δημιουργώ διαδραστικό περιεχόμενο, animations και βίντεο για ιστοσελίδες, καμπάνιες και social media.',
      en: 'I create interactive content, animations, and videos for websites, campaigns, and social media.',
      fr: 'Je crée du contenu interactif, des animations et des vidéos pour sites web, campagnes et réseaux sociaux.'
    },
    icon: FaPhotoVideo,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Δημιουργία Multimedia Περιεχομένου'],
      en: ['Services', 'Multimedia Content Creation'],
      fr: ['Services', 'Création de Contenu Multimédia']
    }
  },
  {
    slug: 'ux-ui-design',
    title: {
      el: 'UX/UI Design',
      en: 'UX/UI Design',
      fr: 'Design UX/UI'
    },
    shortDescription: {
      el: 'Φιλικά & αποδοτικά interfaces.',
      en: 'User-friendly & efficient interfaces.',
      fr: 'Interfaces conviviales & efficaces.'
    },
    description: {
      el: 'Σχεδιάζω φιλικά προς τον χρήστη και αποδοτικά interfaces με έμφαση στη χρηστικότητα και την εμπειρία.',
      en: 'I design user-friendly and efficient interfaces with a strong focus on usability and experience.',
      fr: 'Je conçois des interfaces conviviales et efficaces avec un accent fort sur la facilité d\'utilisation et l\'expérience.'
    },
    icon: FaPalette,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'UX/UI Design'],
      en: ['Services', 'UX/UI Design'],
      fr: ['Services', 'Design UX/UI']
    },
    features: {
      el: [
        'Σχεδιασμός με βάση την εμπειρία χρήστη',
        'Mockups & interactive prototypes',
        'Σύγχρονα design systems',
        'Αισθητική και λειτουργικότητα',
        'User flows & animations για καλύτερη πλοήγηση'
      ]
    },
    visual: 'UI.png',
    ctaText: { el: 'Ζητήστε Demo' },
  },
  {
    slug: 'database-cloud-infrastructure',
    title: {
      el: 'Βάσεις Δεδομένων & Cloud Υποδομές',
      en: 'Database & Cloud Infrastructure',
      fr: 'Bases de Données & Infrastructure Cloud'
    },
    shortDescription: {
      el: 'Ασφαλείς, επεκτάσιμες λύσεις βάσεων & cloud.',
      en: 'Secure, scalable database & cloud solutions.',
      fr: 'Solutions de bases de données & cloud sécurisées et évolutives.'
    },
    description: {
      el: 'Διαχειρίζομαι βάσεις δεδομένων και υλοποιώ ασφαλείς, επεκτάσιμες cloud-based λύσεις.',
      en: 'I manage databases and implement secure, scalable cloud-based solutions.',
      fr: 'Je gère les bases de données et implémente des solutions cloud sécurisées et évolutives.'
    },
    icon: FaDatabase,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Βάσεις Δεδομένων & Cloud Υποδομές'],
      en: ['Services', 'Database & Cloud Infrastructure'],
      fr: ['Services', 'Bases de Données & Infrastructure Cloud']
    }
  },
  {
    slug: 'ai-integration-applications',
    title: {
      el: 'Ενσωμάτωση AI σε Εφαρμογές',
      en: 'AI Integration in Applications',
      fr: 'Intégration IA dans les Applications'
    },
    shortDescription: {
      el: 'ML για ανάλυση δεδομένων, προβλέψεις & smart apps.',
      en: 'ML for data analysis, predictions & smart apps.',
      fr: 'ML pour analyse de données, prédictions & applications intelligentes.'
    },
    description: {
      el: 'Χρησιμοποιώ τεχνικές machine learning για ανάλυση δεδομένων, προβλέψεις ή δημιουργία έξυπνων λειτουργιών σε εφαρμογές.',
      en: 'I use machine learning techniques to analyze data, generate predictions, or create smart app functionalities.',
      fr: 'J\'utilise des techniques de machine learning pour analyser les données, générer des prédictions ou créer des fonctionnalités d\'applications intelligentes.'
    },
    icon: FaBrain,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Ενσωμάτωση AI σε Εφαρμογές'],
      en: ['Services', 'AI Integration in Applications'],
      fr: ['Services', 'Intégration IA dans les Applications']
    },
    features: {
      el: [
        'Συστάσεις προϊόντων με AI',
        'Ανάλυση δεδομένων & προβλέψεις',
        'Αυτοματισμοί για επιχειρήσεις',
        'Ενσωμάτωση σε υπάρχουσες εφαρμογές',
        'Ασφαλής διαχείριση δεδομένων'
      ]
    },
    visual: 'ai.png',
    ctaText: { el: 'Επικοινωνήστε' },
  },
  {
    slug: 'ecommerce-development',
    title: {
      el: 'Κατασκευή E-shop',
      en: 'E-commerce Development',
      fr: 'Développement E-commerce'
    },
    shortDescription: {
      el: 'Λειτουργικά, responsive e-shops για κάθε επιχείρηση.',
      en: 'Functional, responsive e-shops for all businesses.',
      fr: 'Boutiques en ligne fonctionnelles et responsives pour toutes les entreprises.'
    },
    description: {
      el: 'Κατασκευάζω πλήρως λειτουργικά και responsive e-shops για κάθε τύπο επιχείρησης.',
      en: 'I build fully functional and responsive e-shops for businesses of all types.',
      fr: 'Je construis des boutiques en ligne entièrement fonctionnelles et responsives pour tous types d\'entreprises.'
    },
    icon: FaShoppingCart,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Κατασκευή E-shop'],
      en: ['Services', 'E-commerce Development'],
      fr: ['Services', 'Développement E-commerce']
    },
    features: {
      el: [
        'Πλήρης διαχείριση προϊόντων & παραγγελιών',
        'Ασφαλείς πληρωμές & checkout animations',
        'Responsive design για κάθε συσκευή',
        'Ενσωμάτωση με ERP, CRM, social media',
        'Εύκολη επέκταση & υποστήριξη'
      ]
    },
    visual: 'ecommerce.jpg',
    ctaText: { el: 'Ξεκινήστε το E-Shop σας σήμερα' },
  },
  {
    slug: 'game-development',
    title: {
      el: 'Game Development',
      en: 'Game Development',
      fr: 'Développement de Jeux'
    },
    shortDescription: {
      el: 'Διαδραστικά παιχνίδια για web, desktop & mobile.',
      en: 'Interactive games for web, desktop & mobile.',
      fr: 'Jeux interactifs pour web, desktop & mobile.'
    },
    description: {
      el: 'Αναπτύσσω διαδραστικά παιχνίδια για web, desktop και mobile πλατφόρμες με σύγχρονα frameworks και engines.',
      en: 'I develop interactive games for web, desktop, and mobile platforms using modern frameworks and engines.',
      fr: 'Je développe des jeux interactifs pour plateformes web, desktop et mobiles utilisant des frameworks et moteurs modernes.'
    },
    icon: FaGamepad,
    breadcrumbs: {
      el: ['Υπηρεσίες', 'Game Development'],
      en: ['Services', 'Game Development'],
      fr: ['Services', 'Développement de Jeux']
    }
  }
]; 