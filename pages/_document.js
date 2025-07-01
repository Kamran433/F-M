import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>
          Future&more Inc | AI Development & Data Analytics Solutions | GenAI &
          ML Solutions.
        </title>
        <meta
          name="description"
          content="Future&more Inc. provides expert AI development, data analytics, and intelligent automation services to drive business growth. Based in Srinagar, India. Contact us for a consultation."
        />
        <meta
          name="keywords"
          content="AI development, data analytics, machine learning, business intelligence, automation, custom AI, NLP, Future&more Inc, Srinagar, India"
        />
        <link rel="canonical" href="https://www.futuremoreai.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.futuremoreai.com/" />
        <meta
          property="og:title"
          content="AI Development & Data Analytics Solutions | Future&more Inc."
        />
        <meta
          property="og:description"
          content="Future&more Inc. provides expert AI development, data analytics, and intelligent automation services to drive business growth."
        />
        <meta
          property="og:image"
          content="https://www.futuremoreai.com/images/social-share-image.jpg"
        />
        <meta property="og:site_name" content="Future&more Inc." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.futuremoreai.com/" />
        <meta
          name="twitter:title"
          content="AI Development & Data Analytics Solutions | Future&more Inc."
        />
        <meta
          name="twitter:description"
          content="Future&more Inc. provides expert AI development, data analytics, and intelligent automation services to drive business growth."
        />
        <meta
          name="twitter:image"
          content="https://www.futuremoreai.com/images/social-share-image.jpg"
        />
        <meta name="author" content="Future&more Inc." />
        <meta name="robots" content="index, follow" />
        <meta charset="UTF-8" />
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
