// simple HTML include loader (works when served over http)
async function loadComponent(targetSelector, path) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    const html = await res.text();
    target.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

async function init() {
  await Promise.all([
    loadComponent('#header-placeholder', './components/header.html'),
    loadComponent('#hero-placeholder', './components/hero.html'),
    loadComponent('#main-placeholder', './components/main.html'),
  ]);

  // rebind smooth scrolling for injected anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);