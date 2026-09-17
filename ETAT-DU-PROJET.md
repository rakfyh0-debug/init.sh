## État du projet — INIT.SH
Dernière mise à jour : 17 septembre 2026

### Décisions tranchées
- Nom du projet : INIT.SH
- Dépôt GitHub : rakfyh0-debug/init.sh (branche main)
- Relation avec Linux Master / technophile : projet distinct, aucune fusion, aucune réutilisation de code
- GitHub Pages activé : https://rakfyh0-debug.github.io/init.sh/
- Pas de téléphone à l'inscription
- Suppression de progression autorisée pour l'élève

### Étape en cours
LES 9 PAGES DE LA FEUILLE DE ROUTE SONT TOUTES CONSTRUITES ET FONCTIONNELLES.
Il ne reste plus de page à créer. Le chantier restant est le contenu, pas la structure :
rédiger le vrai contenu pédagogique des 11 modules encore en placeholder
(linux 2-6, web 1-6 — seul linux module 1 a du contenu réel).

### Fichiers validés, testés et poussés sur GitHub (site complet et fonctionnel)
- index.html, linux.html, web.html, projets.html, a-propos.html, auth.html, reset-password.html, membre.html, module.html, 404.html : les 10 pages (9 prévues + 404)
- js/ : auth.js, membre.js, module.js, nav-auth.js, reset-password.js, supabase-config.js, supabase-js.min.js (local), main.js (vide, non utilisé)
- data/linux-modules.json, data/web-modules.json : structure des 12 modules, module 1 Linux avec vrai contenu
- css/style.css : feuille de style complète pour tout le site
- README.md : présent
- ETAT-DU-PROJET.md : ce fichier, tenu à jour à chaque session

### Parcours utilisateur testé et validé de bout en bout
Inscription → email de confirmation → connexion → espace membre → choix formation →
module avec verrouillage → validation → progression sauvegardée → reprise cohérente
(Commencer/Continuer/Revoir) → mot de passe oublié → déconnexion. Page 404 personnalisée en place.

### Côté Supabase — fonctionnel
- Projet INIT.SH (région Europe), URL https://qjldkybaudufxtymixkq.supabase.co
- Tables profiles + progress avec RLS (6 policies), trigger on_auth_user_created

### Prochaine action prévue
Décider qui rédige le contenu des 11 modules restants (Rak seul ou avec assistance IA),
puis les écrire un par un dans data/linux-modules.json et data/web-modules.json,
sur le modèle du Module 1 Linux (champs "lesson" et "practice").

### Règles à ne jamais casser
- Progression strictement linéaire par formation (voir §5.2 de la feuille de route)
- RLS activée sur profiles et progress (voir §7.3)
- supabase-js chargé en local, jamais via CDN externe (voir §3.3)
- Aucun fichier régénéré en entier sans vérification préalable du contenu existant (voir §8.1)
- Aucune clé secrète dans le code côté client
- Avant de conclure à un bug de code : toujours tester en navigation privée pour écarter le cache navigateur

### Décisions encore en attente
- Hébergement des vidéos dans les modules
- Langue (100% français ou anglais technique ponctuel ?)
- Rédaction du contenu des 11 modules restants : Rak seul ou structuré avec assistance IA ?
- Validation des modules : bouton simple (actuel) ou mini-quiz plus tard ?
- Communauté : groupe WhatsApp/Telegram ou non ?
- Autres projets à ajouter sur projets.html
