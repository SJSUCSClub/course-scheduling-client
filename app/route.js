import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret:process.env.SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
//https://www.youtube.com/watch?v=XmmMQfpQh40