// js/hero-terminal.js — anime le faux terminal du hero (accueil uniquement)
// Aucune dépendance, joue une seule fois au chargement.

document.addEventListener('DOMContentLoaded', function () {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  const lines = [
    '$ whoami',
    'autodidacte',
    '',
    '$ ls formations/',
    'linux-pratique/  web-creation/',
    '',
    '$ ./commencer.sh',
    '→ progression sauvegardée',
    '→ accès gratuit activé',
    '✓ prêt à construire'
  ];

  const text = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';
  body.appendChild(text);
  body.appendChild(cursor);

  const fullText = lines.join('\n');
  let i = 0;

  function tick() {
    if (i <= fullText.length) {
      text.textContent = fullText.slice(0, i);
      i++;
      const charDelay = 18 + Math.random() * 22;
      setTimeout(tick, charDelay);
    }
  }

  setTimeout(tick, 400);
});
