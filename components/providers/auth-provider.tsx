"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    company: string
    title?: string       // Job Title
    description?: string // Bio/Profile text
    avatarUrl: string
}

interface AuthContextType {
    user: User | null
    isLoggedIn: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
    updateProfile: (data: Partial<User>) => void
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
    const [extendedProfile, setExtendedProfile] = useState<Partial<User>>({})

    // Load bookmarks and extended profile from localStorage
    useEffect(() => {
        try {
            const savedBookmarks = localStorage.getItem("bizhack_bookmarks")
            if (savedBookmarks) {
                setBookmarks(JSON.parse(savedBookmarks))
            }
        } catch (e) {
            console.error("Failed to parse bookmarks", e)
        }

        try {
            const savedProfile = localStorage.getItem("bizhack_extended_profile")
            if (savedProfile) {
                setExtendedProfile(JSON.parse(savedProfile))
            }
        } catch (e) {
            console.error("Failed to parse profile", e)
        }
    }, [])

    // Map session to User object, merging with extended profile
    const user: User | null = session?.user ? {
        id: session.user.email || "user",
        // Local edits (extendedProfile) take priority over Google data
        firstName: extendedProfile.firstName || (session.user as any).firstName || (session.user.name && session.user.name.includes(" ") ? session.user.name.split(" ").slice(1).join(" ") : "User"),
        lastName: extendedProfile.lastName || (session.user as any).lastName || (session.user.name ? session.user.name.split(" ")[0] : "Guest"),
        email: session.user.email || "",
        avatarUrl: session.user.image || "https://github.com/shadcn.png",

        // Extended fields (Local Storage has priority for edits, fallback to defaults)
        company: extendedProfile.company || "Member",
        title: extendedProfile.title || "",
        description: extendedProfile.description || ""
    } : null

    const login = async () => {
        await signIn("google")
    }

    const logout = async () => {
        try {
            await signOut({ redirect: false })
        } catch (e) {
            console.error("Logout error", e)
        } finally {
            window.location.href = "/"
        }
    }

    const updateProfile = (data: Partial<User>) => {
        setExtendedProfile(prev => {
            const newProfile = { ...prev, ...data }
            localStorage.setItem("bizhack_extended_profile", JSON.stringify(newProfile))
            return newProfile
        })
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
            updateProfile,
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
