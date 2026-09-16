## État du projet — INIT.SH
Dernière mise à jour : 16 septembre 2026

### Décisions tranchées
- Nom du projet : INIT.SH
- Dépôt GitHub : rakfyh0-debug/init.sh (branche main)
- Relation avec Linux Master / technophile : projet distinct, aucune fusion, aucune réutilisation de code
- Vidéos dans les modules : à trancher
- Téléphone obligatoire à l'inscription : à trancher

### Étape en cours (voir §3.5 de la feuille de route)
Étape n° 3 : page Formation Linux (linux.html)

### Fichiers déjà créés et fonctionnels
- Structure de dossiers complète (css/, js/, assets/images/, assets/icons/, data/)
- index.html terminé : topbar, hero, section 2 formations, preuve sociale (RéviBF + TikTok), footer
- css/style.css terminé : thème sombre/vert, responsive, testé desktop + mobile
- README.md, js/main.js : créés mais vides

### Dernière action effectuée
Page Accueil (index.html + style.css) construite, testée en local (python3 -m http.server), validée, commitée et poussée sur GitHub

### Prochaine action prévue
Construire linux.html (étape 3) : en-tête formation, "pour qui", programme des 6 modules, résultats finaux, bouton "Commencer"

### Règles à ne jamais casser
- Progression strictement linéaire par formation (voir §5.2 de la feuille de route)
- RLS activée sur profiles et progress (voir §7.3)
- supabase-js chargé en local, jamais via CDN externe (voir §3.3)
- Aucun fichier régénéré en entier sans vérification préalable du contenu existant (voir §8.1)

### Décisions encore en attente
- Hébergement des vidéos (vidéos dans les modules ou texte + images seulement ?)
- Langue (100% français ou anglais technique ponctuel ?)
- Téléphone obligatoire à l'inscription ou optionnel ?
- Rédaction du contenu : Rak seul ou structuré avec assistance IA ?
- Validation des modules : bouton simple ou mini-quiz plus tard ?
- Communauté : groupe WhatsApp/Telegram ou non ?
