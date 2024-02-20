import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret:process.env.SECRET,
    callbacks: {
        async signIn({ account, profile }) {
          if (account.provider === "google") {
            return profile.email_verified && profile.email.endsWith("@sjsu.edu");
          }
          return true;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          if (user) {
            token.id = user.id;
          }
          if (account) {
            token.accessToken = account.access_token;
          }
          return token;
        },
        async session({ session, token, user }) {
          console.log(token);
          session.user.id = token.id;
          return session;
        }
      }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
//https://www.youtube.com/watch?v=XmmMQfpQh40