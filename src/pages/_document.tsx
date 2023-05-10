import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inconsolata&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <noscript>
          ERRM... SORRY.... THIS WEBSITE REQUIRES JAVASCRIPT..... SORRY TROLLCALL NOSCRIPT USER THIS SITE USES REACT :[
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
