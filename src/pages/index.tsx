import { name } from "@/types/assist/branding"
import Box from "@/components/box";
import Head from "next/head";
import Footer from "@/components/footer";

export default function Home() {
  return (
      <div className="base">
        <Head>
          <title>{module.exports.default.name + " | " + name}</title>
        </Head>
        <Box title={name} className="negative">
          <p>
            Welcome to {name}, a website for indexing various fantrolls. Check them out!
          </p>
        </Box>
        <Footer />
      </div>
  )
}
