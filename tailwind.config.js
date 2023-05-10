/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      pos: {
        0: 'var(--pos-0)',
        100: 'var(--pos-100)',
        200: 'var(--pos-200)',
        300: 'var(--pos-300)',
        400: 'var(--pos-400)',
        500: 'var(--pos-500)',
        600: 'var(--pos-600)',
        700: 'var(--pos-700)',
        800: 'var(--pos-800)',
        900: 'var(--pos-900)',
        1000: 'var(--pos-1000)'
      },
      neg: {
        0: 'var(--neg-0)',
        100: 'var(--neg-100)',
        200: 'var(--neg-200)',
        300: 'var(--neg-300)',
        400: 'var(--neg-400)',
        500: 'var(--neg-500)',
        600: 'var(--neg-600)',
        700: 'var(--neg-700)',
        800: 'var(--neg-800)',
        900: 'var(--neg-900)',
        1000: 'var(--neg-1000)'
      },
      white: '#ffffff',
      black: '#000000',
      red: '#ff0000'
    },
    fontFamily: {
      title: ['"TrollCall Display"', 'Helvetica', 'sans-serif'],
      body: ['Nunito', 'Helvetica', 'sans-serif'],
      mono: ['Inconsolata', '"Courier New"', 'monospace']
    },
    extend: {
      backgroundImage: {
        pattern: "url('/assets/pattern.svg')"
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
