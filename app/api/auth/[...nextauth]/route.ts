import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: '/auth/signin', // Optional: Custom sign-in page if we wanted, but default is fine or we trigger via Modal
    },
    callbacks: {
        async jwt({ token, account, profile }: any) {
            // Persist the OAuth profile fields to the token right after signin
            if (account && profile) {
                token.firstName = profile.given_name
                token.lastName = profile.family_name
            }
            return token
        },
        async session({ session, token }: any) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.firstName = token.firstName
            session.user.lastName = token.lastName
            return session
        },
    },
})

export { handler as GET, handler as POST }

export const runtime = 'edge'
