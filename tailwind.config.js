/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: withOpacity('--color-ink'),
        graphite: withOpacity('--color-graphite'),
        raised: withOpacity('--color-raised'),
        rule: withOpacity('--color-rule'),
        'rule-strong': withOpacity('--color-rule-strong'),
        paper: withOpacity('--color-paper'),
        fog: withOpacity('--color-fog'),
        dim: withOpacity('--color-dim'),
        signal: withOpacity('--color-signal'),
        ion: withOpacity('--color-ion'),
        go: withOpacity('--color-go'),
      },
      fontFamily: {
        display: ['Archivo', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        page: '1240px',
      },
    },
  },
  plugins: [],
};
