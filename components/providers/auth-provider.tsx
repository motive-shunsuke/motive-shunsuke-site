
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface UserProfile {
    firstName: string
    lastName: string
    email: string
    company: string
    avatarUrl: string
}

interface AuthContextType {
    user: UserProfile | null
    isLoggedIn: boolean
    bookmarks: string[]
    login: (profile: UserProfile) => void
    logout: () => void
    toggleBookmark: (promptId: string) => void
    showRegistrationModal: boolean
    setShowRegistrationModal: (show: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [bookmarks, setBookmarks] = useState<string[]>([])
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user_profile')
        const storedBookmarks = localStorage.getItem('user_bookmarks')

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        if (storedBookmarks) {
            setBookmarks(JSON.parse(storedBookmarks))
        }
    }, [])

    const login = (profile: UserProfile) => {
        setUser(profile)
        localStorage.setItem('user_profile', JSON.stringify(profile))
    }

    const logout = () => {
        setUser(null)
        setBookmarks([]) // Optional: clear bookmarks on logout
        localStorage.removeItem('user_profile')
        localStorage.removeItem('user_bookmarks')
    }

    const toggleBookmark = (promptId: string) => {
        if (!user) {
            setShowRegistrationModal(true)
            return
        }

        setBookmarks(prev => {
            const newBookmarks = prev.includes(promptId)
                ? prev.filter(id => id !== promptId)
                : [...prev, promptId]

            localStorage.setItem('user_bookmarks', JSON.stringify(newBookmarks))
            return newBookmarks
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user,
            bookmarks,
            login,
            logout,
            toggleBookmark,
            showRegistrationModal,
            setShowRegistrationModal
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
