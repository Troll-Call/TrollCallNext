import { User } from "@/types/user";
import Link from "next/link";
import Flair from "./flair";

export default function UsernameRenderer({user, name, full}:{user:User, name?:boolean, full?:boolean}) {
  return (
    <span className="inline">
      <Link href={"/user/" + user.id}>{name ? user.username : ""}</Link>{user.flairs[0] ? (full ? user.flairs.map((x,i) => <Flair flair={x} key={i} />) : <Flair flair={user.flairs[0]} />) : <></>}
    </span>
  )
}

