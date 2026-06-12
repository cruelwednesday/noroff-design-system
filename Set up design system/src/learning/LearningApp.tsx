import React, { useState } from 'react';

// ─── Color utilities ────────────────────────────────────────────────────────

function cmykToRgb(c: number, m: number, y: number, k: number) {
  return {
    r: Math.round(255 * (1 - c / 100) * (1 - k / 100)),
    g: Math.round(255 * (1 - m / 100) * (1 - k / 100)),
    b: Math.round(255 * (1 - y / 100) * (1 - k / 100)),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
}

function rgbToHsl(r: number, g: number, b: number) {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
  else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
  else h = ((r1 - g1) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// ─── Design tokens ──────────────────────────────────────────────────────────

const RED = '#E12B21';
const DARK = '#1A1A19';
const MUTED = '#5C5C5B';
const BORDER = '#DBDBD9';
const SURFACE = '#F4F4F2';
const SIDEBAR_W = 272;

// ─── Shared UI ──────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
      color: '#8F8E8D', fontWeight: 600, margin: '0 0 8px',
    }}>
      {children}
    </p>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre style={{
      background: DARK, color: '#F4F4F2', borderRadius: 8, padding: '18px 22px',
      fontFamily: '"IBM Plex Mono", "Roboto Mono", "Courier New", monospace',
      fontSize: 13, lineHeight: 1.75, overflowX: 'auto', margin: 0, whiteSpace: 'pre',
    }}>
      {children}
    </pre>
  );
}

function Slider({ label, value, min, max, step = 1, unit = '', onChange }: {
  label: string; value: number; min: number; max: number;
  step?: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#40403E', fontFamily: 'monospace' }}>{label}</span>
        <span style={{ fontSize: 13, fontFamily: 'monospace', color: RED, fontWeight: 700 }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: RED, cursor: 'pointer', display: 'block' }}
      />
    </div>
  );
}

function LessonHeader({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: `1px solid ${BORDER}` }}>
      <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8F8E8D', margin: '0 0 10px' }}>
        Lesson {num}
      </p>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: DARK, margin: '0 0 14px', lineHeight: 1.2 }}>
        {title}
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, maxWidth: 560, margin: 0 }}>{desc}</p>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 24, padding: '14px 18px', background: '#FFF8F7', border: `1px solid #FFABA6`, borderRadius: 8 }}>
      <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}

function TableRow({ cols, isHeader }: { cols: string[]; isHeader?: boolean }) {
  return (
    <>
      {cols.map((cell, i) => (
        <div key={i} style={{
          padding: '9px 14px',
          background: isHeader ? '#40403E' : i === 0 ? SURFACE : '#fff',
          border: !isHeader && i > 0 ? `1px solid ${BORDER}` : 'none',
          color: isHeader ? '#8F8E8D' : i === 1 ? RED : MUTED,
          fontSize: isHeader ? 11 : 13,
          fontFamily: !isHeader && i === 1 ? 'monospace' : 'Inter, sans-serif',
          fontWeight: isHeader ? 600 : i === 1 ? 600 : 400,
          textTransform: isHeader ? 'uppercase' : undefined,
          letterSpacing: isHeader ? '0.1em' : undefined,
        }}>
          {cell}
        </div>
      ))}
    </>
  );
}

// ─── 00 Welcome ─────────────────────────────────────────────────────────────

