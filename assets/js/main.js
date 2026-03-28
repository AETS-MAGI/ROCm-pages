(function () {
  var KEY = 'rocm-pages-lang';
  var root = document.documentElement;

  function getLang() {
    return localStorage.getItem(KEY) || 'ja';
  }

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    localStorage.setItem(KEY, lang);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(btn.dataset.lang); });
    });
  });
})();
