/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07090D',
        graphite: '#0E1117',
        raised: '#131722',
        rule: '#1C2230',
        'rule-strong': '#2A3242',
        paper: '#E8ECF3',
        fog: '#99A1B3',
        dim: '#7C8497',
        signal: '#5BD8E5',
        ion: '#9D8CFF',
        go: '#43D492',
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
