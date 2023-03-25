import { name } from "@/types/assist/branding";
import Box from "@/components/box";
import Navbar from "@/components/nav";
import Head from "next/head";
import * as fuck from "@/lib/dbFunctions";
import { GetStaticPropsContext } from "next/types";
import { ServerUser as userType } from "@/types/user";
import Flair from "@/components/flair";
import Footer from "@/components/footer";
import TrollCard from "@/components/trollcard";
import { GenericHolder } from "@/types/generics";

export default function User({ user, trolls }:{user:userType, trolls:GenericHolder[]}) {
  return (
    <div>
      <Head>
        <title>{user.username + " - " + module.exports.default.name + " | " + name}</title>
      </Head>
      <Navbar title={user.username} type={module.exports.default.name} />
      <Box title={user.username}>
        <div className="flex flex-row gap-2 p-2">
          {user.flairs.map((x,i) => <Flair name={x.name} key={i} color={x.color} />)}
        </div>
        <p className="pt-0"><a href={user.url} target="_blank">{user.url}</a></p>
      </Box>
      <Box subtitle={true} title={user.username + "'S TROLLS"}>
        <div className="noshow flex-row flex-wrap justify-around">
          {trolls.map((x, i) => <TrollCard troll={x} key={i} simple={true} />)}
        </div>
      </Box>
      <Footer />
    </div>
  )
}
export async function getStaticPaths() {
  const findAll = (await fuck.default).findAll; // WHY IS FUCK ASYNCHRONOUSLY IMPORTED
  const bruh = await findAll("users");
  const paths = bruh.map((x:string) => ({params: {id: x}}));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context:GetStaticPropsContext) {
  const findOne = (await fuck.default).findOne; // WHY IS FUCK ASYNCHRONOUSLY IMPORTED
  const findQuery = (await fuck.default).findQuery; // WHY IS FUCK ASYNCHRONOUSLY IMPORTED
  let cpi:(string|undefined) = context.params?.id as string;
  if (!cpi) return {
    notFound: true
  }

  var rp = await findOne("users", cpi);
  var rt = await findQuery("trolls", "owners", "array-contains", cpi);

  return {
    props: {
      user: rp,
      trolls: rt
    },
  }
}