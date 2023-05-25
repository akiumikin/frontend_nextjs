import { Auth } from 'aws-amplify';

export async function checkAuthStatus() {
  try {
    // ログイン状態の確認
    const auth = await Auth.currentAuthenticatedUser();
    console.log(auth)
    return auth
  } catch (error) {
    // ログインしていない場合、ログイン画面にリダイレクト
    location.href = '/signin'
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
