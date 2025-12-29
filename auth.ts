import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: "720456339998-eu3lhg54oes85pcj81cbjivrq30n4ssk.apps.googleusercontent.com",
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
        async signIn({ user, account, profile }: any) {
            if (account?.provider === "google") {
                try {
                    // Send data to Salesforce Web-to-Lead
                    const formData = new URLSearchParams()
                    formData.append("oid", "00Dd500000CQqX6")
                    formData.append("last_name", profile?.family_name || user.name?.split(" ").pop() || "Guest")
                    formData.append("first_name", profile?.given_name || user.name?.split(" ")[0] || "User")
                    formData.append("email", user.email || "")
                    formData.append("company", "Google Login User")  // Default company
                    formData.append("lead_source", "Google Login")

                    // Fire and forget is NOT safe in Cloudflare Workers/Serverless, must await!
                    await fetch("https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData
                    }).catch(err => console.error("Salesforce Web-to-Lead error:", err))

                } catch (e) {
                    console.error("Error in signIn callback:", e)
                }
            }
            return true
        },
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
