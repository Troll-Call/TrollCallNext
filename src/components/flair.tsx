import { lightness, toHex } from "@/types/assist/colors";

export default function Flair({name, color}:{name:string, color:number}) {
  const hexColor = "#" + color.toString(16).padStart(6,"0");
  const darkenedHex = toHex(lightness(hexColor, 60, false));
  const lightenedHex = toHex(lightness(hexColor, 60, true));
  return (
    <span className={`rounded-lg p-0.5 px-1`} style={{backgroundColor:darkenedHex,color:lightenedHex}}>
      {name}
    </span>
  )
}
