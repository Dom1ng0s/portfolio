// Tema e idioma. O estado inicial é aplicado por um script inline no <head>
// (evita piscar); aqui ficam só os botões.
(function () {
  var root = document.documentElement;

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');
    store('lang', lang);
    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.textContent = lang === 'en' ? 'PT' : 'EN';
      b.setAttribute('aria-label', lang === 'en' ? 'Mudar para português' : 'Switch to English');
    });
    var t = root.getAttribute('data-title-' + lang);
    if (t) document.title = t;
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    store('theme', theme);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setLang(root.getAttribute('data-lang') || 'pt');
    root.setAttribute('data-theme', currentTheme());

    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        setLang(root.getAttribute('data-lang') === 'en' ? 'pt' : 'en');
      });
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      });
    });
    document.querySelectorAll('[aria-disabled="true"]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); });
    });
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
