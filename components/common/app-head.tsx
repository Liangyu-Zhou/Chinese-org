import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>Chinese.org</title>
      <meta name='og:title' content='Chinese.org' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
}
