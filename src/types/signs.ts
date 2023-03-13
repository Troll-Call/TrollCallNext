import { rgb, Color } from "./generics";

export interface Sign {
  caste: string;
  sign: string;
  colors: {
    bright: Color;
    base: Color;
  }
}

export enum PossibleSigns {
  Aries,
  Taurus,
  Gemini,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagittarius,
  Capricorn,
  Aquarius,
  Pisces
}

export let Signs:Sign[] = [
  {
    caste: "Rust",
    sign: "Aries",
    colors: {
      bright: [
        255,
        0,
        0
      ],
      base: [
        161,
        0,
        0
      ]
    }
  },
  {
    caste: "Bronze",
    sign: "Taurus",
    colors: {
      bright: [
        255,
        127,
        0
      ],
      base: [
        161,
        80,
        0
      ]
    }
  },
  {
    caste: "Gold",
    sign: "Gemini",
    colors: {
      bright: [
        255,
        255,
        0
      ],
      base: [
        161,
        161,
        0
      ]
    }
  },
  {
    caste: "Lime",
    sign: "Cancer",
    colors: {
      bright: [
        127,
        255,
        0
      ],
      base: [
        80,
        161,
        0
      ]
    }
  },
  {
    caste: "Olive",
    sign: "Leo",
    colors: {
      bright: [
        0,
        255,
        0
      ],
      base: [
        0,
        161,
        0
      ]
    }
  },
  {
    caste: "Jade",
    sign: "Virgo",
    colors: {
      bright: [
        0,
        255,
        127
      ],
      base: [
        0,
        161,
        80
      ]
    }
  },
  {
    caste: "Teal",
    sign: "Libra",
    colors: {
      bright: [
        0,
        255,
        255
      ],
      base: [
        0,
        161,
        161
      ]
    }
  },
  {
    caste: "Blue",
    sign: "Scorpio",
    colors: {
      bright: [
        0,
        127,
        255
      ],
      base: [
        0,
        80,
        161
      ]
    }
  },
  {
    caste: "Indigo",
    sign: "Sagittarius",
    colors: {
      bright: [
        0,
        0,
        255
      ],
      base: [
        0,
        0,
        161
      ]
    }
  },
  {
    caste: "Purple",
    sign: "Capricorn",
    colors: {
      bright: [
        127,
        0,
        255
      ],
      base: [
        80,
        0,
        161
      ]
    }
  },
  {
    caste: "Violet",
    sign: "Aquarius",
    colors: {
      bright: [
        255,
        0,
        255
      ],
      base: [
        161,
        0,
        161
      ]
    }
  },
  {
    caste: "Fuchsia",
    sign: "Pisces",
    colors: {
      bright: [
        255,
        0,
        127
      ],
      base: [
        161,
        0,
        80
      ]
    }
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