import { getServerSession} from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwentoe from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })],
    // jwt:{ 
    //     encode: ({ secret, token}) => {},
    //     decode: async ({ secret, token}) => {},
    // },
    theme: {
        colorScheme: "light",
        logo: '/logo.svg',
    },
    callbacks: {
        async signIn({user} : {user: AdapterUser | User}) {
            try {
                // return user
                // create user if doesnt exist
                
                return true;

            }
            catch (error: any) {
                console.log(error);
                return false;
            }
        },
        async session(session) {
            return session;
        },
    },
    

}