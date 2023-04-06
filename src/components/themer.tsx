import { negate, themeColor, toHex } from "@/types/assist/colors";
import { Bloods, PossibleBloods } from "@/types/assist/signs";
import Head from "next/head";

export function Themer({color}:{color:string}) {
  const blood = Bloods[PossibleBloods[color]] ?? Bloods[12];
  return (
    <Head>
      <style global data-nosnippet>{`body {
  ${themeColor(blood.colormap.map(x=>x*255)).map((x, i) => `--pos-${(i * 100)}: ${toHex(x)} !important;`).join("\n  ")}
  ${themeColor(blood.colormapNeg?.map(x=>x*255) ?? negate(blood.colormap.map(x=>x*255))).map((x, i) => `--neg-${(i * 100)}: ${toHex(x)} !important;`).join("\n  ")}
}`}</style>
    </Head>
  );
}