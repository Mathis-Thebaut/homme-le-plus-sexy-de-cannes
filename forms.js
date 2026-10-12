/* ============================================================
   CONFIGURATION DES FORMULAIRES
   Collez ici l'adresse Formspree de chaque formulaire,
   par exemple : "https://formspree.io/f/abcd1234"
   ============================================================ */
window.TBO_FORMS = {
  contact: "",   // formulaire de la section Contact (page d'accueil)
  tips: "",      // formulaire « Obtenir mes 3 conseils gratuits » (email)
  analyse: "",   // formulaire « Faire analyser ma fiche Google » (page analyse-gratuite)
  demo: ""       // formulaire « Démo gratuite de votre site en 48h » (page demo-gratuite)
};

(function () {
  document.querySelectorAll('form[data-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var url = window.TBO_FORMS[f.getAttribute('data-form')];
      var redirect = f.getAttribute('data-redirect');
      var btn = f.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; }

      function ok() {
        if (redirect) { window.location.href = redirect; return; }
        var msg = document.createElement('p');
        msg.setAttribute('role', 'status');
        msg.style.cssText = 'text-align:center;font-weight:600;padding:24px 8px;';
        msg.textContent = f.getAttribute('data-success') || 'Merci, votre message est bien envoyé.';
        f.replaceWith(msg);
      }
      function fail() {
        if (btn) { btn.disabled = false; }
        var old = f.querySelector('.form-error');
        if (old) { old.remove(); }
        var err = document.createElement('p');
        err.className = 'form-error';
        err.style.cssText = 'color:#B14343;font-size:14px;margin-top:12px;text-align:center;';
        err.textContent = "Oups, l'envoi a échoué. Réessayez ou écrivez-nous à contact@tbo-marketing.com.";
        f.appendChild(err);
      }

      if (!url) {
        console.warn('Formulaire "' + f.getAttribute('data-form') + '" non connecté : renseignez son adresse dans forms.js');
        ok();
        return;
      }
      fetch(url, { method: 'POST', body: new FormData(f), headers: { 'Accept': 'application/json' } })
        .then(function (r) { r.ok ? ok() : fail(); })
        .catch(fail);
    });
  });
})();
