import { rgb, Color } from "../generics";

export interface BloodDescription {
  colormap: Color,
  colormapNeg?: Color,
  name: string,
  sign: string
}

export const PossibleBloods = {
  Aries: 0,
  Taurus: 1,
  Gemini: 2,
  Cancer: 3,
  Leo: 4,
  Virgo: 5,
  Libra: 6,
  Scorpio: 7,
  Sagittarius: 8,
  Capricorn: 9,
  Aquarius: 10,
  Pisces: 11,
  Default: 12,
};

export const Bloods:BloodDescription[] = [
  {
    colormap: [1, 0, 0],
    sign: "Aries",
    name: "Rust"
  },
  {
    colormap: [1, 0.5, 0],
    sign: "Taurus",
    name: "Bronze"
  },
  {
    colormap: [1, 1, 0],
    sign: "Gemini",
    name: "Gold"
  },
  {
    colormap: [0.5, 1, 0],
    sign: "Cancer",
    name: "Lime"
  },
  {
    colormap: [0, 1, 0],
    sign: "Leo",
    name: "Olive"
  },
  {
    colormap: [0, 1, 0.5],
    sign: "Virgo",
    name: "Jade"
  },
  {
    colormap: [0, 1, 1],
    sign: "Libra",
    name: "Teal"
  },
  {
    colormap: [0, 0.5, 1],
    sign: "Scorpio",
    name: "Blue"
  },
  {
    colormap: [0, 0, 1],
    sign: "Sagittarius",
    name: "Indigo"
  },
  {
    colormap: [0.5, 0, 1],
    sign: "Capricorn",
    name: "Purple"
  },
  {
    colormap: [1, 0, 1],
    sign: "Aquarius",
    name: "Violet"
  },
  {
    colormap: [1, 0, 0.5],
    sign: "Pisces",
    name: "Fuchsia"
  },
  {
    colormap: [0.75, 0.75, 0.75],
    colormapNeg: [1, 0, 0],
    sign: "Default",
    name: "Grey"
  }
];

export const TrollColors:Color[] = [
  rgb(27, 27, 27), // Hair
  rgb(192, 192, 192), // Skin
  rgb(255, 184, 56), // Horns
  rgb(255, 144, 32),
  rgb(255, 72, 32),
  rgb(255, 255, 255) // Teeth
]; 