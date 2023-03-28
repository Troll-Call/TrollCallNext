export default function Box({children, title, className, subtitle, style}:{style?:any, children?:any, title:string, className?:string, subtitle?:boolean}) {
  return (
    <div className={"box " + className} style={style}>
      {title ? (<p className={subtitle ? "subtitle" : "title"}>
        {title}
      </p>) : <></>}
      {children}
    </div>
  )
}
