import React from 'react';
import Intro from './Intro'
import Quote from './Quote'
import CardSection from './Cards'
import { Helmet } from 'react-helmet'
import NoticeSection from './Notice'

const App = () => {
  return (
    <main>
      <Helmet>
        <title>Home - mollyrose.ie</title>
        <meta name="description" content="Driving awareness of Childhood Cancer and Telling Molly Roses story" />
      </Helmet>
      <Intro />
      <Quote />
      <NoticeSection />
      <CardSection />
    </main>)
}
export default App;
