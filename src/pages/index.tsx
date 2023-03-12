import Head from 'next/head'
import { TitleBar } from '@/components/title-bar/title-bar'
import { TestChart } from '@/components/test-chart/test-chart'
import { getDataFromBucket } from '@/domain/storage'
import { PinOfShame } from '@/components/pin-of-shame/pin-of-shame'

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="GM Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TitleBar />
        <PinOfShame />
        <TestChart />
      </main>
    </>
  )
}
