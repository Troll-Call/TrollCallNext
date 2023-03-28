import { lightness, toHex } from "@/types/assist/colors";
import { Bloods } from "@/types/assist/signs";
import Link from "next/link";
import styles from '@/styles/trollcard.module.css';
import { Troll } from "@/types/troll";

export default function TrollCard({ troll, simple }: { troll: Troll, simple: boolean }) {
  const hexColor = toHex(Bloods[troll.sign.fakeColor ?? troll.sign.color].colormap.map(x => x * 0xff));
  const styleBlah = {
    backgroundColor: toHex(lightness(hexColor, 60, false)),
    color: toHex(lightness(hexColor, 80, true)),
    borderColor: toHex(lightness(hexColor, 25, false))
  };
  const svgHexagon = troll.sign.fakeColor !== undefined ? (<></>) : (
    <svg width="70" height="61" style={{filter: `drop-shadow(${hexColor} 0px 0px 4px)`}} viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg">
      <path stroke={toHex(lightness(hexColor, 90, true))} strokeWidth="2" fill={styleBlah.color} d="M-1.74846e-06 35L20 0.358977L60 0.358976L80 35L60 69.641L20 69.641L-1.74846e-06 35Z"/>
      <image x="12" y="10" width="56" height="56" href={`/signs/${troll.sign.color}/${troll.sign.extended}.svg`} />
      <rect width="100%" height="100%" fill="transparent">
        <title>{troll.sign.extended}</title>
      </rect>
    </svg>
  );
  var stroke = toHex(lightness(hexColor, 50, true));
  const svgBox = (
    <svg width="261" height="208" viewBox="0 0 261 208" xmlns="http://www.w3.org/2000/svg">
      <path d="M252.5 17.5L13.5 10.5L8.5 191.5L247.5 198.5L252.5 17.5Z" fill={styleBlah.borderColor} stroke={stroke} strokeWidth="3"/>
      <path d="M20.5 2.5L2.5 182.5L240.5 206L258.5 26L20.5 2.5Z" stroke={stroke} fill="transparent" strokeWidth="3"/>
      <foreignObject x="20" y="26" width="221" height="156">
        <ul>
          {troll.facts.map((x:string, i:number) => <li key={i}>{x}</li>)}
        </ul>
      </foreignObject>
    </svg>
  )

  const box = (
    <div style={styleBlah} className={"box bg-pattern " + styles.cardBox}>
      <img src={"/api/cdn/trolls/" + troll.id + "/image.png"} alt="" />
      {svgBox}
      <div>
        <span className="font-title">
          {troll.name.first.toUpperCase()}<br />{troll.name.last.toUpperCase()}
        </span>
        {svgHexagon}
      </div>
    </div>
  );
  if (simple) return (
    <Link href={"/troll/" + troll.id} className={styles.simpleCardLink}>
      {box}
    </Link>
  )
  return box;
}
