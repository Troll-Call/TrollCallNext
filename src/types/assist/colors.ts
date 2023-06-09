import { Color } from '../generics';

const clamp = (n: number, mi: number, ma: number) => Math.max(mi, Math.min(n, ma));

export function convertColor(color: any): Color {
  if (typeof color === 'number') return [(color >> 16) & 255, (color >> 8) & 255, color & 255];
  else if (Array.isArray(color)) return color as Color;
  else if (typeof color === 'string' && color.startsWith('rgb('))
    return color
      .replace(/rgb\(|\)/gm, '')
      .split(', ')
      .map((x: string) => parseInt(x)) as Color;
  else if (typeof color === 'string' && color.startsWith('#'))
    return [parseInt(color.slice(1, 3), 16), parseInt(color.slice(3, 5), 16), parseInt(color.slice(5, 7), 16)];
  else throw new Error('Color invalid');
}

export function toHex(color: any) {
  return `#${convertColor(color)
    .map((x: number) => Math.floor(x).toString(16).padStart(2, '0'))
    .join('')}`;
}

export function toRGB(color: any) {
  return `rgb(${convertColor(color).join(', ')})`;
}

export function toInt(color: any) {
  var newColor = convertColor(color);
  return (newColor[0] << 16) + (newColor[1] << 8) + newColor[2];
}

//adjustment

export function lightness(col: any, amt: number, lighter: boolean) {
  const colorArray = convertColor(col);
  let newColor: number[];
  if (lighter)
    newColor = [
      clamp(Math.round(+colorArray[0] + (amt / 100) * (255 - +colorArray[0])), 0, 255),
      clamp(Math.round(+colorArray[1] + (amt / 100) * (255 - +colorArray[1])), 0, 255),
      clamp(Math.round(+colorArray[2] + (amt / 100) * (255 - +colorArray[2])), 0, 255)
    ];
  else
    newColor = [
      clamp(Math.round(+colorArray[0] - (amt / 100) * +colorArray[0]), 0, 255),
      clamp(Math.round(+colorArray[1] - (amt / 100) * +colorArray[1]), 0, 255),
      clamp(Math.round(+colorArray[2] - (amt / 100) * +colorArray[2]), 0, 255)
    ];
  return newColor;
}

export function negate(col: any) {
  const colorArray = convertColor(col);
  return colorArray.map((x: number) => 255 - x);
}

//theming

export function themeColor(col: any) {
  return Array.apply(null, Array(11)).map((v, i) => lightness(col, Math.abs((i - 5) * 20), i > 5));
}
