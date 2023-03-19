import Head from "next/head";
import { TitleBar } from "@/components/title-bar/title-bar";
import { PinOfShame } from "@/components/pin-of-shame/pin-of-shame";
import { Charts } from "@/components/charts/charts";
import { AddUser } from "@/components/add-user/add-user";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>GM-Dashboard app</title>
        <meta name="description" content="GM Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TitleBar />
        <AddUser />
        <PinOfShame />
        <Charts />
      </main>
    </>
  );
}
