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
Étapes 1 à 8 : TERMINÉES. Toutes les pages du site existent et fonctionnent de bout en bout.
Étape 9 : 404 personnalisée — reste à faire pour clore la liste des pages de la feuille de route.
Ensuite : rédaction du vrai contenu des modules 2 à 6 (linux) et 1 à 6 (web), actuellement en placeholder "en cours de rédaction".

### Fichiers validés, testés et poussés sur GitHub (site fonctionnel de bout en bout)
- index.html, linux.html, web.html, projets.html, a-propos.html : pages publiques avec nav-auth.js
- auth.html + js/auth.js : connexion/inscription
- reset-password.html + js/reset-password.js : testé de bout en bout
- membre.html + js/membre.js : tableau de bord, liens dynamiques Commencer/Continuer/Revoir selon la progression réelle
- module.html + js/module.js : moteur générique — vérifie le déverrouillage (module suivant = modules terminés + 1), affiche le contenu depuis data/*.json, écrit dans Supabase au clic "J'ai terminé", gère le doublon (code 23505) proprement, navigue vers le module suivant ou l'espace membre
- data/linux-modules.json : Module 1 avec vrai contenu (installation), modules 2-6 en placeholder
- data/web-modules.json : 6 modules en placeholder
- js/nav-auth.js, js/supabase-js.min.js, js/supabase-config.js : inchangés depuis la dernière session
- css/style.css : tous les styles jusqu'à module.html inclus
- README.md, js/main.js : créés mais vides

### Testé et confirmé par Rak (session du 17 septembre)
- Navigation manuelle sur tous les modules (linux 1-6, web 1-6) : verrouillage respecté
- Bouton "J'ai terminé ce module" : enregistrement Supabase + redirection fonctionnels
- Retour sur membre.html : bouton et progression mis à jour correctement (Commencer/Continuer/Revoir)

### Côté Supabase — inchangé, toujours fonctionnel
- Projet Supabase : INIT.SH (région Europe), URL https://qjldkybaudufxtymixkq.supabase.co
- Tables profiles + progress avec RLS (6 policies), trigger on_auth_user_created

### Prochaine action prévue
1. Construire 404.html (étape 9) : page d'erreur dans le style du site + lien vers l'accueil.
2. Ensuite : décider qui rédige le contenu des 11 modules restants (Rak seul ou avec assistance IA — décision encore ouverte) et le faire module par module en suivant le modèle du Module 1 Linux (lesson[] + practice[] dans le JSON correspondant).

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
- Rédaction du contenu des 11 modules restants : Rak seul ou structuré avec assistance IA ?
- Validation des modules : bouton simple (actuel) ou mini-quiz plus tard ?
- Communauté : groupe WhatsApp/Telegram ou non ?
- Autres projets à ajouter sur projets.html
