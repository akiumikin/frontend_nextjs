import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './../aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

export default function Page() {
  return (
    <Authenticator>
      {({ signOut, user }) => {
        location.href = '/'
        return <></>
      }}
    </Authenticator>
  );
}
