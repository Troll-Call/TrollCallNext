// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     colors: {
//       rust: "#a10000",
//       neg_rust: "#5effff",
//       bronze: "#a15000",
//       neg_bronze: "#5eafff",
//       gold: "#a1a100",
//       neg_gold: "#5e5eff",
//       lime: "#50a100",
//       neg_lime: "#af5eff",
//       olive: "#00a100",
//       neg_olive: "#ff5eff",
//       jade: "#00a150",
//       neg_jade: "#ff5eaf",
//       teal: "#00a1a1",
//       neg_teal: "#ff5e5e",
//       blue: "#0050a1",
//       neg_blue: "#ffaf5e",
//       indigo: "#0000a1",
//       neg_indigo: "#ffff5e",
//       purple: "#5000a1",
//       neg_purple: "#afff5e",
//       violet: "#a100a1",
//       neg_violet: "#5eff5e",
//       fuchsia: "#a10050",
//       neg_fuchsia: "#5effaf"
//     },
//     fontFamily: {
//       title: ['"Krona One"', 'Helvetica', 'sans-serif'],
//       body: ['Nunito', 'Helvetica', 'sans-serif'],
//       mono: ['Inconsolata', '"Courier New"', 'monospace']
//     },
//     extend: {
//       backgroundImage: {
//         'pattern': "url('/assets/pattern.svg')",
//       }
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      pos: {
        0: "var(--pos-0)",
        100: "var(--pos-100)",
        200: "var(--pos-200)",
        300: "var(--pos-300)",
        400: "var(--pos-400)",
        500: "var(--pos-500)",
        600: "var(--pos-600)",
        700: "var(--pos-700)",
        800: "var(--pos-800)",
        900: "var(--pos-900)",
        1000: "var(--pos-1000)"
      },
      neg: {
        0: "var(--neg-0)",
        100: "var(--neg-100)",
        200: "var(--neg-200)",
        300: "var(--neg-300)",
        400: "var(--neg-400)",
        500: "var(--neg-500)",
        600: "var(--neg-600)",
        700: "var(--neg-700)",
        800: "var(--neg-800)",
        900: "var(--neg-900)",
        1000: "var(--neg-1000)"
      },
      white: "#ffffff",
      black: "#000000"
    },
    fontFamily: {
      title: ['"TrollCall Display"', 'Helvetica', 'sans-serif'],
      body: ['Nunito', 'Helvetica', 'sans-serif'],
      mono: ['Inconsolata', '"Courier New"', 'monospace']
    },
    extend: {
      backgroundImage: {
        'pattern': "url('/assets/pattern.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
