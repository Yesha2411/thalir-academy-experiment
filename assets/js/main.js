/* ============================================================
   THALIR ACADEMY — main.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---- MOBILE NAV ---- */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  /* ---- ACTIVE NAV ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && (href === currentPage || href.endsWith('/' + currentPage) || (currentPage === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });

  /* ---- HERO SLIDESHOW ---- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots   = document.querySelectorAll('.dot');
  if (slides.length) {
    var cur = 0, timer;
    function goTo(idx) {
      slides[cur].classList.remove('active');
      if (dots[cur]) dots[cur].classList.remove('active');
      cur = (idx + slides.length) % slides.length;
      slides[cur].classList.add('active');
      if (dots[cur]) dots[cur].classList.add('active');
    }
    function startSlider() { clearInterval(timer); timer = setInterval(function () { goTo(cur + 1); }, 5000); }
    dots.forEach(function (d) { d.addEventListener('click', function () { goTo(+this.dataset.slide); startSlider(); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { goTo(cur + 1); startSlider(); }
      if (e.key === 'ArrowLeft')  { goTo(cur - 1); startSlider(); }
    });
    startSlider();
  }

  /* ---- ANIMATED COUNTERS ---- */
  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var dur = 1800, t0 = performance.now();
    function ease(x) { return 1 - Math.pow(1 - x, 4); }
    function frame(now) {
      var p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.floor(ease(p) * target) + suffix;
      if (p > .92 && p < .98) { el.classList.add('pop'); setTimeout(function(){el.classList.remove('pop');},150); }
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: .5 });
    document.querySelectorAll('.counter').forEach(function (el) { co.observe(el); });
  }

  /* ---- SCROLL REVEAL ---- */
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) { setTimeout(function(){e.target.classList.add('visible');}, i*80); ro.unobserve(e.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { ro.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');});
  }

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){ i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- TABS ---- */
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = this.closest('[data-tabs]') || document;
      group.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active');});
      group.querySelectorAll('.tab-pane').forEach(function(p){p.classList.remove('active');});
      this.classList.add('active');
      var pane = document.getElementById(this.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  /* ---- FORM SUBMIT (prevent default, show success) ---- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successId = this.dataset.form + '-success';
      var success = document.getElementById(successId);
      if (success) { this.style.display = 'none'; success.classList.add('show'); }
    });
  });

});
