import { Html, Head, Main, NextScript } from "next/document";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Future&more Inc.",
  url: "https://www.futuremoreai.com/",
  logo: "https://www.futuremoreai.com/images/your-logo.png", // <-- REPLACE
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9797569227", // <-- REPLACE
    contactType: "customer service",
    email: "info.futuremore@gmail.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Srinagar",
    addressRegion: "Jammu and Kashmir",
    postalCode: "190001",
    addressCountry: "IN",
  },
  slogan: "Pioneering the Next Era of Artificial Intelligence.",
  founder: [
    { "@type": "Person", name: "Kamran Ali" },
    { "@type": "Person", name: "Mohammad Numaan" },
    { "@type": "Person", name: "Qazi Muneeb Shabir" },
    { "@type": "Person", name: "Moomin Baktoo" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/your-linkedin-id", // <-- REPLACE
    "https://x.com/your-twitter-handle", // <-- REPLACE
  ],
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Engineer the Impossible with Autonomous AI | Future&more Inc.
        </title>
        <meta
          name="description"
          content="Unleash FutureOS, the autonomous AI that builds software. We orchestrate intelligent agents to engineer the impossible, from generative code to predictive health insights. This is the next era of AI. Build it with us."
        />
        <meta name="author" content="Future&more Inc." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.futuremoreai.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.futuremoreai.com/" />
        <meta property="og:site_name" content="Future&more Inc." />
        <meta
          property="og:title"
          content="Future&more Inc: Where AI Becomes Autonomous."
        />
        <meta
          property="og:description"
          content="What if software could build itself? Meet FutureOS, our autonomous AI ecosystem that's redefining development, productivity, and what's possible."
        />
        <meta
          property="og:image"
          content="https://www.futuremoreai.com/images/social-share-image.jpg"
        />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.futuremoreai.com/" />
        <meta
          name="twitter:title"
          content="Future&more Inc. | Engineering Autonomous AI"
        />
        <meta
          name="twitter:description"
          content="We build autonomous agents that write code, analyze data, and power the next generation of intelligent applications. Welcome to the future."
        />
        <meta
          name="twitter:image"
          content="https://www.futuremoreai.com/images/social-share-image.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        {/* Inter Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Add other global head elements like favicons, meta tags here if not page-specific */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.png"
        ></link> {/* Example favicon path */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
