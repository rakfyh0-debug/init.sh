// js/module.js — Affiche un module, vérifie le déverrouillage, gère la validation
// Dépend de : js/supabase-js.min.js (chargé avant), js/supabase-config.js (chargé avant)

const sbModule = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const TOTAL_MODULES = 6;
const FORMATIONS = {
  linux: { label: 'Linux Pratique', dataFile: 'data/linux-modules.json' },
  web:   { label: 'Créer sa plateforme web', dataFile: 'data/web-modules.json' }
};

const loadingBlock = document.getElementById('loading-block');
const lockedBlock  = document.getElementById('locked-block');
const contentBlock = document.getElementById('content-block');
const errorBlock   = document.getElementById('error-block');

function showOnly(block) {
  [loadingBlock, lockedBlock, contentBlock, errorBlock].forEach(b => {
    b.style.display = (b === block) ? '' : 'none';
  });
}

function fail(msg) {
  document.getElementById('error-msg').textContent = msg;
  showOnly(errorBlock);
}

async function init() {
  // 1) Lire et valider les paramètres d'URL
  const params = new URLSearchParams(window.location.search);
  const formation = params.get('formation');
  const moduleNum = parseInt(params.get('module'), 10);

  if (!FORMATIONS[formation] || !Number.isInteger(moduleNum) || moduleNum < 1 || moduleNum > TOTAL_MODULES) {
    fail("Ce module n'existe pas. Retourne à l'espace membre pour choisir une formation.");
    return;
  }

  // 2) Vérifier la session
  const { data: { session } } = await sbModule.auth.getSession();
  if (!session) {
    window.location.href = 'auth.html';
    return;
  }
  const user = session.user;

  // 3) Charger la progression de cette formation
  const { data: progress, error: progressError } = await sbModule
    .from('progress')
    .select('module_id')
    .eq('user_id', user.id)
    .eq('formation', formation);

  if (progressError) {
    fail('Impossible de charger ta progression. Réessaie dans un instant.');
    return;
  }

  const doneIds = (progress || []).map(p => p.module_id);
  const doneCount = doneIds.length;
  const unlockedUpTo = doneCount + 1; // premier module non terminé, accessible

  if (moduleNum > unlockedUpTo) {
    document.getElementById('locked-msg').textContent =
      `Ce module est verrouillé. Termine d'abord le module ${unlockedUpTo} de la formation ${FORMATIONS[formation].label}.`;
    showOnly(lockedBlock);
    return;
  }

  // 4) Charger les données du module
  let modulesData;
  try {
    const res = await fetch(FORMATIONS[formation].dataFile);
    modulesData = await res.json();
  } catch (e) {
    fail('Impossible de charger le contenu du module.');
    return;
  }

  const moduleData = modulesData.find(m => m.id === moduleNum);
  if (!moduleData) {
    fail("Ce module n'existe pas encore dans le contenu.");
    return;
  }

  const isDone = doneIds.includes(moduleNum);

  // 5) Affichage
  document.getElementById('module-meta').textContent =
    `${FORMATIONS[formation].label} — Module ${moduleNum} / ${TOTAL_MODULES}`;
  document.getElementById('module-title').textContent = moduleData.title;
  document.getElementById('progress-fill').style.width = (doneCount / TOTAL_MODULES * 100) + '%';
  document.title = moduleData.title + ' — init.sh';

  const lessonBody = document.getElementById('lesson-body');
  if (moduleData.lesson && moduleData.lesson.length > 0) {
    lessonBody.innerHTML = moduleData.lesson.map(p => `<p>${p}</p>`).join('');
  } else {
    lessonBody.innerHTML = '<p>Le contenu de ce module est en cours de rédaction. Reviens bientôt.</p>';
  }

  const practiceList = document.getElementById('practice-list');
  if (moduleData.practice && moduleData.practice.length > 0) {
    practiceList.innerHTML = moduleData.practice.map(p => `<li>${p}</li>`).join('');
  } else {
    practiceList.innerHTML = '<li>À venir.</li>';
  }

  if (isDone) {
    document.getElementById('done-banner').classList.add('visible');
  }

  if (moduleNum > 1) {
    const prevLink = document.getElementById('link-prev');
    prevLink.href = `module.html?formation=${formation}&module=${moduleNum - 1}`;
    prevLink.style.display = '';
  }

  // 6) Bouton de validation
  const btnComplete = document.getElementById('btn-complete');
  const errEl = document.getElementById('complete-error');
  const infoEl = document.getElementById('complete-info');

  if (isDone) {
    btnComplete.textContent = 'Déjà terminé';
    btnComplete.disabled = true;
  }

  btnComplete.addEventListener('click', async () => {
    btnComplete.disabled = true;
    btnComplete.textContent = 'Enregistrement...';
    errEl.classList.remove('visible');
    infoEl.classList.remove('visible');

    const { error } = await sbModule.from('progress').insert({
      user_id: user.id,
      formation: formation,
      module_id: moduleNum
    });

    // Code 23505 = déjà existant (contrainte unique) : ce n'est pas une vraie erreur ici
    if (error && error.code !== '23505') {
      btnComplete.disabled = false;
      btnComplete.textContent = "J'ai terminé ce module";
      errEl.textContent = 'Erreur : ' + error.message;
      errEl.classList.add('visible');
      return;
    }

    infoEl.textContent = 'Module terminé. Le suivant est débloqué.';
    infoEl.classList.add('visible');
    btnComplete.textContent = 'Terminé ✓';

    setTimeout(() => {
      if (moduleNum < TOTAL_MODULES) {
        window.location.href = `module.html?formation=${formation}&module=${moduleNum + 1}`;
      } else {
        window.location.href = 'membre.html';
      }
    }, 1200);
  });

  showOnly(contentBlock);
}

init();
