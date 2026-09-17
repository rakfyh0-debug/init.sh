// js/auth.js — logique Connexion / Inscription / Déconnexion
// Dépend de : js/supabase-js.min.js (chargé avant), js/supabase-config.js (chargé avant)

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Si déjà connecté, inutile de revoir ce formulaire
(async () => {
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    window.location.href = 'membre.html';
    return;
  }
  document.getElementById('auth-card').style.visibility = 'visible';
})();

// ---------- Helpers ----------
function show(el, msg) {
  el.textContent = msg;
  el.classList.add('visible');
}

function hide(el) {
  el.textContent = '';
  el.classList.remove('visible');
}

function setLoading(button, loading, labelIdle, labelLoading) {
  button.disabled = loading;
  button.textContent = loading ? labelLoading : labelIdle;
}

// ---------- Bascule Connexion / Inscription ----------
const tabLogin  = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const formLogin  = document.getElementById('form-login');
const formSignup = document.getElementById('form-signup');

tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  formLogin.style.display = '';
  formSignup.style.display = 'none';
});

tabSignup.addEventListener('click', () => {
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  formSignup.style.display = '';
  formLogin.style.display = 'none';
});

// ---------- Connexion ----------
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl  = document.getElementById('login-error');
  const infoEl = document.getElementById('login-info');
  const btn    = formLogin.querySelector('button[type="submit"]');
  hide(errEl); hide(infoEl);

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    show(errEl, 'Email et mot de passe requis.');
    return;
  }

  setLoading(btn, true, 'Se connecter', 'Connexion...');

  const { error } = await sb.auth.signInWithPassword({ email, password });

  if (error) {
    setLoading(btn, false, 'Se connecter', 'Connexion...');
    show(errEl, traduireErreur(error.message));
    return;
  }

  window.location.href = 'membre.html';
});

// ---------- Inscription ----------
formSignup.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl  = document.getElementById('signup-error');
  const infoEl = document.getElementById('signup-info');
  const btn    = formSignup.querySelector('button[type="submit"]');
  hide(errEl); hide(infoEl);

  const nom      = document.getElementById('signup-nom').value.trim();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  if (!nom) {
    show(errEl, 'Le nom est requis.');
    return;
  }
  if (!email || !password) {
    show(errEl, 'Email et mot de passe requis.');
    return;
  }
  if (password.length < 8) {
    show(errEl, 'Le mot de passe doit faire au moins 8 caractères.');
    return;
  }

  setLoading(btn, true, 'Créer mon compte', 'Création...');

  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { nom } }
  });

  if (error) {
    setLoading(btn, false, 'Créer mon compte', 'Création...');
    show(errEl, traduireErreur(error.message));
    return;
  }

  // Si la confirmation email est activée (Confirm email = ON), pas de session immédiate
  if (data.session) {
    window.location.href = 'membre.html';
    return;
  }

  setLoading(btn, false, 'Créer mon compte', 'Création...');
  show(infoEl, 'Compte créé. Vérifie ton email pour confirmer, puis connecte-toi.');
  formSignup.reset();
});

// ---------- Traduction des erreurs Supabase ----------
function traduireErreur(msg) {
  const m = (msg || '').toLowerCase();
  if (m.includes('invalid login credentials')) return 'Email ou mot de passe incorrect.';
  if (m.includes('email not confirmed'))       return 'Confirme ton email avant de te connecter.';
  if (m.includes('user already registered'))   return 'Cet email est déjà utilisé.';
  if (m.includes('password should be at least')) return 'Mot de passe trop court.';
  if (m.includes('unable to validate email'))  return 'Adresse email invalide.';
  if (m.includes('rate limit'))                return 'Trop de tentatives. Réessaie dans un instant.';
  return 'Erreur : ' + msg;
}