function WelcomeLesson({ onStart }: { onStart: () => void }) {
  const chapters = [
    { n: '01', t: 'Colors', s: 'CMYK → Hex & RGB' },
    { n: '02', t: 'Typography', s: 'Leading → line-height' },
    { n: '03', t: 'The Box Model', s: 'Margins & Padding' },
    { n: '04', t: 'Layers', s: 'Stacking & z-index' },
    { n: '05', t: 'Grids', s: 'Column grids in CSS' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, color: DARK, margin: '0 0 24px', lineHeight: 1.15 }}>
          You already<br />speak design.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: MUTED, maxWidth: 540, margin: '0 0 16px' }}>
          Code is just another language for the same ideas. You already understand colour,
          typography, spacing, and layout — you've spent years mastering them.
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: MUTED, maxWidth: 540, margin: '0 0 40px' }}>
          These five lessons translate what you know from print into the language a browser
          understands. Every concept is interactive — drag sliders and watch the code update live.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 48 }}>
        {chapters.map(c => (
          <div key={c.n} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: 18, background: '#fff' }}>
            <p style={{ fontSize: 11, color: '#8F8E8D', margin: '0 0 8px', fontFamily: 'monospace' }}>{c.n}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: DARK, margin: '0 0 4px' }}>{c.t}</p>
            <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>{c.s}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{
          background: RED, color: '#fff', border: 'none', borderRadius: 6,
          padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em',
        }}
      >
        Start with Lesson 01: Colors
      </button>
    </div>
  );
}

// ─── 01 Colors ──────────────────────────────────────────────────────────────

