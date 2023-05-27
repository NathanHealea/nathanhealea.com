'use client';

import Script from 'next/script';
import { FC } from 'react';

type GoogleTrackingID = string;

interface GoogleAnalyticsProps {
  gaTrackingID?: GoogleTrackingID | undefined;
}

const GoogleAnalytics: FC<GoogleAnalyticsProps> = (props) => {
  const { gaTrackingID } = props;

  if (gaTrackingID == undefined) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingID}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaTrackingID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
