import Link from "next/link";
import { Pesterlog } from "@/types/pester";
import Box from "./box";

export default function PesterCard({ pester }: { pester: Pesterlog }) {
  return (
    <Link href={"/pester/" + pester.id} className="no-underline">
      <Box className="box noborder" title={pester.name}>
        <p className="py-1">Created {new Date(pester.date).toLocaleString()}</p>
        <div className="negative noborder no-underline my-1 font-mono whitespace-pre-line">
          {pester.description?.replace(/\\n/gm, "\n")}
        </div>
        {pester.config?.memo ? "Memo with " + pester.characters.map((troll, i) => troll.time !== "" ? troll.time + " " : "" + troll.character.username).join(" and ") : (pester.characters[0].time !== "" ? pester.characters[0].time + " " : "") + pester.characters[0].character.username + " vs " + (pester.characters[1].time !== "" ? pester.characters[1].time + " " : "") + pester.characters[1].character.username}
      </Box>
    </Link>
  );
}