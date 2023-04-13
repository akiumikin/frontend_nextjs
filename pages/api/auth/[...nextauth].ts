import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // CognitoProvider({
    //   clientId: process.env.COGNITO_CLIENT_ID as string,
    //   clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
    //   issuer: process.env.COGNITO_ISSUER as string,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account }: any) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token
  //     }
  //     return token
  //   },
  //   async session({ session, token, user }: any) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken
  //     return session
  //   }
  // }
}

export default NextAuth(authOptions)
