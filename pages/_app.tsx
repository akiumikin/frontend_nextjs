import '@/styles/globals.css'
import Header from '@/components/header'

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from './../aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  function Copyright(props: any) {
    return (
      <></>
      // <Typography variant="body2" color="text.secondary" align="center" {...props}>
      //   {'Copyright © '}
      //   <Link color="inherit" href="https://github.com/akiumikin">
      //     akiumikin
      //   </Link>{' '}
      //   {new Date().getFullYear()}
      //   {'.'}
      // </Typography>
    );
  }

  return (
    <>
      <Authenticator.Provider>
        <Header />
        <Component {...pageProps} />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Authenticator.Provider>
    </>
  )
}
