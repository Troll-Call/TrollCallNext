import { negate, themeColor, toHex } from "@/types/assist/colors";
import Head from "next/head";

export function Themer({color, label}:{color:any, label:string}) {
  return (
    <Head>
      <style global data-nosnippet>{`body {
  ${themeColor(color).map((x, i) => `--${label}-${(i * 100)}: ${toHex(x)} !important;`).join("\n  ")}
}`}</style>
    </Head>
  );
}