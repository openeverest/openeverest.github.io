(function () {
    const hero = document.getElementById('hero-section');
    const canvas = document.getElementById('hero-tiles');
    if (!hero || !canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const TILE = 22;            // base tile size (px)
    const GAP = 6;              // space between tiles
    const STEP = TILE + GAP;
    const RADIUS = 4;           // corner radius
    const HOVER_RADIUS = 140;   // magnification reach around cursor
    const MAX_SCALE = 1.8;      // scale of tile directly under cursor
    const PUSH = 14;            // how far neighbours are pushed away from the cursor (px)
    const EASE = 0.18;          // how quickly tiles follow the target scale

    // Blue-ish palette: hue drifts between indigo and sky blue (brand #7790DE ≈ 225°).
    const HUE_MIN = 208;
    const HUE_MAX = 232;

    let width = 0, height = 0, dpr = 1;
    let cols = 0, rows = 0;
    let tiles = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let rafId = null;
    let visible = true;

    function resize() {
        const rect = hero.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        cols = Math.ceil(width / STEP) + 1;
        rows = Math.ceil(height / STEP) + 1;
        const offsetX = (width - (cols - 1) * STEP) / 2;
        const offsetY = (height - (rows - 1) * STEP) / 2;

        tiles = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                tiles.push({
                    x: offsetX + c * STEP,
                    y: offsetY + r * STEP,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.25 + Math.random() * 0.5,
                    scale: 1,
                    push: 0,
                    dx: 0,
                    dy: 0,
                });
            }
        }
        if (reduceMotion) draw(0);
    }

    function roundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function draw(t) {
        ctx.clearRect(0, 0, width, height);
        const time = t / 1000;

        const k = reduceMotion ? 1 : EASE;
        const hot = [];

        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];

            let target = 1;
            let targetPush = 0;
            if (mouse.active) {
                const dx = tile.x - mouse.x;
                const dy = tile.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < HOVER_RADIUS) {
                    let p = 1 - dist / HOVER_RADIUS;
                    p = p * p * (3 - 2 * p); // smoothstep
                    target = 1 + (MAX_SCALE - 1) * p;
                    // Fisheye: push outward, strongest mid-radius, zero at centre and edge.
                    targetPush = PUSH * Math.sin(Math.PI * (dist / HOVER_RADIUS));
                    if (dist > 0.001) {
                        tile.dx = dx / dist;
                        tile.dy = dy / dist;
                    }
                }
            }
            tile.scale += (target - tile.scale) * k;
            tile.push += (targetPush - tile.push) * k;

            if (tile.scale > 1.01) {
                hot.push(tile);
            } else {
                drawTile(tile, time);
            }
        }

        // Draw magnified tiles last, smallest first, so the biggest sit on top.
        hot.sort((a, b) => a.scale - b.scale);
        for (let i = 0; i < hot.length; i++) drawTile(hot[i], time);
    }

    function drawTile(tile, time) {
        // Slow diagonal colour wave across the grid plus per-tile shimmer.
        const wave = Math.sin(tile.x * 0.006 + tile.y * 0.004 - time * 0.6);
        const shimmer = Math.sin(time * tile.speed + tile.phase);
        const mix = (wave * 0.6 + shimmer * 0.4 + 1) / 2; // 0..1
        const heat = (tile.scale - 1) / (MAX_SCALE - 1);   // 0..1

        const hue = HUE_MIN + (HUE_MAX - HUE_MIN) * mix;
        const sat = 55 + 20 * mix;
        const light = 64 - 4 * heat;
        const sparkle = Math.pow(Math.max(0, shimmer), 24); // occasional brief glint
        const alpha = 0.06 + 0.06 * mix + 0.05 * sparkle + 0.12 * heat;

        const size = TILE * tile.scale;
        const cx = tile.x + tile.dx * tile.push;
        const cy = tile.y + tile.dy * tile.push;
        ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${sat.toFixed(0)}%, ${light.toFixed(1)}%, ${alpha.toFixed(3)})`;
        roundRect(cx - size / 2, cy - size / 2, size, size, RADIUS * tile.scale);
        ctx.fill();
    }

    function loop(t) {
        draw(t);
        rafId = visible ? requestAnimationFrame(loop) : null;
    }

    function start() {
        if (!rafId && !reduceMotion) rafId = requestAnimationFrame(loop);
    }

    function redrawStatic() {
        if (reduceMotion) draw(0);
    }

    hero.addEventListener('mousemove', function (e) {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
        redrawStatic();
    });
    hero.addEventListener('mouseleave', function () {
        mouse.active = false;
        redrawStatic();
    });

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            if (visible) start();
        }).observe(hero);
    }

    if ('ResizeObserver' in window) {
        new ResizeObserver(resize).observe(hero);
    } else {
        window.addEventListener('resize', resize);
    }

    resize();
    start();
})();
