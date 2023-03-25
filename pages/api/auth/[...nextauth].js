import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import db from "@/utils/mongo";
import User from "@/models/User";

export const authOptions = ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await db.connect();

            const existingUser = await User.findOne({ email: user.email })

            if (existingUser) {
                await User.updateOne(
                    { email: user.email },
                    {
                        $set: {
                            provider: account.provider,
                            providerData: account
                        }
                    }
                )
                return true
            }

            const newUser = new User({
                name: user.name,
                email: user.email,
                provider: account.provider,
                providerId: account.id,
                providerData: account
            })
            await newUser.save()
            return true
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        },
    },
    database: process.env.MONGODB_URI,
})

export default NextAuth(authOptions)