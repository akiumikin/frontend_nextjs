import '@/styles/globals.css'
import LoginLayout from '@/components/loginLayout'

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from './../aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Authenticator.Provider>
        <LoginLayout />
        <Component {...pageProps} />
      </Authenticator.Provider>
    </>
  )
}
