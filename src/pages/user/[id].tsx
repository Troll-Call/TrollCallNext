import Box from "@/components/box";
import Navbar from "@/components/nav";
import * as dbFunctions from "@/lib/dbFunctions";
import { GetStaticPropsContext } from "next/types";
import { UserSchema, User as userType } from "@/types/user";
import Footer from "@/components/footer";
import TrollCard from "@/components/trollcard";
import UsernameRenderer from "@/components/name";
import { Troll as trollType } from "@/types/troll";
import { Pesterlog as pesterType } from "@/types/pester";
import { Bloods, PossibleBloods } from "@/types/assist/signs";
import { Themer } from "@/components/themer";
import PesterCard from "@/components/pestercard";
import { negate } from "@/types/assist/colors";

export default function User({ user, trolls, pesters, test }:{user:userType, trolls:trollType[], pesters:pesterType[], test?:boolean}) {
  if (!(user && UserSchema.isValidSync(user))) return (<></>);
  var bloodColor = Bloods[PossibleBloods[user.color]] ?? Bloods[12];
  return (
    <div className="base">
        <Themer color={bloodColor.colormap.map(x => x * 255)} label="pos" />
        <Themer color={bloodColor.colormapNeg ? bloodColor.colormapNeg?.map(x => x * 255) : negate(bloodColor.colormap.map(x => x * 255))} label="neg" />
      {test ? <></> : <>
        <Navbar title={user.username} type={module.exports.default.name} />
      </>}
      <Box title={user.username}>
        {user.url ? <p className="pt-0">at <a href={user.url} target="_blank">{user.url}</a></p> : <></>}
        <UsernameRenderer name={false} full={true} user={user} />
        {user.description ? <div className="negative noborder no-underline my-1 font-mono whitespace-pre-line break-words">
          {user.description.replace(/\\n/gm, "\n")}
        </div> : <></>}
      </Box>
      <Box subtitle={true} title={user.username + "'S TROLLS"}>
        <div className="noshow flex-row flex-wrap justify-around">
          {trolls.length <= 0 ? "No critters in sight..." : trolls.map((x, i) => <TrollCard troll={x} key={i} simple={true} />)}
        </div>
      </Box>
      <Box subtitle={true} title={user.username + "'S PESTERS"}>
        <div className="noshow flex-row flex-wrap justify-around">
          {pesters.length <= 0 ? "No blabbing in earshot..." : pesters.map((x, i) => <PesterCard pester={x} key={i} />)}
        </div>
      </Box>
      {test ? <></> : <Footer />}
    </div>
  )
}
export async function getStaticPaths() {
  const findAll = (await dbFunctions.default).findAll; // WHY IS FUCK ASYNCHRONOUSLY IMPORTED
  const bruh = await findAll("users");
  const paths = bruh.map((x:string) => ({params: {id: x}}));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context:GetStaticPropsContext) {
  const findOne = (await dbFunctions.default).findOne; // WHY IS FUCK ASYNCHRONOUSLY IMPORTED
  const findQuery = (await dbFunctions.default).findQuery; // WHY IS FUCK ASYNCHRONOUSLY IMPORTED
  let cpi:(string|undefined) = context.params.id as string;
  if (!cpi) return {
    notFound: true
  }

  var ru = await findOne("users", cpi);
  var rt = await findQuery("trolls", "owners", "array-contains", cpi);
  var rp = await findQuery("pesters", "owners", "array-contains", cpi);

  return {
    props: {
      user: ru,
      trolls: rt,
      pesters: rp
    },
  }
}