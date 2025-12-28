"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    company: string
    avatarUrl: string
}

interface AuthContextType {
    user: User | null
    isLoggedIn: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
    bookmarks: string[]
    toggleBookmark: (promptId: string) => void
    showRegistrationModal: boolean
    setShowRegistrationModal: (show: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const [bookmarks, setBookmarks] = useState<string[]>([])
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)

    // Load bookmarks from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("bizhack_bookmarks")
        if (saved) {
            setBookmarks(JSON.parse(saved))
        }
    }, [])

    // Map session to User object
    const user: User | null = session?.user ? {
        id: session.user.email || "user",
        firstName: session.user.name && session.user.name.includes(" ") ? session.user.name.split(" ").slice(1).join(" ") : "", // Everything after first space
        lastName: session.user.name ? session.user.name.split(" ")[0] : "", // First part or full name
        email: session.user.email || "",
        company: "Member",
        avatarUrl: session.user.image || "https://github.com/shadcn.png"
    } : null

    const login = async () => {
        await signIn("google")
    }

    const logout = async () => {
        await signOut()
    }

    const toggleBookmark = (promptId: string) => {
        if (status !== 'authenticated') {
            setShowRegistrationModal(true)
            return
        }

        setBookmarks(prev => {
            const newBookmarks = prev.includes(promptId)
                ? prev.filter(id => id !== promptId)
                : [...prev, promptId]

            localStorage.setItem("bizhack_bookmarks", JSON.stringify(newBookmarks))
            return newBookmarks
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn: status === "authenticated",
            login,
            logout,
            bookmarks,
            toggleBookmark,
            showRegistrationModal,
            setShowRegistrationModal
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AuthProviderContent>{children}</AuthProviderContent>
        </SessionProvider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
