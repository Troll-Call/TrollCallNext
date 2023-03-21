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
        0: "rgb(0, 0, 0)",
        100: "rgb(38, 38, 38)",
        200: "rgb(77, 77, 77)",
        300: "rgb(115, 115, 115)",
        400: "rgb(154, 154, 154)",
        500: "rgb(192, 192, 192)",
        600: "rgb(205, 205, 205)",
        700: "rgb(217, 217, 217)",
        800: "rgb(230, 230, 230)",
        900: "rgb(242, 242, 242)",
        1000: "rgb(255, 255, 255)"
      },
      neg: {
        0: "rgb(0, 0, 0)",
        100: "rgb(0, 26, 0)",
        200: "rgb(0, 51, 0)",
        300: "rgb(0, 77, 0)",
        400: "rgb(0, 102, 0)",
        500: "rgb(0, 128, 0)",
        600: "rgb(51, 153, 51)",
        700: "rgb(102, 179, 102)",
        800: "rgb(153, 204, 153)",
        900: "rgb(204, 230, 204)",
        1000: "rgb(255, 255, 255)"
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
  plugins: [],
}
