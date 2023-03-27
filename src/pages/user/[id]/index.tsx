import { name } from "@/types/assist/branding";
import { negate, themeColor, toHex } from "@/types/assist/colors";
import Box from "@/components/box";
import Navbar from "@/components/nav";
import Head from "next/head";
import * as fuck from "@/lib/dbFunctions";
import { GetStaticPropsContext } from "next/types";
import { User as userType } from "@/types/user";
import Flair from "@/components/flair";
import Footer from "@/components/footer";
import TrollCard from "@/components/trollcard";
import { GenericHolder } from "@/types/generics";
import React, { useState, useEffect } from 'react';

export default function User({ user, trolls }:{user:userType, trolls:GenericHolder[]}) {
  const [bodyColor, setBodyColor] = useState();
  useEffect(() => {
    if (user.flairs[0]) {
      themeColor("#" + user.flairs[0].color.toString(16).padStart(6,"0")).forEach((x, i) => document.documentElement.style.setProperty("--pos-" + (i * 100), toHex(x)));
      themeColor(negate("#" + user.flairs[0].color.toString(16).padStart(6,"0"))).forEach((x, i) => document.documentElement.style.setProperty("--neg-" + (i * 100), toHex(x)));
    }
  }); // this is messy
  return (
    <div>
      <Head>
        <title>{user.username + " - " + module.exports.default.name + " | " + name}</title>
        {/* <style jsx global>{`
html {
  ${themeColor("#" + user.flairs[0].color.toString(16).padStart(6,"0")).map((x, i) => `--pos-${i * 100}: ${toHex(x)};`).join("\n    ")}
  ${themeColor(negate("#" + user.flairs[0].color.toString(16).padStart(6,"0"))).map((x, i) => `--neg-${i * 100}: ${toHex(x)};`).join("\n    ")}
}
        `}</style> */}
      </Head>
      <Navbar title={user.username} type={module.exports.default.name} />
      <Box title={user.username}>
        <div className="flex flex-row gap-2 p-2 flex-wrap">
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
  console.log(rp);

  return {
    props: {
      user: rp,
      trolls: rt
    },
  }
}