function ColorsLesson() {
  // Initial values produce Noroff red (#E12B21)
  const [c, setC] = useState(0);
  const [m, setM] = useState(81);
  const [y, setY] = useState(85);
  const [k, setK] = useState(12);

  const { r, g, b } = cmykToRgb(c, m, y, k);
  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const isLight = (r * 299 + g * 587 + b * 114) / 1000 > 128;

  const code =
    `/* Use any of these in your CSS — they're all the same colour */
.element {
  color: ${hex};
  /* or */
  color: rgb(${r}, ${g}, ${b});
  /* or */
  color: hsl(${hsl.h}deg ${hsl.s}% ${hsl.l}%);
}`;

  return (
    <div>
      <LessonHeader
        num="01"
        title="Colors"
        desc="In print you work with CMYK. On screen, everything is RGB. CSS gives you three ways to write the same colour — Hex, RGB, and HSL. Move the sliders and watch all three formats update simultaneously."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div>
          <Label>Adjust CMYK (what you know)</Label>
          <div style={{ background: SURFACE, borderRadius: 8, padding: '20px 24px' }}>
            <Slider label="Cyan (C)" value={c} min={0} max={100} unit="%" onChange={setC} />
            <Slider label="Magenta (M)" value={m} min={0} max={100} unit="%" onChange={setM} />
            <Slider label="Yellow (Y)" value={y} min={0} max={100} unit="%" onChange={setY} />
            <Slider label="Black (K)" value={k} min={0} max={100} unit="%" onChange={setK} />
          </div>
        </div>

        <div>
          <Label>Live colour preview</Label>
          <div style={{
            background: hex, borderRadius: 8, height: 148, border: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: isLight ? DARK : '#fff', fontFamily: 'monospace' }}>
              {hex}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Hex', value: hex },
              { label: 'RGB', value: `${r}, ${g}, ${b}` },
              { label: 'HSL', value: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` },
            ].map(item => (
              <div key={item.label} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 6, padding: '10px 12px' }}>
                <p style={{ fontSize: 10, color: '#8F8E8D', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 11, fontFamily: 'monospace', color: DARK, fontWeight: 600, margin: 0, wordBreak: 'break-all' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Label>The CSS</Label>
      <Code>{code}</Code>

      <Tip>
        <strong style={{ color: DARK }}>Which format to use?</strong> Hex is what you'll see most in
        the wild — short and familiar. HSL is the most designer-friendly: Hue is the colour wheel
        angle (0–360°), Saturation is intensity, Lightness is brightness. Great for building
        tint and shade scales.
      </Tip>
    </div>
  );
}

// ─── 02 Typography ──────────────────────────────────────────────────────────

function TypographyLesson() {
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontWeight, setFontWeight] = useState(400);

  const weights = [300, 400, 500, 600, 700];

  const code =
    `.heading {
  font-size: ${fontSize}px;        /* Point size in print */
  line-height: ${lineHeight};          /* Leading in print */
  letter-spacing: ${letterSpacing}em; /* Tracking in print */
  font-weight: ${fontWeight};          /* 400 = Regular, 700 = Bold */
}`;

  const rows = [
    ['Print term', 'CSS property'],
    ['Point size', 'font-size'],
    ['Leading', 'line-height'],
    ['Tracking', 'letter-spacing'],
    ['Weight (Regular/Bold)', 'font-weight'],
    ['Font family', 'font-family'],
  ];

  return (
    <div>
      <LessonHeader
        num="02"
        title="Typography"
        desc="Every typographic control you use in InDesign or Illustrator has a direct equivalent in CSS. Leading becomes line-height. Tracking becomes letter-spacing. Adjust the controls and watch the text respond."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 28 }}>
        {rows.map((row, i) => (
          <TableRow key={i} cols={row} isHeader={i === 0} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div>
          <Label>Adjust the properties</Label>
          <div style={{ background: SURFACE, borderRadius: 8, padding: '20px 24px' }}>
            <Slider label="font-size" value={fontSize} min={12} max={64} unit="px" onChange={setFontSize} />
            <Slider label="line-height (leading)" value={lineHeight} min={1.0} max={3.0} step={0.05} onChange={setLineHeight} />
            <Slider label="letter-spacing (tracking)" value={letterSpacing} min={-0.1} max={0.5} step={0.01} unit="em" onChange={setLetterSpacing} />

            <div style={{ marginTop: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#40403E', fontFamily: 'monospace', margin: '0 0 8px' }}>
                font-weight
              </p>
              <div style={{ display: 'flex', gap: 6 }}>
                {weights.map(w => (
                  <button key={w} onClick={() => setFontWeight(w)} style={{
                    flex: 1, padding: '8px 4px', border: `1px solid ${fontWeight === w ? RED : BORDER}`,
                    borderRadius: 4, background: fontWeight === w ? '#FFF0EF' : '#fff',
                    color: fontWeight === w ? RED : MUTED, fontSize: 12, fontWeight: w,
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  }}>
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label>Live preview</Label>
          <div style={{
            border: `1px solid ${BORDER}`, borderRadius: 8, padding: 28, background: '#fff',
            minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <p style={{
              fontSize, lineHeight, letterSpacing: `${letterSpacing}em`,
              fontWeight, margin: 0, color: DARK, fontFamily: 'Inter, sans-serif',
            }}>
              The quick brown fox jumps over the lazy dog. Design is the silent ambassador of your brand.
            </p>
          </div>
        </div>
      </div>

      <Label>The CSS</Label>
      <Code>{code}</Code>

      <Tip>
        <strong style={{ color: DARK }}>Note on units:</strong> In print, leading is measured in
        points (e.g. 24pt leading on 18pt type). In CSS, <code style={{ background: SURFACE, padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>line-height</code> is
        a unitless ratio — 1.6 means 160% of the font size. A ratio of 1.4–1.6 is usually good for body text.
      </Tip>
    </div>
  );
}

// ─── 03 Box Model ───────────────────────────────────────────────────────────

function BoxModelLesson() {
  const [padding, setPadding] = useState(24);
  const [margin, setMargin] = useState(32);
  const [borderWidth, setBorderWidth] = useState(2);

  const code =
    `.element {
  padding: ${padding}px;       /* Inner breathing room */
  margin: ${margin}px;        /* Space pushing others away */
  border: ${borderWidth}px solid #40403E; /* The stroke/outline */

  /* Shorthand padding — set each side individually: */
  /* padding-top: 16px; */
  /* padding-right: 32px; */
  /* padding-bottom: 16px; */
  /* padding-left: 32px; */
}`;

  const rows = [
    ['Design concept', 'CSS name', 'What it does'],
    ['Content area', 'content', 'The actual text or image'],
    ['Inner whitespace', 'padding', 'Space between content and the edge'],
    ['Stroke / Outline', 'border', 'A line drawn around the element'],
    ['Outer whitespace / Margin guides', 'margin', 'Space between this and other elements'],
  ];

  return (
    <div>
      <LessonHeader
        num="03"
        title="The Box Model"
        desc="In CSS, every single element — a paragraph, a button, an image — is a rectangle. That rectangle has four layers: content, padding, border, and margin. You already know these ideas; they just have different names."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginBottom: 28 }}>
        {rows.map((row, i) => (
          <TableRow key={i} cols={row} isHeader={i === 0} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div>
          <Label>Adjust the box</Label>
          <div style={{ background: SURFACE, borderRadius: 8, padding: '20px 24px' }}>
            <Slider label="padding" value={padding} min={0} max={64} unit="px" onChange={setPadding} />
            <Slider label="margin" value={margin} min={0} max={64} unit="px" onChange={setMargin} />
            <Slider label="border-width" value={borderWidth} min={0} max={16} unit="px" onChange={setBorderWidth} />
          </div>
        </div>

        <div>
          <Label>Live box model diagram</Label>
          {/* Margin (blue) */}
          <div style={{ background: '#DBEAFE', padding: margin, borderRadius: 4, position: 'relative' }}>
            <p style={{ position: 'absolute', top: 4, left: 8, fontSize: 10, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontWeight: 600 }}>
              margin ({margin}px)
            </p>
            {/* Border */}
            <div style={{ border: `${borderWidth}px solid #40403E`, background: '#FEF3C7' }}>
              {/* Padding (green) */}
              <div style={{ padding, background: '#D1FAE5', position: 'relative' }}>
                <p style={{ position: 'absolute', top: 4, left: 8, fontSize: 10, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, fontWeight: 600 }}>
                  padding ({padding}px)
                </p>
                {/* Content */}
                <div style={{ background: '#fff', padding: '12px 16px', textAlign: 'center', border: `1px dashed ${BORDER}` }}>
                  <p style={{ margin: 0, fontSize: 13, color: DARK, fontWeight: 500 }}>Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Label>The CSS</Label>
      <Code>{code}</Code>

      <Tip>
        <strong style={{ color: DARK }}>Quick mental model:</strong> Padding is like the inset content
        boundary in an InDesign text frame — it keeps content away from the edges. Margin is like the
        white space you leave between frames on a spread. Border is the stroke you'd add to a frame.
      </Tip>
    </div>
  );
}

// ─── 04 Layers ──────────────────────────────────────────────────────────────

function LayersLesson() {
  const [zA, setZA] = useState(1);
  const [zB, setZB] = useState(2);
  const [zC, setZC] = useState(3);

  type Layer = { name: string; z: number; bg: string; text: string };
  const layers: Layer[] = [
    { name: 'Box A', z: zA, bg: RED, text: '#fff' },
    { name: 'Box B', z: zB, bg: '#40403E', text: '#fff' },
    { name: 'Box C', z: zC, bg: '#FFABA6', text: DARK },
  ];
  const sorted = [...layers].sort((a, b) => b.z - a.z);

  const code =
    `.box-a { position: relative; z-index: ${zA}; }
.box-b { position: relative; z-index: ${zB}; }
.box-c { position: relative; z-index: ${zC}; }

/* Layer order right now (front → back): */
/* ${sorted.map(l => l.name).join(' → ')} */

/* z-index only works with position: relative/absolute/fixed */`;

  return (
    <div>
      <LessonHeader
        num="04"
        title="Layers & Stacking"
        desc="In Illustrator or InDesign, the layer at the top of the Layers panel sits in front. CSS uses z-index for the same thing — a higher number means closer to the viewer. Change the values and watch the boxes reorder."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div>
          <Label>Set z-index for each element</Label>
          <div style={{ background: SURFACE, borderRadius: 8, padding: '20px 24px' }}>
            <Slider label="Box A (red)  z-index" value={zA} min={0} max={10} onChange={setZA} />
            <Slider label="Box B (dark) z-index" value={zB} min={0} max={10} onChange={setZB} />
            <Slider label="Box C (pink) z-index" value={zC} min={0} max={10} onChange={setZC} />
          </div>

          <div style={{ marginTop: 16 }}>
            <Label>Current order (like your Layers panel)</Label>
            <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
              {sorted.map((l, i) => (
                <div key={l.name} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
                  borderBottom: i < sorted.length - 1 ? `1px solid ${BORDER}` : 'none',
                }}>
                  <div style={{ width: 14, height: 14, background: l.bg, borderRadius: 2, flexShrink: 0, border: `1px solid ${BORDER}` }} />
                  <span style={{ fontSize: 13, color: DARK, flex: 1 }}>{l.name}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: RED, fontWeight: 700 }}>z-index: {l.z}</span>
                  {i === 0 && <span style={{ fontSize: 10, color: '#8F8E8D', background: SURFACE, padding: '2px 6px', borderRadius: 10 }}>front</span>}
                  {i === sorted.length - 1 && <span style={{ fontSize: 10, color: '#8F8E8D', background: SURFACE, padding: '2px 6px', borderRadius: 10 }}>back</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label>Live preview (overlapping elements)</Label>
          <div style={{
            border: `1px solid ${BORDER}`, borderRadius: 8, background: '#fff',
            height: 240, position: 'relative', overflow: 'hidden',
          }}>
            {[
              { left: 20, top: 20, z: zA, bg: RED, text: '#fff', label: 'A' },
              { left: 64, top: 64, z: zB, bg: '#40403E', text: '#fff', label: 'B' },
              { left: 108, top: 108, z: zC, bg: '#FFABA6', text: DARK, label: 'C' },
            ].map(box => (
              <div key={box.label} style={{
                position: 'absolute', left: box.left, top: box.top,
                width: 112, height: 112, background: box.bg, zIndex: box.z, borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', color: box.text,
              }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{box.label}</span>
                <span style={{ fontSize: 11, opacity: 0.8 }}>z: {box.z}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Label>The CSS</Label>
      <Code>{code}</Code>

      <Tip>
        <strong style={{ color: DARK }}>Key rule:</strong> z-index only works when you also set{' '}
        <code style={{ background: SURFACE, padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>position</code> to{' '}
        <code style={{ background: SURFACE, padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>relative</code>,{' '}
        <code style={{ background: SURFACE, padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>absolute</code>, or{' '}
        <code style={{ background: SURFACE, padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>fixed</code>.
        By default, elements use <code style={{ background: SURFACE, padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>position: static</code> and ignore z-index entirely.
      </Tip>
    </div>
  );
}

// ─── 05 Grids ───────────────────────────────────────────────────────────────

function GridLesson() {
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(6);

  const code =
    `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: ${gap}px;
}

/*
  repeat(${columns}, 1fr) = ${columns} equal columns
  "1fr" means "one fraction of the available space"
  gap: ${gap}px is your gutter width

  Unlike print, these columns flex with the browser window.
*/`;

  const rows = [
    ['Print concept', 'CSS Grid term'],
    ['Number of columns', 'grid-template-columns'],
    ['Gutter width', 'gap (or column-gap)'],
    ['Column span', 'grid-column: span 2'],
    ['Row height', 'grid-row / row-gap'],
    ['Bleed / full-width', 'grid-column: 1 / -1'],
  ];

  const ITEM_COLORS = [RED, '#40403E', '#FFABA6', '#8F8E8D', '#E12B21', '#5C5C5B',
    '#40403E', RED, '#FFABA6', '#8F8E8D', '#E12B21', '#40403E'];

  return (
    <div>
      <LessonHeader
        num="05"
        title="Grid Systems"
        desc="Print designers have always laid out pages on column grids. CSS Grid brings that same discipline to the web — and it's more powerful. Your gutter is gap, your columns are grid-template-columns."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 28 }}>
        {rows.map((row, i) => (
          <TableRow key={i} cols={row} isHeader={i === 0} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div>
          <Label>Adjust the grid</Label>
          <div style={{ background: SURFACE, borderRadius: 8, padding: '20px 24px' }}>
            <Slider label="Columns" value={columns} min={1} max={6} onChange={setColumns} />
            <Slider label="Gap (gutter)" value={gap} min={0} max={48} unit="px" onChange={setGap} />
            <Slider label="Item count" value={itemCount} min={1} max={12} onChange={setItemCount} />
          </div>
        </div>

        <div>
          <Label>Live grid preview</Label>
          <div style={{
            border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16, background: '#fff',
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap,
          }}>
            {Array.from({ length: itemCount }).map((_, i) => (
              <div key={i} style={{
                background: ITEM_COLORS[i % ITEM_COLORS.length],
                borderRadius: 4, height: 56,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: ITEM_COLORS[i % ITEM_COLORS.length] === '#FFABA6' ? DARK : '#fff',
                fontSize: 12, fontWeight: 700,
              }}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Label>The CSS</Label>
      <Code>{code}</Code>

      <Tip>
        <strong style={{ color: DARK }}>The biggest difference from print:</strong> Web grids are
        fluid. The <code style={{ background: SURFACE, padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>1fr</code> unit
        means "one equal share of whatever space is available" — so your layout responds to any
        screen size automatically. No fixed A4 or letter page. The canvas is always changing.
      </Tip>
    </div>
  );
}

// ─── App Shell ──────────────────────────────────────────────────────────────

type LessonId = 'welcome' | 'colors' | 'typography' | 'box-model' | 'layers' | 'grid';

const NAV: { id: LessonId; num: string; title: string; sub: string }[] = [
  { id: 'welcome', num: '00', title: 'Welcome', sub: 'Start here' },
  { id: 'colors', num: '01', title: 'Colors', sub: 'CMYK → Hex & RGB' },
  { id: 'typography', num: '02', title: 'Typography', sub: 'Leading & Tracking' },
  { id: 'box-model', num: '03', title: 'The Box Model', sub: 'Margins & Padding' },
  { id: 'layers', num: '04', title: 'Layers', sub: 'Stacking & z-index' },
  { id: 'grid', num: '05', title: 'Grids', sub: 'Column grids in CSS' },
];

export default function LearningApp() {
  const [active, setActive] = useState<LessonId>('welcome');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#FAFAF8', color: DARK }}>

      {/* Sidebar */}
      <aside style={{
        width: SIDEBAR_W, background: '#40403E', color: '#fff',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        overflowY: 'auto', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '32px 24px 20px' }}>
          <div style={{
            display: 'inline-block', background: RED, padding: '2px 8px',
            borderRadius: 2, fontSize: 10, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#fff', marginBottom: 14,
          }}>
            Noroff
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.35 }}>
            Code for<br />Designers
          </h1>
        </div>

        <nav style={{ flex: 1 }}>
          {NAV.map(item => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', padding: '11px 24px',
                  background: isActive ? '#333331' : 'transparent',
                  border: 'none', borderLeft: `3px solid ${isActive ? RED : 'transparent'}`,
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 11, color: isActive ? '#8F8E8D' : '#5C5C5B', minWidth: 22, fontFamily: 'monospace' }}>
                  {item.num}
                </span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? '#fff' : '#C2C1C0', lineHeight: 1.3 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#5C5C5B', lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 11, color: '#5C5C5B', margin: 0, lineHeight: 1.5 }}>
            5 interactive lessons
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: SIDEBAR_W, flex: 1, padding: '56px 64px', maxWidth: 900, boxSizing: 'border-box' }}>
        {active === 'welcome'    && <WelcomeLesson onStart={() => setActive('colors')} />}
        {active === 'colors'     && <ColorsLesson />}
        {active === 'typography' && <TypographyLesson />}
        {active === 'box-model'  && <BoxModelLesson />}
        {active === 'layers'     && <LayersLesson />}
        {active === 'grid'       && <GridLesson />}
      </main>
    </div>
  );
}
