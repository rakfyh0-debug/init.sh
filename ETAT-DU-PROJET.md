## État du projet — INIT.SH
Dernière mise à jour : 17 septembre 2026

### Décisions tranchées
- Nom du projet : INIT.SH
- Dépôt GitHub : rakfyh0-debug/init.sh (branche main)
- Relation avec Linux Master / technophile : projet distinct, aucune fusion, aucune réutilisation de code
- GitHub Pages activé : https://rakfyh0-debug.github.io/init.sh/
- Pas de téléphone à l'inscription (aucun champ, ni formulaire ni table profiles)
- Suppression de progression autorisée pour l'élève
- Vidéos dans les modules : à trancher

### Étape en cours (voir §3.5 de la feuille de route)
Étape n° 7 (fin) : reset-password.html reste à créer pour clore l'étape Auth.
Étape n° 8 (Espace Membre) déjà réalisée en avance.

### Fichiers validés, testés et poussés sur GitHub
- index.html, linux.html, web.html, projets.html, a-propos.html : pages publiques, toutes avec nav-auth.js (bouton topbar adapté à la session)
- auth.html + js/auth.js : connexion/inscription, redirection auto si déjà connecté, plus de flash visuel au chargement
- membre.html + js/membre.js : tableau de bord, vérifie la session, charge profil + progression, déconnexion fonctionnelle
- js/nav-auth.js : script partagé, adapte dynamiquement le bouton topbar (Connexion / Mon espace) selon la session Supabase
- js/supabase-js.min.js, js/supabase-config.js : lib Supabase en local (vérifiée), clé publishable uniquement (pas de clé secrète)
- css/style.css : styles de base + page formation + page projets + page à propos + auth + correctif .btn pour les <button> natifs (bug de bouton "blanc" résolu)
- README.md, js/main.js : créés mais vides

### Bugs rencontrés et corrigés pendant la revue de cette session
- auth.js cherchait un id `auth-card` absent d'auth.html → ajouté, formulaire caché puis affiché après vérification de session (fin du flash)
- Topbar n'indiquait jamais l'état de connexion sur les pages publiques → nav-auth.js créé et intégré partout
- Bouton "Déconnexion" (membre.html) illisible (fond blanc, `<button>` natif non stylé) → .btn corrigé avec background/appearance neutres
- Plusieurs faux "bugs" étaient en réalité du cache navigateur (Ctrl+Shift+R ou navigation privée ont confirmé que le code était correct) — réflexe à garder : toujours tester en navigation privée avant de conclure à un bug de code

### Côté Supabase — créé et fonctionnel
- Projet Supabase : INIT.SH (région Europe), URL https://qjldkybaudufxtymixkq.supabase.co
- Table profiles : id, nom (not null), statut (gratuit/payant, default 'gratuit'), created_at
- Table progress : id, user_id, formation (linux/web), module_id (smallint 1..6), completed_at, unique(user_id, formation, module_id)
- RLS activée sur les deux tables (6 policies), trigger on_auth_user_created → handle_new_user()
- Auth : Email activé, Confirm email ON, testé de bout en bout (inscription → email de confirmation → connexion → membre.html)

### Prochaine action prévue
Créer reset-password.html + sa logique JS (resetPasswordForEmail de Supabase), pour clore complètement l'étape Auth.

### Règles à ne jamais casser
- Progression strictement linéaire par formation (voir §5.2 de la feuille de route)
- RLS activée sur profiles et progress (voir §7.3)
- supabase-js chargé en local, jamais via CDN externe (voir §3.3)
- Aucun fichier régénéré en entier sans vérification préalable du contenu existant (voir §8.1)
- Aucune clé secrète (service_role, secret) dans le code côté client — seule la clé publishable/anon est autorisée
- Avant de conclure à un bug de code : toujours tester en navigation privée pour écarter le cache navigateur

### Décisions encore en attente
- Hébergement des vidéos (vidéos dans les modules ou texte + images seulement ?)
- Langue (100% français ou anglais technique ponctuel ?)
- Rédaction du contenu : Rak seul ou structuré avec assistance IA ?
- Validation des modules : bouton simple ou mini-quiz plus tard ?
- Communauté : groupe WhatsApp/Telegram ou non ?
- Autres projets à ajouter sur projets.html (technophile ? autres ?)
