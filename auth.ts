import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, account, profile }: any) {
            if (account && profile) {
                token.firstName = profile.given_name
                token.lastName = profile.family_name
            }
            return token
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.firstName = token.firstName
                session.user.lastName = token.lastName
            }
            return session
        },
    },
})
