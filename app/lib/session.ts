import { getServerSession} from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/components.types";
import { createUser, getUser } from "./actions";
import jsonwebtoken from 'jsonwebtoken';


export const authOptions: NextAuthOptions = {
    
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })],
    jwt: {
        encode: ({ secret, token }) => {
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
            const email = session.user?.email as string;
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
                return session;
            }
            
        },

        async signIn({user} : {user: AdapterUser | User}) {
            try {
                const isUserExist = await getUser(user?.email! as string) as {user?: UserProfile};
                if (!isUserExist.user) {
                    await createUser(user.name as string, user.email as string, user.image as string, "")
                }
                
                return true;

            }
            catch (error: any) {
                return false;
            }
        },


    },
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session
}