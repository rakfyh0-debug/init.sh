## État du projet — INIT.SH
Dernière mise à jour : 16 septembre 2026

### Décisions tranchées
- Nom du projet : INIT.SH
- Dépôt GitHub : rakfyh0-debug/init.sh (branche main)
- Relation avec Linux Master / technophile : projet distinct, aucune fusion, aucune réutilisation de code
- GitHub Pages activé : https://rakfyh0-debug.github.io/init.sh/
- Vidéos dans les modules : à trancher
- Téléphone obligatoire à l'inscription : à trancher

### Étape en cours (voir §3.5 de la feuille de route)
Étape n° 7 : Connexion / Inscription (auth.html) + Supabase Auth + reset-password.html

### Fichiers déjà créés et fonctionnels
- Structure de dossiers complète (css/, js/, assets/images/, assets/icons/, data/)
- index.html terminé : topbar, hero, section 2 formations, preuve sociale (RéviBF + TikTok), footer
- linux.html terminé : en-tête, pour qui, 6 modules, résultats, comment ça se passe, CTA final
- web.html terminé : même structure, orientée RéviBF, 6 modules formation web
- projets.html terminé : RéviBF en grande carte détaillée, état vide pour futurs projets
- a-propos.html terminé : parcours autodidacte, positionnement, liens réseaux
- css/style.css : base + styles page formation + styles page projets + styles page À propos
- README.md, js/main.js : créés mais vides

### Dernière action effectuée
Page À propos (a-propos.html) construite, testée en local, validée. Styles CSS ajoutés pour la page.

### Prochaine action prévue
Construire auth.html (étape 7) : Connexion / Inscription + Supabase Auth + reset-password.html

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
- Autres projets à ajouter sur projets.html (technophile ? autres ?)
