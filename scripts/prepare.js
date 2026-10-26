// Copies the libraries from node_modules into src/vendor so the app works fully offline.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const nm = (p) => path.join(root, 'node_modules', p);
const out = path.join(root, 'src', 'vendor');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function pick(name, candidates) {
  const f = candidates.map(nm).find(fs.existsSync);
  if (!f) throw new Error(`Missing ${name} (looked for ${candidates.join(', ')}). Run: npm install`);
  fs.copyFileSync(f, path.join(out, name));
  if (fs.statSync(path.join(out, name)).size < 5000) throw new Error(`${name} looks empty or corrupted`);
}
pick('xlsx.js', ['xlsx/dist/xlsx.full.min.js']);
pick('chart.js', ['chart.js/dist/chart.umd.js', 'chart.js/dist/chart.umd.min.js']);
pick('jspdf.js', ['jspdf/dist/jspdf.umd.min.js']);
pick('html2canvas.js', ['html2canvas/dist/html2canvas.min.js']);

// Cairo font (Arabic + Latin), bundled locally
const RANGE = {
  arabic: 'U+0600-06FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE80-FEFC',
  latin: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
};
const fdir = nm('@fontsource/cairo/files');
let css = '';
if (fs.existsSync(fdir)) {
  for (const f of fs.readdirSync(fdir)) {
    const m = f.match(/^cairo-(arabic|latin)-(400|600|700|800)-normal\.woff2$/);
    if (!m) continue;
    fs.copyFileSync(path.join(fdir, f), path.join(out, f));
    css += `@font-face{font-family:'Cairo';font-style:normal;font-weight:${m[2]};font-display:swap;src:url(${f}) format('woff2');unicode-range:${RANGE[m[1]]}}\n`;
  }
}
fs.writeFileSync(path.join(out, 'fonts.css'), css || '/* Cairo not found: falling back to system fonts */\n');
console.log('vendor files ready in src/vendor');
