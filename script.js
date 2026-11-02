// Kopper Kettle Restaurant — navigation, reveals and live hours

(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  const closeNav = () => {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open navigation');
  };

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
    document.addEventListener('click', (event) => {
      if (nav.classList.contains('is-open') && !event.target.closest('.site-header')) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealables = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && revealables.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    revealables.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 3, 2) * 60 + 'ms';
      observer.observe(el);
    });
  } else {
    revealables.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Hours (Pineville, NC) ---------- */
  // Mon–Fri 5:00–14:30, Sat 5:00–11:30, Sunday closed.
  const SCHEDULE = {
    Sun: null,
    Mon: [5 * 60, 14 * 60 + 30],
    Tue: [5 * 60, 14 * 60 + 30],
    Wed: [5 * 60, 14 * 60 + 30],
    Thu: [5 * 60, 14 * 60 + 30],
    Fri: [5 * 60, 14 * 60 + 30],
    Sat: [5 * 60, 11 * 60 + 30]
  };
  const NEXT_DAY = { Sun: 'Mon', Mon: 'Tue', Tue: 'Wed', Wed: 'Thu', Thu: 'Fri', Fri: 'Sat', Sat: 'Sun' };

  const fmt = (minutes) => {
    const h24 = Math.floor(minutes / 60);
    const m = minutes % 60;
    const suffix = h24 >= 12 ? 'pm' : 'am';
    const h = h24 % 12 === 0 ? 12 : h24 % 12;
    return m === 0 ? `${h} ${suffix}` : `${h}:${String(m).padStart(2, '0')} ${suffix}`;
  };

  const nowInPineville = () => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t)?.value || '';
      return { day: get('weekday'), minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
    } catch (error) {
      const d = new Date();
      return { day: d.toString().slice(0, 3), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  };

  const badge = document.getElementById('open-badge');
  const visitStatus = document.getElementById('visit-status');
  const visitTime = document.getElementById('visit-time');
  const visitHeadHours = document.querySelector('.visit-card-hours');

  const updateHours = () => {
    const { day, minutes } = nowInPineville();
    const today = SCHEDULE[day];
    const isOpen = Boolean(today) && minutes >= today[0] && minutes < today[1];

    let badgeText;
    let statusText;
    let timeText;

    if (isOpen) {
      const closingSoon = today[1] - minutes <= 45;
      badgeText = `Open now · until ${fmt(today[1])}`;
      statusText = closingSoon ? 'Closing soon' : 'Open now';
      timeText = `${fmt(today[0])} – ${fmt(today[1])}`;
    } else if (today && minutes < today[0]) {
      badgeText = `Opens today at ${fmt(today[0])}`;
      statusText = 'Closed now';
      timeText = `${fmt(today[0])} – ${fmt(today[1])}`;
    } else if (today) {
      badgeText = 'Closed for the day';
      statusText = 'Closed now';
      timeText = `${fmt(today[0])} – ${fmt(today[1])}`;
    } else {
      badgeText = 'Closed Sunday · back Monday 5 am';
      statusText = 'Closed Sunday';
      timeText = 'Closed today';
    }

    if (badge) {
      badge.textContent = badgeText;
      badge.dataset.open = isOpen ? 'true' : 'false';
    }
    if (visitStatus) {
      visitStatus.textContent = statusText;
      visitStatus.classList.toggle('is-closed', !isOpen);
    }
    if (visitTime) visitTime.textContent = timeText;

    if (visitHeadHours) {
      const tomorrow = SCHEDULE[NEXT_DAY[day]];
      visitHeadHours.textContent = tomorrow ? `Tomorrow ${fmt(tomorrow[0])}` : 'Tomorrow';
    }
  };

  updateHours();
  setInterval(updateHours, 60000);

  /* ---------- Year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
