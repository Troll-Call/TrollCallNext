import { lightness, toHex } from "@/types/assist/colors";
import { Flair as flairType } from "@/types/flair";

export default function Flair({flair}:{flair:flairType, color:number}) {
  const hexColor = "#" + flair.color.toString(16).padStart(6,"0");
  const darkenedHex = toHex(lightness(hexColor, 60, false));
  const lightenedHex = toHex(lightness(hexColor, 60, true));
  return (
    <span title={flair.id} className={`flair`} style={{backgroundColor:darkenedHex,color:lightenedHex}}>
      {flair.name}
    </span>
  )
}
