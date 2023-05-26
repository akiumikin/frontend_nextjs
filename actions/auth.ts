import { Auth, withSSRContext } from 'aws-amplify';

export async function checkAuthStatus(context: any) {
  const { Auth } = withSSRContext(context)

  try {
    const user = await Auth.currentAuthenticatedUser()
    return user.username
  } catch (error: any) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin'
      }
    }
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
    location.href = '/signin'
  } catch (error) {
    console.error('error signing out: ', error);
  }
}
