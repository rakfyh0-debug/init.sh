// js/nav-toggle.js — ouvre/ferme le menu mobile (topbar)
// Aucune dépendance : ce script fonctionne indépendamment de Supabase.

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('nav-toggle');
  const nav = document.querySelector('.nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
  });

  // Ferme le menu si on clique sur un lien à l'intérieur
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('nav-open');
    });
  });
});
