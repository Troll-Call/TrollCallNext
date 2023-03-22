import Link from "next/link";

export default function Navbar({title, type}:{title:string, type:string}) {
  return (
    <div className="box negative noborder flex flex-row flex-wrap overflow-hidden">
      <Link href="/" className="monospace text-left flex-none">
        &lt;== Back
      </Link>
      <span className="subtitle text-center break-words grow">
        {title}
      </span>
      <span className="monospace text-right flex-none">
        {type}
      </span>
    </div>
  )
}
