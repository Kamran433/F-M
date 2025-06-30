import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Google Fonts if using them directly */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* Inter Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Add other global head elements like favicons, meta tags here if not page-specific */}
        <link rel="icon" href="/favicon.ico" /> {/* Example favicon path */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
