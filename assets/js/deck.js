// Slide deck for blog posts: see layouts/shortcodes/deck.html.
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initTabs(root) {
    root.querySelectorAll('[data-tabs]').forEach(function (group) {
      var tabs = Array.prototype.filter.call(group.querySelectorAll('[data-tab]'), function (t) {
        return t.closest('[data-tabs]') === group;
      });
      var panels = Array.prototype.filter.call(group.querySelectorAll('[data-panel]'), function (p) {
        return p.closest('[data-tabs]') === group;
      });
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) {
            t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
          });
          panels.forEach(function (p) {
            var active = p.dataset.panel === tab.dataset.tab;
            p.toggleAttribute('data-inactive', !active);
            if (active) playTerms(p);
          });
        });
      });
      var copy = group.querySelector('[data-copy]');
      if (copy && navigator.clipboard) {
        copy.addEventListener('click', function () {
          var panel = panels.filter(function (p) { return !p.hasAttribute('data-inactive'); })[0];
          var pre = panel && panel.querySelector('pre');
          if (!pre) return;
          navigator.clipboard.writeText(pre.innerText).then(function () {
            copy.textContent = 'Copied';
            setTimeout(function () { copy.textContent = 'Copy'; }, 1500);
          });
        });
      } else if (copy) {
        copy.hidden = true;
      }
    });
  }

  // Terminals type their commands the first time they are shown.
  function initTerm(term) {
    var steps = Array.prototype.slice.call(term.querySelectorAll('[data-term-step]'));
    var body = term.querySelector('[data-term-body]');
    var replay = term.querySelector('[data-term-replay]');
    var run = 0;

    function finish() {
      steps.forEach(function (s) {
        s.classList.remove('is-waiting', 'is-typing');
        var cmd = s.querySelector('[data-term-cmd]');
        cmd.textContent = cmd.dataset.full;
      });
      if (replay) replay.hidden = false;
    }

    function play() {
      var mine = ++run;
      term.dataset.played = 'true';
      if (replay) replay.hidden = true;
      steps.forEach(function (s) {
        var cmd = s.querySelector('[data-term-cmd]');
        if (!cmd.dataset.full) cmd.dataset.full = cmd.textContent;
        cmd.textContent = '';
        s.classList.add('is-waiting');
        s.classList.remove('is-typing');
      });
      body.scrollTop = 0;

      var i = 0;
      function nextStep() {
        if (mine !== run) return;
        if (i >= steps.length) return finish();
        var step = steps[i++];
        var cmd = step.querySelector('[data-term-cmd]');
        var full = cmd.dataset.full;
        var delay = Math.max(6, Math.min(28, 900 / full.length));
        var n = 0;
        step.classList.remove('is-waiting');
        step.classList.add('is-typing');
        body.scrollTop = body.scrollHeight;
        (function type() {
          if (mine !== run) return;
          n += 1;
          cmd.textContent = full.slice(0, n);
          if (n < full.length) return setTimeout(type, delay);
          setTimeout(function () {
            if (mine !== run) return;
            step.classList.remove('is-typing');
            body.scrollTop = body.scrollHeight;
            setTimeout(nextStep, 650);
          }, 280);
        })();
      }
      nextStep();
    }

    term.playOnce = function () {
      if (term.dataset.played) return;
      if (reducedMotion) {
        term.dataset.played = 'true';
        return;
      }
      play();
    };
    if (replay) replay.addEventListener('click', play);
    // Clicking a running terminal shows everything at once.
    body.addEventListener('click', function () {
      if (term.querySelector('.is-waiting, .is-typing')) {
        run += 1;
        finish();
      }
    });
  }

  function playTerms(scope) {
    scope.querySelectorAll('[data-term]').forEach(function (term) {
      if (term.offsetParent !== null && term.playOnce) term.playOnce();
    });
  }

  function initLightbox(root) {
    var dialog;
    root.querySelectorAll('[data-zoom]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!dialog) {
          dialog = document.createElement('dialog');
          dialog.className = 'oe-lightbox';
          dialog.appendChild(document.createElement('img'));
          dialog.addEventListener('click', function () { dialog.close(); });
          root.appendChild(dialog);
        }
        var img = dialog.querySelector('img');
        img.src = btn.dataset.zoom;
        img.alt = btn.parentElement.querySelector('img').alt;
        dialog.showModal();
      });
    });
  }

  function initDeck(deck) {
    var track = deck.querySelector('[data-deck-track]');
    var cards = Array.prototype.slice.call(deck.querySelectorAll('[data-card]'));
    if (!track || !cards.length) return;

    var bar = deck.querySelector('[data-deck-bar]');
    var dotsBox = deck.querySelector('[data-deck-dots]');
    var count = deck.querySelector('[data-deck-count]');
    var prev = deck.querySelector('[data-deck-prev]');
    var next = deck.querySelector('[data-deck-next]');
    var fs = deck.querySelector('[data-deck-fullscreen]');
    var current = 0;
    var inView = false;

    deck.classList.add('is-js');
    bar.hidden = false;

    var dots = cards.map(function (card, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'oe-dot';
      dot.setAttribute('role', 'tab');
      dot.textContent = card.dataset.nav || String(i + 1);
      dot.title = card.dataset.nav || '';
      dot.addEventListener('click', function () { go(i); });
      dotsBox.appendChild(dot);
      return dot;
    });

    function go(i, instant) {
      i = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({ left: cards[i].offsetLeft - track.offsetLeft, behavior: instant || reducedMotion ? 'auto' : 'smooth' });
    }

    function setCurrent(i, silent) {
      current = i;
      dots.forEach(function (d, n) {
        d.setAttribute('aria-selected', n === i ? 'true' : 'false');
      });
      count.textContent = (i + 1) + ' / ' + cards.length;
      prev.disabled = i === 0;
      next.disabled = i === cards.length - 1;
      if (inView) playTerms(cards[i]);
      if (!silent && cards[i].id && history.replaceState) {
        history.replaceState(null, '', i === 0 ? location.pathname + location.search : '#' + cards[i].id);
      }
    }

    prev.addEventListener('click', function () { go(current - 1); });
    next.addEventListener('click', function () { go(current + 1); });

    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(cards.indexOf(entry.target), !inView);
      });
    }, { root: track, threshold: 0.6 });
    cards.forEach(function (card) { cardObserver.observe(card); });

    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) playTerms(cards[current]);
    }, { threshold: 0.5 }).observe(deck);

    // "Show the example" swaps the demo for the code.
    deck.querySelectorAll('[data-example-toggle]').forEach(function (btn) {
      var card = btn.closest('[data-card]');
      var label = btn.querySelector('[data-example-label]');
      btn.addEventListener('click', function () {
        var open = card.classList.toggle('show-example');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        label.textContent = open ? btn.dataset.labelHide : btn.dataset.labelShow;
        if (!open) playTerms(card);
      });
    });

    if (fs) {
      if (!deck.requestFullscreen) {
        fs.hidden = true;
      } else {
        fs.addEventListener('click', toggleFullscreen);
        deck.addEventListener('fullscreenchange', function () { go(current, true); });
      }
    }

    function toggleFullscreen() {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (deck.requestFullscreen) deck.requestFullscreen();
    }

    document.addEventListener('keydown', function (e) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
      if (!inView && !deck.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { go(current + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { go(current - 1); e.preventDefault(); }
      else if (e.key === 'Home') { go(0); e.preventDefault(); }
      else if (e.key === 'End') { go(cards.length - 1); e.preventDefault(); }
      else if (e.key === 'f' && deck.requestFullscreen) toggleFullscreen();
    });

    initTabs(deck);
    deck.querySelectorAll('[data-term]').forEach(initTerm);
    initLightbox(deck);

    // Deep link: /blog/post/#events opens the deck on that card.
    function fromHash(instant) {
      var id = decodeURIComponent(location.hash.slice(1));
      var i = cards.findIndex(function (c) { return c.id === id; });
      if (i < 0) return;
      deck.scrollIntoView({ block: 'start' });
      go(i, instant);
    }
    window.addEventListener('hashchange', function () { fromHash(false); });
    setCurrent(0, true);
    if (location.hash) requestAnimationFrame(function () { fromHash(true); });
  }

  function start() {
    document.querySelectorAll('[data-deck]').forEach(initDeck);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
