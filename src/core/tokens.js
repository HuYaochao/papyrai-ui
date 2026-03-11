// papyrai-ui Design Tokens
// All CSS variables are defined here for easy theming

export const fontFaces = `
/* ==================== Local Fonts ==================== */
/* Noto Serif SC - Variable Font (supports all weights) */
@font-face {
  font-family: 'Noto Serif SC';
  src: url('../src/fonts/NotoSerifSC-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-display: swap;
}

/* Caveat - Handwriting font */
@font-face {
  font-family: 'Caveat';
  src: url('../src/fonts/caveat.ttf') format('truetype');
  font-weight: 400 700;
  font-display: swap;
}

/* JetBrains Mono - Monospace font */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('../src/fonts/jetbrainsmono.ttf') format('truetype');
  font-weight: 100 800;
  font-display: swap;
}
`;

export const tokens = `
:root {
  /* ==================== Paper Colors ==================== */
  --paper-white: #fdfbf7;
  --paper-cream: #f7f3e8;
  --paper-aged: #ede6d6;
  --paper-shadow: rgba(0, 0, 0, 0.1);
  --paper-border: #d9d0be;
  --paper-black: #1a1814;

  /* ==================== Ink Colors ==================== */
  --ink-black: #1a1612;
  --ink-dark: #3a3530;
  --ink-mid: #6a6560;
  --ink-light: #aaa5a0;
  --ink-faint: #d9d5d0;

  /* ==================== Accent Colors ==================== */
  --accent-red: #c4453c;
  --accent-blue: #4a7c9b;
  --accent-green: #5a8a5a;
  --accent-amber: #c49a3c;

  /* ==================== AI Colors ==================== */
  --ai-thinking: #8b5cf6;
  --ai-stream: #10b981;
  --ai-hallucination: #f59e0b;
  --ai-error: #ef4444;

  --ai-confidence-high: #22c55e;
  --ai-confidence-mid: #eab308;
  --ai-confidence-low: #ef4444;

  /* ==================== Typography ==================== */
  --font-handwrite: 'Caveat', cursive;
  --font-serif: 'Noto Serif SC', 'Georgia', serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;

  /* ==================== Elevation (Shadows) ==================== */
  --elevation-1: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  --elevation-2: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  --elevation-3: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);

  /* ==================== Border Radius ==================== */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* ==================== Spacing ==================== */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* ==================== Transitions ==================== */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;

  /* ==================== Z-Index Scale ==================== */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-popover: 400;
  --z-tooltip: 500;
}

/* ==================== Dark Theme ==================== */
[data-theme="dark"] {
  /* Paper Colors - Dark */
  --paper-white: #1a1814;
  --paper-cream: #2a2520;
  --paper-aged: #3a3530;
  --paper-shadow: rgba(0, 0, 0, 0.3);
  --paper-border: #4a4540;
  --paper-black: #0a0908;

  /* Ink Colors - Inverted */
  --ink-black: #e8e0d0;
  --ink-dark: #c8c0b0;
  --ink-mid: #a89e8c;
  --ink-light: #786e64;
  --ink-faint: #4a4540;

  /* Accent Colors - Brightened */
  --accent-red: #e87068;
  --accent-blue: #6a9cbb;
  --accent-green: #7aaa7a;
  --accent-amber: #d4aa5c;

  /* AI Colors - Brightened */
  --ai-thinking: #a78bfa;
  --ai-stream: #34d399;
  --ai-hallucination: #fbbf24;
  --ai-error: #f87171;

  --ai-confidence-high: #4ade80;
  --ai-confidence-mid: #facc15;
  --ai-confidence-low: #f87171;

  /* Elevation - Darker */
  --elevation-1: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
  --elevation-2: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  --elevation-3: 0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.2);
}
`;

// Function to inject tokens into document
export function injectTokens() {
  if (typeof document === 'undefined') return;

  // Inject font faces first
  let fontStyle = document.getElementById('papyrai-fonts');
  if (!fontStyle) {
    fontStyle = document.createElement('style');
    fontStyle.id = 'papyrai-fonts';
    document.head.appendChild(fontStyle);
  }
  fontStyle.textContent = fontFaces;

  // Then inject tokens
  let style = document.getElementById('papyrai-tokens');
  if (!style) {
    style = document.createElement('style');
    style.id = 'papyrai-tokens';
    document.head.appendChild(style);
  }
  style.textContent = tokens;
}

// Export individual token groups for programmatic access
export const paperTokens = {
  white: '--paper-white',
  cream: '--paper-cream',
  aged: '--paper-aged',
  shadow: '--paper-shadow',
  border: '--paper-border',
  black: '--paper-black',
};

export const inkTokens = {
  black: '--ink-black',
  dark: '--ink-dark',
  mid: '--ink-mid',
  light: '--ink-light',
  faint: '--ink-faint',
};

export const accentTokens = {
  red: '--accent-red',
  blue: '--accent-blue',
  green: '--accent-green',
  amber: '--accent-amber',
};

export const aiTokens = {
  thinking: '--ai-thinking',
  stream: '--ai-stream',
  hallucination: '--ai-hallucination',
  error: '--ai-error',
  confidenceHigh: '--ai-confidence-high',
  confidenceMid: '--ai-confidence-mid',
  confidenceLow: '--ai-confidence-low',
};
