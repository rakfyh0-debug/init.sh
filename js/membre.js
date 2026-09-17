// js/membre.js — Espace Membre : vérifie la session, charge le profil et la progression

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const loadingBlock = document.getElementById('loading-block');
const contentBlock = document.getElementById('content-block');
const errorBlock   = document.getElementById('error-block');
const errorMsg     = document.getElementById('error-msg');
const welcomeEl    = document.getElementById('welcome');
const welcomeSub   = document.getElementById('welcome-sub');

function fail(msg) {
  loadingBlock.style.display = 'none';
  contentBlock.style.display = 'none';
  errorBlock.style.display = '';
  errorMsg.textContent = msg;
}

async function init() {
  // 1) Vérifier la session
  const { data: { session }, error: sessionError } = await sb.auth.getSession();

  if (sessionError || !session) {
    window.location.href = 'auth.html';
    return;
  }

  const user = session.user;

  // 2) Charger le profil
  const { data: profile, error: profileError } = await sb
    .from('profiles')
    .select('nom, statut')
    .eq('id', user.id)
    .single();

  if (profileError) {
    fail('Impossible de charger le profil. Vérifie ta connexion et réessaie.');
    return;
  }

  // 3) Charger la progression
  const { data: progress, error: progressError } = await sb
    .from('progress')
    .select('formation, module_id')
    .eq('user_id', user.id);

  if (progressError) {
    fail('Impossible de charger ta progression. Réessaie dans un instant.');
    return;
  }

  const linuxDone = (progress || []).filter(p => p.formation === 'linux').length;
  const webDone   = (progress || []).filter(p => p.formation === 'web').length;

  // 4) Afficher
  welcomeEl.textContent = 'Bonjour ' + (profile.nom || 'toi') + '.';
  welcomeSub.style.display = '';
  document.getElementById('prog-linux').textContent = linuxDone + ' / 6';
  document.getElementById('prog-web').textContent   = webDone + ' / 6';

  setFormationLink('link-linux', 'linux', linuxDone);
  setFormationLink('link-web', 'web', webDone);

  loadingBlock.style.display = 'none';
  contentBlock.style.display = '';
}

function setFormationLink(linkId, formation, doneCount) {
  const link = document.getElementById(linkId);
  if (!link) return;

  if (doneCount >= 6) {
    link.textContent = 'Revoir';
    link.href = `module.html?formation=${formation}&module=1`;
  } else if (doneCount > 0) {
    link.textContent = 'Continuer';
    link.href = `module.html?formation=${formation}&module=${doneCount + 1}`;
  } else {
    link.textContent = 'Commencer';
    link.href = `module.html?formation=${formation}&module=1`;
  }
}

// Déconnexion
document.getElementById('btn-logout').addEventListener('click', async () => {
  await sb.auth.signOut();
  window.location.href = 'index.html';
});

init();
