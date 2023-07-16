import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "@/lib/prisma";
import {compare} from "bcryptjs";

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            credentials:{
                email : {label : "email" , type:"text"},
                password : {label : "Password" ,type : "password"},
            },
            async authorize(credentials){
                const {email , password} = credentials ?? {};
                    if(!email || !password){
                        throw new Error("Missing email or Password");
                }
                    const user = await db.user.findFirst({
                        where : {
                            email,
                        },
                    });
                   if(!user || !(await compare(password ,user.password))){
                       throw new Error("Invalid username or password")
                   }
                   return {
                       id:user.id,
                       email:user.email,
                       name : user.name
                   };
            },
        }),
    ],

    callbacks: {
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
            }
            return token
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            // session.accessToken = token.accessToken;
            session.user.id = token.id;

            return session;
        },
    }
};

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST};