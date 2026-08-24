/* CoCreo — light interactions
   - rotating word in finale
   - nav shadow on scroll
   - form submission via Formspree (fetch, no page reload)
   - dynamic year in footer
*/

(function () {
  'use strict';

  // ----- Rotating word -----
  const rotatorEl = document.querySelector('[data-rotator]');
  if (rotatorEl) {
    const words = ['Wspólna', 'Zdrowa', 'Twórcza'];
    let i = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      setInterval(() => {
        i = (i + 1) % words.length;
        const slot = document.createElement('span');
        slot.className = 'finale__slot';
        slot.textContent = words[i];
        rotatorEl.innerHTML = '';
        rotatorEl.appendChild(slot);
      }, 1800);
    }
  }

  // ----- Nav shadow on scroll -----
  const nav = document.querySelector('[data-nav]');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----- Form: async submit to Formspree-style endpoint -----
  const form = document.querySelector('[data-signup-form]');
  const status = document.querySelector('[data-form-status]');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form__status';

      const action = form.getAttribute('action') || '';
      // Guard against unconfigured endpoint
      if (action.includes('YOUR_FORM_ID') || !action.startsWith('http')) {
        status.textContent = 'Formularz nie jest jeszcze skonfigurowany. Napisz do nas mailem.';
        status.classList.add('is-error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłam…';

      try {
        const data = new FormData(form);
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.reset();
          status.textContent = 'Dzięki! Jesteś na liście. Odezwiemy się przed premierą.';
          status.classList.add('is-success');
        } else {
          const body = await res.json().catch(() => ({}));
          status.textContent = body?.errors?.[0]?.message
            || 'Coś nie zadziałało. Spróbuj ponownie za chwilę.';
          status.classList.add('is-error');
        }
      } catch (err) {
        status.textContent = 'Brak połączenia. Sprawdź internet i spróbuj ponownie.';
        status.classList.add('is-error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // ----- Year -----
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

})();
