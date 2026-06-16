'use client';
import { useRef, useEffect } from 'react';


export function ScrollSparrow() {
  /* ── Refs for every animated SVG element ── */
  const birdRootRef = useRef<SVGSVGElement>(null);
  const lwRef       = useRef<SVGPathElement>(null);
  const lw2Ref      = useRef<SVGPathElement>(null);
  const rwRef       = useRef<SVGPathElement>(null);
  const rw2Ref      = useRef<SVGPathElement>(null);
  const lwbarRef    = useRef<SVGPathElement>(null);
  const rwbarRef    = useRef<SVGPathElement>(null);
  const lwtipsRef   = useRef<SVGPathElement>(null);
  const rwtipsRef   = useRef<SVGPathElement>(null);
  const legsRef     = useRef<SVGGElement>(null);

  useEffect(() => {
    /* ── Grab elements ── */
    const birdRoot = birdRootRef.current;
    const lw = lwRef.current;
    const lw2 = lw2Ref.current;
    const rw = rwRef.current;
    const rw2 = rw2Ref.current;
    const lwbar = lwbarRef.current;
    const rwbar = rwbarRef.current;
    const lwtips = lwtipsRef.current;
    const rwtips = rwtipsRef.current;
    const legs = legsRef.current;
    if (!birdRoot || !lw || !lw2 || !rw || !rw2) return;

    const bird = birdRoot;
    const leftWing = lw;
    const leftWing2 = lw2;
    const rightWing = rw;
    const rightWing2 = rw2;

    /* ── Helpers ── */
    const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const ease  = (t: number) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;
    const easeCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

    /* ── Wing shape ── */
    function setWings(flapT: number, spread: number) {
      const lift  = lerp(-4, 26, flapT) * spread;
      const droop = lerp(14, 0,  flapT) * spread;
      const chord = 18;
      const minChord = 10;
      const minReach = 10;

      const ltip = Math.min(56 - minReach, lerp(52, 12, spread));
      const rtip = Math.max(64 + minReach, lerp(68, 108, spread));
      const lmid = lerp(54, 32, spread);
      const rmid = lerp(66, 88, spread);

      const leadY   = 60 - lift;
      const trailY  = 60 + Math.max(minChord, chord + droop);
      const rootTop = 59;
      const rootBot = 59 + chord * 0.8;
      const tipChord = Math.max(minChord, chord * 0.55 + droop * 0.4);

      leftWing.setAttribute('d',
        `M56 ${rootTop}
         C ${lmid}     ${leadY - 1},
           ${ltip + 9} ${leadY - 2},
           ${ltip}     ${leadY}
         C ${ltip + 2} ${leadY + tipChord * 0.5},
           ${ltip + 5} ${leadY + tipChord - 1},
           ${ltip + 8} ${leadY + tipChord}
         C ${lmid + 4} ${trailY + droop * 0.1},
           56           ${rootBot + 1},
           56           ${rootBot}
         Z`
      );
      leftWing2.setAttribute('d', 'M0 0 Z');

      rightWing.setAttribute('d',
        `M64 ${rootTop}
         C ${rmid}     ${leadY - 1},
           ${rtip - 9} ${leadY - 2},
           ${rtip}     ${leadY}
         C ${rtip - 2} ${leadY + tipChord * 0.5},
           ${rtip - 5} ${leadY + tipChord - 1},
           ${rtip - 8} ${leadY + tipChord}
         C ${rmid - 4} ${trailY + droop * 0.1},
           64           ${rootBot + 1},
           64           ${rootBot}
         Z`
      );
      rightWing2.setAttribute('d', 'M0 0 Z');

      lwbar?.setAttribute('d',   'M0 0 Z');
      rwbar?.setAttribute('d',   'M0 0 Z');
      lwtips?.setAttribute('d',  'M0 0 Z');
      rwtips?.setAttribute('d',  'M0 0 Z');
    }

    /* ── Animation loop ── */
    let flapAngle = 0;
    let flapDir   = 1;
    let lastTs    = 0;
    let rafId: number;

    /*
      The scroll progress `p` maps 0→1 over the full page height.
      It intentionally reads window.scrollY so it works alongside your
      existing GSAP ScrollTrigger setup without conflict.
    */
    function frame(ts: number) {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      const scrollY   = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = clamp(scrollY / maxScroll, 0, 1);

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Half the SVG width/height so positioning is centre-based, viewport-relative
      const hw = 60; // half of 120px SVG

      // All x positions as fractions of vw — never hardcoded pixels
      // Path: centre → veer left → sweep right → back left → exit below-left
      const xCentre = vw * 0.1 - hw;
      const xLeft1  = vw * 0.12 - hw;   // first left veer
      const xRight  = vw * 0.82 - hw;   // rightward sweep
      const xLeft2  = vw * 0.18 - hw;   // second left pass
      const xExit   = vw * 0.08 - hw;   // exit off left-bottom

      // y positions as fractions of vh
      const yPerch  = vh * 0.08;         // high up — space before about section
      const yDive   = vh * 0.30;
      const yLeft1  = vh * 0.38;
      const yRight  = vh * 0.58;
      const yLeft2  = vh * 0.74;
      const yExit   = vh * 1.08;         // below viewport — disappears naturally

      let bx: number, by: number, rot: number, scale: number;
      let flapSpeed: number, flapAmp: number, spread: number, legOp: number;

      if (p < 0.07) {
        /* ── Perched high, still — plenty of space above about section ── */
        bx = xCentre;
        by = yPerch;
        rot = 0; scale = 1.1;
        flapSpeed = 0; flapAmp = 0; spread = 0.06; legOp = 1;

      } else if (p < 0.16) {
        /* ── Alert: leans forward, weight shift ── */
        const t = ease((p - 0.07) / 0.09);
        bx = xCentre;
        by = yPerch;
        rot = lerp(0, 26, t);
        scale = lerp(1.1, 1.05, t);
        flapSpeed = 0; flapAmp = 0;
        spread = lerp(0.06, 0.14, t);
        legOp = lerp(1, 0, t);

      } else if (p < 0.26) {
        /* ── Tuck & drop — nose straight down ── */
        const t = easeCubic((p - 0.16) / 0.10);
        bx = lerp(xCentre, xCentre, t);
        by = lerp(yPerch, yDive, t);
        rot = lerp(26, 90, t);
        scale = lerp(1.05, 0.92, t);
        flapSpeed = 0; flapAmp = 0;
        spread = lerp(0.14, 0.05, t);
        legOp = 0;

      } else if (p < 0.36) {
        /* ── Wings snap open, veer LEFT — first turn ── */
        const t = easeCubic((p - 0.26) / 0.10);
        bx = lerp(xCentre, xLeft1, t);
        by = lerp(yDive, yLeft1, t);
        // rotates from nose-down (90°) to banked-left (~-30° = tilted left & forward)
        rot = lerp(90, -28, t);
        scale = lerp(0.92, 1.18, t);
        flapSpeed = 9; flapAmp = lerp(0, 1.0, t);
        spread = lerp(0.05, 1.0, t);
        legOp = 0;

      } else if (p < 0.55) {
        /* ── Sweep RIGHT across the page ── */
        const t = ease((p - 0.36) / 0.19);
        bx = lerp(xLeft1, xRight, t);
        by = lerp(yLeft1, yRight, t);
        // bank right as it sweeps across: -30° → +32°
        rot = lerp(-28, 32, t);
        scale = lerp(1.18, 1.10, t);
        flapSpeed = 6; flapAmp = 0.88; spread = 1.0; legOp = 0;

      } else if (p < 0.74) {
        /* ── Veer back LEFT — second turn ── */
        const t = ease((p - 0.55) / 0.19);
        bx = lerp(xRight, xLeft2, t);
        by = lerp(yRight, yLeft2, t);
        // bank left again: +32° → -20°
        rot = lerp(32, -20, t);
        scale = lerp(1.10, 1.04, t);
        flapSpeed = lerp(6, 4, t); flapAmp = lerp(0.88, 0.65, t);
        spread = lerp(1.0, 0.85, t); legOp = 0;

      } else if (p < 0.88) {
        /* ── Descend toward exit — nose tips down-left ── */
        const t = ease((p - 0.74) / 0.14);
        bx = lerp(xLeft2, xExit, t);
        by = lerp(yLeft2, vh * 0.90, t);
        rot = lerp(-20, 50, t);   // tips nose downward
        scale = lerp(1.04, 0.95, t);
        flapSpeed = lerp(4, 1.5, t); flapAmp = lerp(0.65, 0.15, t);
        spread = lerp(0.85, 0.55, t); legOp = 0;

      } else {
        /* ── Exit below viewport ── */
        const t = ease((p - 0.88) / 0.12);
        bx = lerp(xExit, xExit - vw * 0.06, t);
        by = lerp(vh * 0.90, yExit, t);
        rot = lerp(50, 65, t);
        scale = lerp(0.95, 0.80, t);
        flapSpeed = lerp(1.5, 0.4, t); flapAmp = lerp(0.15, 0.0, t);
        spread = lerp(0.55, 0.40, t); legOp = 0;
      }

      /* Flap oscillator — runs independently of scroll speed */
      if (flapAmp > 0.02) {
        flapAngle += flapDir * flapSpeed * dt;
        if (Math.abs(flapAngle) > 1) flapDir *= -1;
      } else {
        flapAngle *= 0.88;
      }

      const flapT = clamp((Math.sin(flapAngle) + 1) / 2, 0, 1) * flapAmp;
      setWings(flapT, spread);

      if (legs) legs.style.opacity = String(clamp(legOp, 0, 1));
      bird.style.opacity   = p < 0.025 ? String(p / 0.025) : '1';
      bird.style.transform = `translate(${bx}px, ${by}px) rotate(${rot}deg) scale(${scale})`;

      rafId = requestAnimationFrame(frame);
    }

    lastTs = performance.now();
    rafId  = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    /* Fixed layer — sits over your page content, pointer-events off so
       it never blocks clicks on your text/buttons/links */
    <div
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        50,
      }}
    >
      <svg
        ref={birdRootRef}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position:        'absolute',
          top:             0,
          left:            0,
          width:           '80px',
          height:          '80px',
          willChange:      'transform, opacity',
          transformOrigin: '60px 60px',
          filter:          'drop-shadow(0 0 14px rgba(255,255,255,0.2))',
        }}
      >
        {/* ── TAIL — 5 individual feathers ── */}
        <g id="tail-group">
          {/* outermost left */}
          <path fill="white"
            d="M51 73 C 45 80, 40 90, 37 103 C 39 103, 42 103, 44 103 C 46 91, 48 81, 52 74 Z"/>
          <path fill="white" opacity={0.55}
            d="M51 73 C 45 80, 40 90, 37 103 C 38 102, 38 101, 39 100 C 41 89, 45 79, 51 73 Z"/>
          {/* outer-mid left */}
          <path fill="white"
            d="M54 73 C 50 81, 47 92, 46 107 C 48 107, 51 107, 53 107 C 53 93, 54 82, 56 74 Z"/>
          <path fill="white" opacity={0.45}
            d="M54 73 C 50 81, 47 92, 46 107 C 47 106, 47 105, 48 104 C 49 91, 52 81, 54 73 Z"/>
          {/* centre — longest */}
          <path fill="white"
            d="M57 73 C 56 83, 55 95, 55 110 C 57 111, 60 111, 63 111 C 62 96, 62 84, 62 74 Z"/>
          <line x1={59} y1={74} x2={59} y2={108}
            stroke="white" strokeWidth={0.8} opacity={0.4} strokeLinecap="round"/>
          {/* outer-mid right */}
          <path fill="white"
            d="M64 73 C 67 81, 70 92, 72 107 C 70 107, 67 107, 65 107 C 65 93, 64 82, 63 74 Z"/>
          <path fill="white" opacity={0.45}
            d="M64 73 C 67 81, 70 92, 72 107 C 71 106, 71 105, 70 104 C 68 91, 66 81, 64 73 Z"/>
          {/* outermost right */}
          <path fill="white"
            d="M67 73 C 73 80, 78 90, 81 103 C 79 103, 76 103, 74 103 C 72 91, 70 81, 66 74 Z"/>
          <path fill="white" opacity={0.55}
            d="M67 73 C 73 80, 78 90, 81 103 C 80 102, 80 101, 79 100 C 77 89, 73 79, 67 73 Z"/>
        </g>

        {/* ── WINGS — paths rewritten every frame by setWings() ── */}
        <path ref={lwRef}    fill="white" opacity={0.97} d="M0 0 Z"/>
        <path ref={lw2Ref}   fill="white" opacity={0}    d="M0 0 Z"/>
        <path ref={rwRef}    fill="white" opacity={0.97} d="M0 0 Z"/>
        <path ref={rw2Ref}   fill="white" opacity={0}    d="M0 0 Z"/>
        <path ref={lwbarRef}  fill="white" opacity={0}   d="M0 0 Z"/>
        <path ref={rwbarRef}  fill="white" opacity={0}   d="M0 0 Z"/>
        <path ref={lwtipsRef} fill="white" opacity={0}   d="M0 0 Z"/>
        <path ref={rwtipsRef} fill="white" opacity={0}   d="M0 0 Z"/>

        {/* ── BODY ── */}
        <ellipse cx={60} cy={66} rx={10} ry={7}   fill="white"/>
        <ellipse cx={60} cy={68} rx={7.5} ry={5.5} fill="white" opacity={0.6}/>

        {/* ── HEAD ── */}
        <ellipse cx={60} cy={54} rx={9} ry={9} fill="white"/>
        {/* eye — dark pupil with catchlight */}
        <circle cx={65}   cy={52}    r={2}    fill="#0a1628"/>
        <circle cx={65.6} cy={51.4}  r={0.55} fill="rgba(255,255,255,0.85)"/>
        {/* beak */}
        <path fill="white" d="M68 51 L76 50 L68 54 Z"/>
        <path fill="white" opacity={0.9} d="M68 53 L75 53 L68 55 Z"/>

        {/* ── LEGS — hidden during flight ── */}
        <g ref={legsRef}>
          <line x1={57} y1={73} x2={54} y2={86} stroke="white" strokeWidth={1.1} strokeLinecap="round" opacity={0.8}/>
          <line x1={54} y1={86} x2={49} y2={88} stroke="white" strokeWidth={0.9} strokeLinecap="round" opacity={0.7}/>
          <line x1={54} y1={86} x2={54} y2={90} stroke="white" strokeWidth={0.9} strokeLinecap="round" opacity={0.7}/>
          <line x1={54} y1={86} x2={58} y2={89} stroke="white" strokeWidth={0.9} strokeLinecap="round" opacity={0.7}/>
          <line x1={63} y1={73} x2={66} y2={86} stroke="white" strokeWidth={1.1} strokeLinecap="round" opacity={0.8}/>
          <line x1={66} y1={86} x2={61} y2={88} stroke="white" strokeWidth={0.9} strokeLinecap="round" opacity={0.7}/>
          <line x1={66} y1={86} x2={66} y2={90} stroke="white" strokeWidth={0.9} strokeLinecap="round" opacity={0.7}/>
          <line x1={66} y1={86} x2={71} y2={89} stroke="white" strokeWidth={0.9} strokeLinecap="round" opacity={0.7}/>
        </g>
      </svg>
    </div>
  );
}
