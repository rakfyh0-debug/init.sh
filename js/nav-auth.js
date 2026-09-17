// js/nav-auth.js — adapte le bouton de la topbar selon l'état de connexion
// Doit être chargé après supabase-js.min.js et supabase-config.js

(function () {
  const navBtn = document.getElementById('nav-auth-btn');
  if (!navBtn) return;

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  async function updateNav() {
    const { data: { session } } = await sb.auth.getSession();
    if (session) {
      navBtn.textContent = 'Mon espace';
      navBtn.setAttribute('href', 'membre.html');
    } else {
      navBtn.textContent = 'Connexion';
      navBtn.setAttribute('href', 'auth.html');
    }
  }

  updateNav();

  // Corrige le cas où le bouton "retour" du navigateur restaure une version
  // en cache de la page sans ré-exécuter ce script (bfcache).
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) updateNav();
  });
})();
