import NextAuth, {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    providers: [
      // OAuth authentication providers..
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!
      }),
    ],
  }
  export default NextAuth(authOptions);