import React from 'react';
import Head from 'next/head'
import Intro from './Intro'
import Quote from './Quote'
import CardSection from './Cards'
import NoticeSection from './Notice'

const App = () => {
  return (
    <>
      <Head>
        <title>Home - mollyrose.ie</title>
        <meta name="description" content="Driving awareness of Childhood Cancer and Telling Molly Roses story" />
      </Head>
      <main>
        <Intro />
        <Quote />
        <NoticeSection />
        <CardSection />
      </main>
    </>
  )
}
export default App;
