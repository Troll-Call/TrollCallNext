import { name, domain } from "@/types/assist/branding"
import Box from "@/components/box";
import Head from "next/head";
import Footer from "@/components/footer";
import Navbar from "@/components/nav";

export default function Home() {
  return (
      <div>
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
