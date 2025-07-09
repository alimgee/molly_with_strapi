
'use client';

import React, { useEffect } from "react";
import Script from 'next/script';

const TwitterContainer = () => {
  return (
    <div className="twitter-embed">
      <a
        className="twitter-timeline"
        data-theme="dark"
        data-tweet-limit="3"
        data-chrome="noheader nofooter noborder"
        href="https://twitter.com/mollyrosecancer"
      >
        Tweets by MollyRose
      </a>
      <Script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></Script>
    </div>
  );
};

export default TwitterContainer;
