(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: scroll state, mobile menu, active link ---------- */
  const nav = $('#nav');
  const links = $('#navLinks');
  const burger = $('#hamburger');

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    links.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  const navAnchors = $$('a[data-section]', links);
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle('active', a.dataset.section === entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navAnchors.forEach((a) => {
    const section = document.getElementById(a.dataset.section);
    if (section) sectionObserver.observe(section);
  });

  /* ---------- Typewriter ---------- */
  const typer = $('#typewriter');
  const phrases = [
    'java -jar microservices.jar --scale=national',
    'kafka-console-consumer --topic registration-events',
    'kubectl rollout status deploy/tier-service',
    'claude "triage today\'s bugs and verify the status report"',
    'splunk search "service-mesh rollout" | verify',
  ];
  if (typer) {
    if (reduceMotion) {
      typer.textContent = phrases[0];
    } else {
      let p = 0, i = 0, deleting = false;
      const tick = () => {
        const text = phrases[p];
        typer.textContent = text.slice(0, i);
        if (!deleting && i < text.length) { i++; setTimeout(tick, 45); }
        else if (!deleting) { deleting = true; setTimeout(tick, 1800); }
        else if (i > 0) { i--; setTimeout(tick, 18); }
        else { deleting = false; p = (p + 1) % phrases.length; setTimeout(tick, 300); }
      };
      tick();
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx % 6, 5) * 60}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Metric counters ---------- */
  const format = (n) => n.toLocaleString('en-US');
  const renderCount = (el, value) => {
    el.textContent = `${el.dataset.prefix || ''}${format(value)}${el.dataset.suffix || ''}`;
  };
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      obs.unobserve(el);
      if (reduceMotion) { renderCount(el, target); return; }
      const start = performance.now();
      const dur = 1400;
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        renderCount(el, Math.round(target * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach((el) => counterObserver.observe(el));

  /* ---------- Contact form (opens the visitor's mail client) ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const fields = [
        [form.elements.name, name.length >= 2],
        [form.elements.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)],
        [form.elements.message, message.length >= 10],
      ];
      let ok = true;
      fields.forEach(([field, valid]) => { field.classList.toggle('invalid', !valid); if (!valid) ok = false; });
      if (!ok) {
        status.className = 'form-status error';
        status.textContent = 'Please add your name, a valid email and a message of at least 10 characters.';
        return;
      }
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:khuddusshariff0022@gmail.com?subject=${subject}&body=${body}`;
      status.className = 'form-status ok';
      status.textContent = 'Opening your email app… If nothing happens, email khuddusshariff0022@gmail.com directly.';
    });
  }

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
