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
      }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
//https://www.youtube.com/watch?v=XmmMQfpQh40