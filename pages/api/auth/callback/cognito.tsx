import { CognitoAuth } from "amazon-cognito-auth-js";
import AWS from "aws-sdk";

const auth = new CognitoAuth({
  ClientId: process.env.COGNITO_CLIENT_ID as string,
  AppWebDomain: 'https://akiumi.auth.ap-northeast-1.amazoncognito.com',
  RedirectUriSignIn: process.env.COGNITO_SIGNIN_URI as string,
  RedirectUriSignOut: process.env.COGNITO_SIGNOUT_URI as string,
  UserPoolId: process.env.COGNITO_USER_ID as string,
  IdentityProvider: "Google",
  TokenScopesArray: ["email", "openid", "profile"],
});

const verifyToken = (token: string) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.getUser(
      {
        AccessToken: token,
      },
      (err: any, data: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data.Username);
      }
    );
  });
};

const CallbackPage: any = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return <p>Authentication Successful!</p>;
};

export async function getStaticProps() {
  const session = auth.getCachedSession();

  let loading = true;
  let authenticated = false;
  let username = null;

  if (session.isValid()) {
    const token = session.getIdToken().getJwtToken();
    username = await verifyToken(token);
    authenticated = true;
  }

  loading = false;

  return {
    props: {
      authenticated,
      username,
      loading,
    },
  };
}

export default CallbackPage;
