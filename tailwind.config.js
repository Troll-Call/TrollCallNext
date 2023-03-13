/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      rust: "#a10000",
      neg_rust: "#5effff",
      bronze: "#a15000",
      neg_bronze: "#5eafff",
      gold: "#a1a100",
      neg_gold: "#5e5eff",
      lime: "#50a100",
      neg_lime: "#af5eff",
      olive: "#00a100",
      neg_olive: "#ff5eff",
      jade: "#00a150",
      neg_jade: "#ff5eaf",
      teal: "#00a1a1",
      neg_teal: "#ff5e5e",
      blue: "#0050a1",
      neg_blue: "#ffaf5e",
      indigo: "#0000a1",
      neg_indigo: "#ffff5e",
      purple: "#5000a1",
      neg_purple: "#afff5e",
      violet: "#a100a1",
      neg_violet: "#5eff5e",
      fuchsia: "#a10050",
      neg_fuchsia: "#5effaf"
    },
    fontFamily: {
      title: ['"Krona One"', 'Helvetica', 'sans-serif'],
      body: ['Nunito', 'Helvetica', 'sans-serif'],
      mono: ['Inconsolata', '"Courier New"', 'monospace']
    },
    extend: {
      backgroundImage: {
        'pattern': "url('/assets/pattern.svg')",
      }
    },
  },
  plugins: [],
}
