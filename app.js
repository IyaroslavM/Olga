// Renders the page from T / GALLERY (i18n.js). Replaces the claude.ai/design bundle runtime.
(function () {
  'use strict';

  const TEL = 'tel:+380956959661';
  const PHONE = '095 695 96 61';
  const state = { lang: 'ua', open: {}, menu: false, filter: 'all', lb: -1 };

  try { const s = localStorage.getItem('bz_lang'); if (s === 'ua' || s === 'ru') state.lang = s; } catch (e) {}

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const map = (list, fn) => list.map(fn).join('');
  const sign = (k) => (state.open[k] ? '−' : '+');
  const isOpen = (k) => !!state.open[k];
  const hide = (cond) => (cond ? '' : ' hidden');

  const NAV = [['about', '#about'], ['services', '#services'], ['approach', '#approach'], ['education', '#education'], ['gallery', '#gallery'], ['faq', '#faq'], ['contacts', '#contacts']];
  const FOOT = ['services', 'about', 'education', 'gallery', 'faq', 'contacts'];
  const FILTERS = ['all', 'massage', 'process', 'specialist', 'beforeafter', 'procedures'];

  const visible = () => GALLERY.filter((g) => state.filter === 'all' || g.cat === state.filter);

  function langButtons(cls) {
    return map(['ua', 'ru'], (l) => `<button class="${cls}" data-lang="${l}" aria-pressed="${l === state.lang}">${l.toUpperCase()}</button>`);
  }

  function render() {
    const t = T[state.lang];
    const vis = visible();
    const cap = (g) => t.gallery.captions[g.key];
    const lbItem = state.lb >= 0 ? vis[state.lb] : null;

    return `
<header class="hdr">
  <div class="wrap hdr-in">
    <a href="#top" class="logo"><b>${esc(t.brand)}</b><small>${esc(t.brandSub)}</small></a>
    <nav class="nav">${map(NAV, ([k, h]) => `<a href="${h}">${esc(t.nav[k])}</a>`)}</nav>
    <div class="hdr-r">
      <span class="hdr-price">${esc(t.nav.price)}</span>
      <div class="langs">${langButtons('lang')}</div>
      <a href="${TEL}" class="btn hdr-cta">${esc(t.nav.book)}</a>
      <button class="burger" data-act="menu" aria-label="Menu" aria-expanded="${state.menu}"><span></span><span></span></button>
    </div>
  </div>
  <div class="menu wrap"${hide(state.menu)}>
    ${map(NAV, ([k, h]) => `<a href="${h}" data-act="close-menu">${esc(t.nav[k])}</a>`)}
    <div class="menu-foot"><span>${esc(t.nav.price)}</span><a href="${TEL}">${PHONE}</a></div>
  </div>
</header>

<section id="top" class="wrap hero">
  <div class="hero-txt">
    <div class="eyebrow">${esc(t.hero.eyebrow)}</div>
    <h1>${esc(t.hero.title)}</h1>
    <p class="hero-sub">${esc(t.hero.sub)}</p>
    <div class="hero-price"><b>1000 ${esc(t.uah)}</b><span>/ 60 ${esc(t.minutes)}</span></div>
    <div class="hero-ctas">
      <a href="${TEL}" class="btn">${esc(t.hero.cta)}</a>
      <a href="${TEL}" class="call"><small>${esc(t.hero.callLabel)}</small><span>${PHONE}</span></a>
    </div>
  </div>
  <div class="hero-img">
    <div class="arch"><img src="img/master.jpg" alt="${esc(t.hero.photoAlt)}" class="cover" style="object-position:30% 20%" fetchpriority="high"></div>
    <div class="badge"><small>${esc(t.hero.badgeTop)}</small><span>${esc(t.hero.badge)}</span></div>
  </div>
</section>

<section id="about" class="sec alt">
  <div class="wrap about">
    <div class="about-photo">
      <div class="ph"><img src="img/master-1.jpg" alt="${esc(t.about.photoAlt)}" class="cover" style="object-position:35% 40%" loading="lazy" decoding="async"></div>
      <p>${esc(t.about.caption)}</p>
    </div>
    <div class="about-txt">
      <div class="eyebrow">${esc(t.about.eyebrow)}</div>
      <h2 class="h2">${esc(t.about.title)}</h2>
      <div class="prose">
        <p>${esc(t.about.p1)}</p>
        <p>${esc(t.about.p2)}</p>
        <p class="quote">${esc(t.about.quote)}</p>
        <p>${esc(t.about.p3)}</p>
        <div class="story anim"${hide(isOpen('story'))}>${map(t.about.long, (p) => `<p>${esc(p)}</p>`)}</div>
      </div>
      <button class="btn-ghost" data-toggle="story" aria-expanded="${isOpen('story')}">${esc(isOpen('story') ? t.about.less : t.about.more)}</button>
    </div>
  </div>
</section>

<section id="services" class="sec wrap services">
  <div class="sec-head">
    <div style="max-width:720px">
      <div class="eyebrow">${esc(t.services.eyebrow)}</div>
      <h2 class="h2">${esc(t.services.title)}</h2>
      <p>${esc(t.services.sub)}</p>
    </div>
    <span>${esc(t.services.priceNote)}</span>
  </div>
  <div class="grid-svc">
    ${map(t.services.items, (s, i) => {
      const k = 's' + i;
      return `<article class="svc">
      <div class="svc-top"><span>${String(i + 1).padStart(2, '0')}</span><span class="dot"></span></div>
      <h3>${esc(s.name)}</h3>
      <p class="svc-desc">${esc(s.desc)}</p>
      ${s.warn ? `<p class="svc-warn">${esc(s.warn)}</p>` : ''}
      <p class="svc-more anim"${hide(isOpen(k))}>${esc(s.more)}</p>
      <button class="link-btn" data-toggle="${k}" aria-expanded="${isOpen(k)}">${esc(isOpen(k) ? t.services.hide : t.services.more)}<span>${sign(k)}</span></button>
    </article>`;
    })}
  </div>
</section>

<section id="price" class="sec price-out">
  <div class="price">
    <div class="price-l">
      <div class="eyebrow">${esc(t.price.eyebrow)}</div>
      <div class="price-big">1000 <span>${esc(t.uah)}</span></div>
      <div class="price-unit">${esc(t.price.unit)}</div>
      <p class="price-note">${esc(t.price.note)}</p>
    </div>
    <div class="price-r">
      <a href="${TEL}" class="price-cta">${esc(t.price.cta)}</a>
      <a href="${TEL}" class="price-tel">${PHONE}</a>
      <span>${esc(t.price.where)}</span>
    </div>
  </div>
</section>

<section class="wrap steps">
  <div class="eyebrow">${esc(t.steps.eyebrow)}</div>
  <h2 class="h2">${esc(t.steps.title)}</h2>
  <ol class="plain">${map(t.steps.items, (st) => `<li><span class="n">${esc(st.n)}</span><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></li>`)}</ol>
</section>

<section class="wrap who">
  <h2 class="h2">${esc(t.who.title)}</h2>
  <ul class="plain">${map(t.who.items, (w) => `<li>${esc(w)}</li>`)}</ul>
</section>

<section id="approach" class="sec alt">
  <div class="approach">
    <div class="eyebrow">${esc(t.approach.eyebrow)}</div>
    <h2 class="h2">${esc(t.approach.title)}</h2>
    <p class="approach-lead">${esc(t.approach.lead)}</p>
    <div class="approach-txt">${map(t.approach.paras, (p) => `<p>${esc(p)}</p>`)}</div>
  </div>
</section>

<section id="education" class="sec wrap edu">
  <div class="edu-head">
    <div>
      <div class="eyebrow">${esc(t.edu.eyebrow)}</div>
      <h2 class="h2">${esc(t.edu.title)}</h2>
      <p>${esc(t.edu.intro)}</p>
    </div>
    <div class="edu-photo"><img src="img/master-2.jpg" alt="${esc(t.edu.photoAlt)}" class="cover" style="object-position:50% 30%" loading="lazy" decoding="async"></div>
  </div>
  <div class="grid-edu">
    ${map(t.edu.cats, (c) => `<div class="card edu-cat"><h3>${esc(c.title)}</h3><ul class="plain">${map(c.items, (i) => `<li>${esc(i)}</li>`)}</ul></div>`)}
  </div>
  <div class="card acc">
    <button class="acc-btn" data-toggle="edu" aria-expanded="${isOpen('edu')}">${esc(t.edu.fullBtn)}<span>${sign('edu')}</span></button>
    <div class="acc-body anim"${hide(isOpen('edu'))}>
      <div style="flex:1 1 360px"><ol>${map(t.edu.full, (f) => `<li>${esc(f)}</li>`)}</ol></div>
      <div style="flex:1 1 280px">
        <h4>${esc(t.edu.teachersTitle)}</h4>
        <p>${esc(t.edu.teachersText)}</p>
        <ul class="plain">${map(t.edu.teachers, (x) => `<li>${esc(x)}</li>`)}</ul>
      </div>
    </div>
  </div>
</section>

<section id="extra" class="sec alt">
  <div class="wrap extra">
    <div class="eyebrow">${esc(t.extra.eyebrow)}</div>
    <h2 class="h2">${esc(t.extra.title)}</h2>
    <div class="grid-extra">${map(t.extra.cards, (x) => `<div class="xcard"><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p></div>`)}</div>
    <p class="small-note">${esc(t.extra.disclaimer)}</p>
    <div class="grid-proc">
      <div class="proc">
        <h3>${esc(t.hirudo.title)}</h3>
        <p>${esc(t.hirudo.desc)}</p>
        <p class="tint">${esc(t.hirudo.note)}</p>
        <button class="proc-btn" data-toggle="hirudo" aria-expanded="${isOpen('hirudo')}">${esc(t.hirudo.expBtn)}<span>${sign('hirudo')}</span></button>
        <ul class="anim"${hide(isOpen('hirudo'))}>${map(t.hirudo.items, (h) => `<li>${esc(h)}</li>`)}</ul>
      </div>
      <div class="proc">
        <h3>${esc(t.auric.title)}</h3>
        <p>${esc(t.auric.desc)}</p>
        <button class="proc-btn" data-toggle="auric" aria-expanded="${isOpen('auric')}">${esc(t.auric.moreBtn)}<span>${sign('auric')}</span></button>
        <div class="proc-more anim"${hide(isOpen('auric'))}>${map(t.auric.more, (p) => `<p>${esc(p)}</p>`)}</div>
      </div>
    </div>
  </div>
</section>

<section id="gallery" class="sec wrap gallery">
  <div class="gal-head">
    <div>
      <div class="eyebrow">${esc(t.gallery.eyebrow)}</div>
      <h2 class="h2">${esc(t.gallery.title)}</h2>
    </div>
    <div class="filters">${map(FILTERS, (f) => `<button class="chip" data-filter="${f}" aria-pressed="${f === state.filter}">${esc(t.gallery.filters[f])}</button>`)}</div>
  </div>
  <div class="masonry">
    ${map(vis, (g, i) => `<figure><button data-lb="${i}" aria-label="${esc(cap(g))}"><img src="${g.src}" alt="${esc(cap(g))}" loading="lazy" decoding="async"></button><figcaption>${esc(cap(g))}</figcaption></figure>`)}
  </div>
  <p class="small-note">${esc(t.gallery.note)}</p>
</section>

<section id="faq" class="sec alt">
  <div class="wrap faq">
    <div class="faq-l">
      <div class="eyebrow">FAQ</div>
      <h2 class="h2">${esc(t.faq.title)}</h2>
      <a href="${TEL}">${esc(t.faq.ask)} ${PHONE}</a>
    </div>
    <div class="faq-list">
      ${map(t.faq.items, ([q, a], i) => {
        const k = 'f' + i;
        return `<div class="faq-item"><button class="faq-q" data-toggle="${k}" aria-expanded="${isOpen(k)}">${esc(q)}<span>${sign(k)}</span></button><p class="faq-a anim"${hide(isOpen(k))}>${esc(a)}</p></div>`;
      })}
    </div>
  </div>
</section>

<section id="contacts" class="sec wrap final">
  <h2>${esc(t.final.title)}</h2>
  <p>${esc(t.final.sub)}</p>
  <a href="${TEL}" class="btn">${esc(t.final.cta)}</a>
  <div><a href="${TEL}" class="final-tel">${PHONE}</a></div>
</section>

<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-top">
      <div class="foot-brand"><b>${esc(t.brand)}</b><small>${esc(t.brandSub)}</small><a href="${TEL}">${PHONE}</a></div>
      <nav class="foot-nav">${map(FOOT, (k) => `<a href="#${k}">${esc(t.nav[k])}</a>`)}</nav>
      <div class="foot-langs">${langButtons('foot-lang')}</div>
    </div>
    <p class="foot-disc">${esc(t.disclaimer)}</p>
    <p class="foot-copy">© 2026 ${esc(t.brand)} · ${esc(t.brandSub)}</p>
  </div>
</footer>

<div class="mbar"><a href="${TEL}">${PHONE}</a><a href="${TEL}">${esc(t.nav.book)}</a></div>

${lbItem ? `<div class="lb" data-act="lb-close" role="dialog" aria-modal="true" aria-label="${esc(cap(lbItem))}">
  <button class="circ lb-x" data-act="lb-close" aria-label="Close">×</button>
  <img src="${lbItem.src}" alt="${esc(cap(lbItem))}">
  <div class="lb-bar">
    <button class="circ" data-act="lb-prev" aria-label="Previous">‹</button>
    <span>${esc(cap(lbItem))}</span>
    <button class="circ" data-act="lb-next" aria-label="Next">›</button>
  </div>
</div>` : ''}`;
  }

  const app = document.getElementById('app');
  let first = true;

  // Re-render, then put focus back on the control that triggered it (innerHTML replaces the node).
  function update(focusSel) {
    app.innerHTML = render();
    if (first) first = false;
    else app.querySelector('.hero-txt').style.animation = 'none';
    if (focusSel) { const el = app.querySelector(focusSel); if (el) el.focus({ preventScroll: true }); }
  }

  function applySeo() {
    const t = T[state.lang];
    document.title = t.seo.title;
    document.documentElement.lang = state.lang === 'ua' ? 'uk' : 'ru';
    document.querySelector('meta[name="description"]').content = t.seo.desc;
  }

  function step(d) {
    const n = visible().length;
    if (n) { state.lb = (state.lb + d + n) % n; update('.lb [data-act="lb-' + (d > 0 ? 'next' : 'prev') + '"]'); }
  }

  let lbReturn = null;

  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-toggle],[data-lang],[data-filter],[data-lb],[data-act]');
    if (!el) return;
    if (el.dataset.toggle) {
      const k = el.dataset.toggle;
      state.open[k] = !state.open[k];
      update(`[data-toggle="${k}"]`);
    } else if (el.dataset.lang) {
      state.lang = el.dataset.lang;
      try { localStorage.setItem('bz_lang', state.lang); } catch (err) {}
      applySeo();
      update(`.${el.className.split(' ')[0]}[data-lang="${state.lang}"]`);
    } else if (el.dataset.filter) {
      state.filter = el.dataset.filter; state.lb = -1;
      update(`[data-filter="${state.filter}"]`);
    } else if (el.dataset.lb) {
      state.lb = +el.dataset.lb; lbReturn = `[data-lb="${state.lb}"]`;
      update('.lb-x');
    } else {
      const act = el.dataset.act;
      if (act === 'menu') { state.menu = !state.menu; update('.burger'); }
      else if (act === 'close-menu') {
        // Close the menu first, then scroll: jumping while the tall menu is open lands short once it collapses.
        e.preventDefault();
        const hash = el.getAttribute('href');
        state.menu = false;
        update();
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', hash);
      }
      else if (act === 'lb-prev') { e.stopPropagation(); step(-1); }
      else if (act === 'lb-next') { e.stopPropagation(); step(1); }
      else if (act === 'lb-close' && (el.classList.contains('lb-x') || e.target === el)) { state.lb = -1; update(lbReturn); }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (state.lb < 0) return;
    if (e.key === 'Escape') { state.lb = -1; update(lbReturn); }
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  // The mobile menu only exists below the wide-nav breakpoint; drop it when resizing up.
  window.matchMedia('(min-width:1140px)').addEventListener('change', (m) => { if (m.matches && state.menu) { state.menu = false; update(); } });

  applySeo();
  update();
  // innerHTML render happens after the browser's initial jump to #hash, so redo it.
  if (location.hash) { try { const target = document.querySelector(location.hash); if (target) target.scrollIntoView(); } catch (e) {} }
})();
