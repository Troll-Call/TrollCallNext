import { negate, themeColor, toHex } from "@/types/assist/colors";
import Head from "next/head";

export function Themer({pos, neg}:{pos:string, neg?:string}) {
  return (
    <Head>
      <style global data-nosnippet>{`body {
  ${themeColor(pos).map((x, i) => `--pos-${(i * 100)}: ${toHex(x)} !important;`).join("\n  ")}
  ${themeColor(neg ?? negate(pos)).map((x, i) => `--neg-${(i * 100)}: ${toHex(x)} !important;`).join("\n  ")}
}`}</style>
    </Head>
  );
}