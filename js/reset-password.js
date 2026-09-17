// js/reset-password.js — demande de lien + choix du nouveau mot de passe
// Dépend de : js/supabase-js.min.js (chargé avant), js/supabase-config.js (chargé avant)

const sbReset = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const formRequest = document.getElementById('form-request');
const formUpdate  = document.getElementById('form-update');

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

// Supabase envoie cet événement quand l'utilisateur arrive depuis le lien
// reçu par email : on bascule alors sur le formulaire de nouveau mot de passe.
sbReset.auth.onAuthStateChange((event) => {
  if (event === 'PASSWORD_RECOVERY') {
    formRequest.style.display = 'none';
    formUpdate.style.display = '';
  }
});

// ---------- Étape 1 : demander le lien ----------
formRequest.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl  = document.getElementById('request-error');
  const infoEl = document.getElementById('request-info');
  const btn    = formRequest.querySelector('button[type="submit"]');
  hide(errEl); hide(infoEl);

  const email = document.getElementById('request-email').value.trim();
  if (!email) {
    show(errEl, 'Email requis.');
    return;
  }

  setLoading(btn, true, 'Envoyer le lien', 'Envoi...');

  const { error } = await sbReset.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });

  setLoading(btn, false, 'Envoyer le lien', 'Envoi...');

  if (error) {
    show(errEl, 'Erreur : ' + error.message);
    return;
  }

  show(infoEl, "Si un compte existe avec cet email, un lien de réinitialisation vient d'être envoyé.");
  formRequest.reset();
});

// ---------- Étape 2 : choisir le nouveau mot de passe ----------
formUpdate.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl  = document.getElementById('update-error');
  const infoEl = document.getElementById('update-info');
  const btn    = formUpdate.querySelector('button[type="submit"]');
  hide(errEl); hide(infoEl);

  const pw1 = document.getElementById('update-password').value;
  const pw2 = document.getElementById('update-password-confirm').value;

  if (pw1.length < 8) {
    show(errEl, 'Le mot de passe doit faire au moins 8 caractères.');
    return;
  }
  if (pw1 !== pw2) {
    show(errEl, 'Les deux mots de passe ne correspondent pas.');
    return;
  }

  setLoading(btn, true, 'Changer le mot de passe', 'Mise à jour...');

  const { error } = await sbReset.auth.updateUser({ password: pw1 });

  setLoading(btn, false, 'Changer le mot de passe', 'Mise à jour...');

  if (error) {
    show(errEl, 'Erreur : ' + error.message);
    return;
  }

  show(infoEl, 'Mot de passe mis à jour. Redirection...');
  setTimeout(() => { window.location.href = 'membre.html'; }, 1500);
});
