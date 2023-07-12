import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "@/lib/prisma";
import { compare } from "bcrypt";

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
                       email:user.email
                   };
            },
        }),
    ],

    callbacks:{
        async jwt({token,user}){
            return {...token,...user};
        },

        async session({session,token}){
            session.user = token as any;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST};