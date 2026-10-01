# SEO: τι έγινε στον κώδικα και τι πρέπει να κάνεις εσύ

Ημερομηνία: 30/09/2026. Τίποτα δεν έχει γίνει commit ή push.

## 1. Τι υπάρχει πλέον έτοιμο στον κώδικα

| Τι | Πού | Γιατί |
|---|---|---|
| Ξεχωριστό title, description, canonical, Open Graph για κάθε σελίδα | `src/components/Seo.tsx`, `src/App.tsx` | Κάθε URL έχει δικό του αποτέλεσμα στη Google |
| Στατικό HTML ανά σελίδα στο build (15 αρχεία) | `scripts/prerender-meta.mjs` | Το site είναι SPA. Όσοι crawlers δεν τρέχουν JavaScript (AI μηχανές, social previews) έβλεπαν παντού την αρχική |
| Νέα σελίδα `/portfolio` | `src/App.tsx` | Σελίδα που στοχεύει σε αναζητήσεις για έργα και δείγματα |
| Σελίδα 404 με `noindex` | `src/components/NotFound.tsx` | Τα λάθος URL δεν μπαίνουν στο ευρετήριο |
| Structured data: Organization, ProfessionalService, WebSite, υπηρεσίες, λίστα έργων, FAQ | `index.html` | Η Google και οι AI μηχανές καταλαβαίνουν ποιος είσαι και τι έχεις φτιάξει |
| Service + Breadcrumb schema ανά σελίδα υπηρεσίας | prerender script + `SchemaMarkup.tsx` | Breadcrumbs στα αποτελέσματα |
| `sitemap.xml` με `/portfolio` και νέες ημερομηνίες | `public/sitemap.xml` | |
| `llms.txt` με όλα τα νέα έργα | `public/llms.txt` | Για ChatGPT, Perplexity, Claude |
| Νέα εικόνα κοινοποίησης 1200x630 | `public/og-cover.jpg` | Σωστή προεπισκόπηση σε Facebook, LinkedIn, Viber |
| Εικόνες έργων σε WebP (περίπου 20 MB έγιναν 1 MB) | `src/assets/work/` | Ταχύτητα, Core Web Vitals |
| Ένα μόνο H1 ανά σελίδα | `LoadingScreen.tsx` | Το splash είχε δεύτερο H1 |

Αφαιρέθηκε το `SearchAction` από το schema, γιατί το site δεν έχει αναζήτηση.

## 2. Αμέσως μετά το deploy: 3 έλεγχοι (5 λεπτά)

1. Άνοιξε `view-source:https://devtaskhub.com/services/web-development`.
   Ο τίτλος πρέπει να γράφει «Κατασκευή Ιστοσελίδων Θεσσαλονίκη | React, Next.js | DevTaskHub» και όχι τον τίτλο της αρχικής.
   Αν γράφει της αρχικής, το Netlify δεν σερβίρει τα prerendered αρχεία. Στείλε μου το και το διορθώνω.
2. Άνοιξε `https://devtaskhub.com/sitemap.xml` και `https://devtaskhub.com/llms.txt`. Πρέπει να ανοίγουν.
3. Βάλε την αρχική στο https://search.google.com/test/rich-results . Πρέπει να δείξει έγκυρα στοιχεία χωρίς σφάλματα.

## 3. Google Search Console (το πιο σημαντικό)

Διεύθυνση: https://search.google.com/search-console

**Βήμα 1. Πρόσθεσε την ιδιοκτησία**
- «Προσθήκη ιδιοκτησίας» και διάλεξε **Τομέας (Domain)**. Γράψε `devtaskhub.com`.
- Η Google σου δίνει μια εγγραφή TXT (`google-site-verification=...`).
- Netlify → Domains → devtaskhub.com → DNS records → Add new record. Type `TXT`, Name `@`, Value η εγγραφή της Google.
- Γύρνα στο Search Console και πάτα «Επαλήθευση». Μπορεί να χρειαστούν μερικά λεπτά.

Αν προτιμάς τη μέθοδο «Ετικέτα HTML», υπάρχει έτοιμη θέση στο `index.html` (ψάξε `google-site-verification`).

**Βήμα 2. Στείλε το sitemap**
- Αριστερά «Sitemaps». Γράψε `sitemap.xml` και πάτα «Υποβολή».

**Βήμα 3. Ζήτα ευρετηρίαση για τις βασικές σελίδες**
Πάνω στη γραμμή «Έλεγχος URL» βάλε ένα ένα τα παρακάτω και πάτα «Αίτημα ευρετηρίασης» (υπάρχει όριο περίπου 10 την ημέρα):
- `https://devtaskhub.com/`
- `https://devtaskhub.com/portfolio`
- `https://devtaskhub.com/services/web-development`
- `https://devtaskhub.com/services/mobile-app-development`
- `https://devtaskhub.com/services/ecommerce-development`
- `https://devtaskhub.com/services/seo-website-optimization`
- `https://devtaskhub.com/services/chatbots-ai-agents`

**Βήμα 4. Τι κοιτάς μετά από 1 εβδομάδα**
- «Σελίδες»: πόσες είναι στο ευρετήριο και γιατί κάποιες όχι.
- «Απόδοση»: με ποιες αναζητήσεις εμφανίζεσαι. Αυτές είναι οι πραγματικές λέξεις-κλειδιά σου.
- «Βασικές μετρήσεις ιστού» και «Βελτιώσεις»: σφάλματα σε breadcrumbs ή FAQ.

## 4. Google Business Profile (για αναζητήσεις «Θεσσαλονίκη»)

Διεύθυνση: https://business.google.com

Για τοπικές αναζητήσεις όπως «κατασκευή ιστοσελίδων Θεσσαλονίκη» μετράει περισσότερο από οτιδήποτε στον κώδικα.

- Κατηγορία: «Σχεδιαστής ιστοτόπων». Δεύτερη: «Εταιρεία λογισμικού».
- Περιοχή εξυπηρέτησης: Θεσσαλονίκη και όλη η Ελλάδα.
- Ίδια ακριβώς στοιχεία με το site: τηλέφωνο `+30 697 198 2563`, email `info@devtaskhub.com`, site `https://devtaskhub.com/`.
- Ανέβασε το logo και στιγμιότυπα έργων (LifeMuseum, Hournook, T-Parking).
- Ζήτα κριτική από κάθε πελάτη που παραδίδεις. Οι κριτικές ανεβάζουν την κατάταξη στον χάρτη.

Όταν έχεις το link του προφίλ, πρόσθεσέ το στο `sameAs` του Organization στο `index.html`.

## 5. Bing Webmaster Tools (2 λεπτά)

Διεύθυνση: https://www.bing.com/webmasters

Πάτα «Import from Google Search Console». Το Bing τροφοδοτεί και την αναζήτηση του ChatGPT και του Copilot.

## 6. Links από τα δικά σου έργα

Τα links από άλλα sites είναι ο δεύτερος πιο σημαντικός παράγοντας.

- Σε κάθε site πελάτη, στο footer: «Κατασκευή: DevTaskHub» με link στο `https://devtaskhub.com/`. Το KLINARITI το έχει ήδη.
- Βάλε το ίδιο σε Hournook, Lumora και LifeMuseum (είναι δικά σου, άρα το αποφασίζεις εσύ).
- Καταχώρισε την επιχείρηση σε: Χρυσός Οδηγός (xo.gr), vrisko.gr, 11888.gr, Clutch.co, GoodFirms.
- Στα προφίλ Instagram, TikTok, Facebook να υπάρχει το link του site.

## 7. Έλεγχος κοινοποίησης

- Facebook: https://developers.facebook.com/tools/debug/ . Βάλε το URL και πάτα «Scrape Again» για να πάρει τη νέα εικόνα.
- LinkedIn: https://www.linkedin.com/post-inspector/

## 8. Όταν προσθέτεις νέο έργο

1. Στιγμιότυπο σε `src/assets/work/` (WebP, πλάτος 1200).
2. Μία εγγραφή στο `src/data/work.ts`. Εμφανίζεται αυτόματα στην αρχική, στο `/portfolio`, στις σελίδες υπηρεσιών και στο hero.
3. Μία γραμμή στο `public/llms.txt` και ένα στοιχείο στη λίστα `#work` του `index.html`.
4. Άλλαξε το `lastmod` στο `public/sitemap.xml`.

## 9. Τι δεν έχει γίνει (χρειάζεται δική σου απόφαση)

- **Ξεχωριστά URL ανά γλώσσα** (`/en`, `/fr`). Τώρα η γλώσσα αλλάζει στο ίδιο URL, άρα η Google βλέπει μόνο τα ελληνικά. Αν θες πελάτες από το εξωτερικό, αυτό είναι το επόμενο βήμα.
- **Blog ή άρθρα**. Για να ανέβεις σε περισσότερες αναζητήσεις χρειάζεται περιεχόμενο, π.χ. «Πόσο κοστίζει ένα e-shop το 2026».
- **Κείμενα στις 11 σελίδες υπηρεσιών**. Συμπυκνώθηκαν μόνο τα κείμενα της αρχικής και των έργων.
