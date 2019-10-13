import Head from 'next/head'

export default function ({ children }) {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css?family=Roboto&amp;display=swap'
          rel='stylesheet'
          key='google-font-cabin'
        />
      </Head>
      <style jsx global>{`
      body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
      }
      html {
        box-sizing: border-box;
      }
      *, *:before, *:after {
        box-sizing: inherit;
      }
      `}
      </style>
      {children}
    </>
  )
}
