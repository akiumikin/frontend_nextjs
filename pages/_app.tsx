import '@/styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from './../aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

import type { AppProps } from 'next/app'

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/akiumikin">
          akiumikin
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <>
      <Authenticator.Provider>
        <Component {...pageProps} />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Authenticator.Provider>
    </>
  )
}
