// Tema e idioma. O estado inicial é aplicado por um script inline no <head>
// (evita piscar); aqui ficam só os botões.
(function () {
  var root = document.documentElement;

  var LABELS = {
    lang: {
      pt: { text: 'EN', label: 'EN — switch to English' },
      en: { text: 'PT', label: 'PT — mudar para português' }
    },
    // O nome diz para onde o botão leva, não onde você está: é a única pista
    // de estado que quem não enxerga a tela recebe.
    theme: {
      pt: { light: 'Mudar para o tema escuro', dark: 'Mudar para o tema claro' },
      en: { light: 'Switch to the dark theme', dark: 'Switch to the light theme' }
    }
  };

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function currentLang() {
    return root.getAttribute('data-lang') === 'en' ? 'en' : 'pt';
  }

  function setMeta(selector, value) {
    if (!value) return;
    var el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function syncThemeButtons() {
    var names = LABELS.theme[currentLang()][currentTheme()];
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', names);
    });
  }

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');
    store('lang', lang);

    var l = LABELS.lang[lang];
    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.textContent = l.text;
      b.setAttribute('aria-label', l.label);
    });

    // Título e metadados acompanham o idioma, senão quem compartilha a versão
    // em inglês manda um preview em português.
    var title = root.getAttribute('data-title-' + lang);
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', root.getAttribute('data-ogtitle-' + lang) || title);
    }
    setMeta('meta[name="description"]', root.getAttribute('data-desc-' + lang));
    setMeta('meta[property="og:description"]', root.getAttribute('data-ogdesc-' + lang));
    setMeta('meta[property="og:locale"]', lang === 'en' ? 'en_US' : 'pt_BR');

    syncThemeButtons();
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    store('theme', theme);
    syncThemeButtons();
  }

  document.addEventListener('DOMContentLoaded', function () {
    setLang(currentLang());
    root.setAttribute('data-theme', currentTheme());
    syncThemeButtons();

    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        setLang(currentLang() === 'en' ? 'pt' : 'en');
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
