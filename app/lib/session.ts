import { getServerSession} from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/components.types";
import { use } from "react";
import { createUser, getUser } from "./actions";
import jsonwebtoken from 'jsonwebtoken';


console.log('process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID);
console.log('process.env.GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET);
console.log('process.env.NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET);
export const authOptions: NextAuthOptions = {
    
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })],
    jwt: {
        encode: ({ secret, token }) => {
            console.log('JWT Secret encode:', secret);
          const encodedToken = jsonwebtoken.sign(
            {
              ...token,
              iss: "grafbase",
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            secret
          );
          
          return encodedToken;
        },
        decode: async ({ secret, token }) => {
            console.log('JWT Secret decode:', secret);
          const decodedToken = jsonwebtoken.verify(token!, secret);
          return decodedToken as JWT;
        },
      },
    theme: {
        colorScheme: "light",
        logo: '/logo.svg',
    },
    callbacks: {
        async session({session}) {
            console.log('hilaaaaaaaa');
            console.log('session', session);
            const email = session.user?.email as string;
            console.log('email', email);
            try {
                const data = await getUser(email) as {user?: UserProfile};

                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user,
                    }
                }
                return newSession;
            } catch (error) {
                console.log('error retriving user data', error);
                return session;
            }
            
        },

        async signIn({user} : {user: AdapterUser | User}) {
            console.log('sign in user', user);
            try {
                const isUserExist = await getUser(user?.email! as string) as {user?: UserProfile};
                if (!isUserExist.user) {
                    console.log('dont exist', user);
                    await createUser(user.name as string, user.email as string, user.image as string, "")
                    console.log('after createUser');
                }
                
                return true;

            }
            catch (error: any) {
                console.log('error signing in', error);
                console.log(error);
                return false;
            }
        },


    },
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session
}