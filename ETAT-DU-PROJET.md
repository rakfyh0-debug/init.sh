## État du projet — INIT.SH
Dernière mise à jour : 17 septembre 2026

### Décisions tranchées
- Nom du projet : INIT.SH
- Dépôt GitHub : rakfyh0-debug/init.sh (branche main)
- Relation avec Linux Master / technophile : projet distinct, aucune fusion, aucune réutilisation de code
- GitHub Pages activé : https://rakfyh0-debug.github.io/init.sh/
- Pas de téléphone à l'inscription
- Suppression de progression autorisée pour l'élève
- Vidéos dans les modules : à trancher

### Étape en cours (voir §3.5 de la feuille de route)
Étape n° 7 : TERMINÉE (Auth + Espace membre + reset-password, tout validé et testé de bout en bout)
Étape n° 8 : Page Module (module.html) + système de progression — à commencer

### Fichiers validés, testés et poussés sur GitHub
- index.html, linux.html, web.html, projets.html, a-propos.html : pages publiques avec nav-auth.js
- auth.html + js/auth.js : connexion/inscription, redirection auto si déjà connecté
- reset-password.html + js/reset-password.js : demande de lien + changement de mot de passe, testé de bout en bout (email reçu, lien fonctionnel, reconnexion avec le nouveau mot de passe confirmée)
- membre.html + js/membre.js : tableau de bord, session, profil, progression, déconnexion
- js/nav-auth.js : bouton topbar adapté à la session sur toutes les pages publiques
- js/supabase-js.min.js, js/supabase-config.js : lib en local, clé publishable uniquement
- css/style.css : tous les styles jusqu'à auth inclus
- README.md, js/main.js : créés mais vides

### Côté Supabase — créé et fonctionnel
- Projet Supabase : INIT.SH (région Europe), URL https://qjldkybaudufxtymixkq.supabase.co
- Table profiles (id, nom, statut, created_at) + table progress (id, user_id, formation, module_id, completed_at)
- RLS activée sur les deux tables (6 policies), trigger on_auth_user_created
- Auth : Email + Confirm email ON + reset password fonctionnel de bout en bout

### Dernière action effectuée
Page reset-password.html construite, testée en conditions réelles (email reçu, redirection, changement de mot de passe effectif), commitée et poussée.

### Prochaine action prévue
Construire module.html (étape 8) : en-tête (formation/numéro/progression), contenu de leçon, zone de pratique, bouton "J'ai terminé ce module" qui écrit dans la table progress et débloque le module suivant. Commencer par le Module 1 de Linux Pratique comme modèle.

### Règles à ne jamais casser
- Progression strictement linéaire par formation (voir §5.2)
- RLS activée sur profiles et progress (voir §7.3)
- supabase-js chargé en local, jamais via CDN externe (voir §3.3)
- Aucun fichier régénéré en entier sans vérification préalable du contenu existant (voir §8.1)
- Aucune clé secrète dans le code côté client
- Avant de conclure à un bug de code : toujours tester en navigation privée pour écarter le cache navigateur

### Décisions encore en attente
- Hébergement des vidéos dans les modules
- Langue (100% français ou anglais technique ponctuel ?)
- Rédaction du contenu : Rak seul ou structuré avec assistance IA ?
- Validation des modules : bouton simple ou mini-quiz plus tard ?
- Communauté : groupe WhatsApp/Telegram ou non ?
- Autres projets à ajouter sur projets.html
