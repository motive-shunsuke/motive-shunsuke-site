"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, CheckCircle } from "lucide-react"

interface LoginGateProps {
    onLogin: () => void
}

export function LoginGate({ onLogin }: LoginGateProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

    const handleLogin = async () => {
        setIsLoading(true)
        setStatus("loading")

        // 1. Simulate getting Google Profile (In a real app, this comes from NextAuth provider)
        const mockProfile = {
            last_name: "Member",
            first_name: "New",
            email: "new.member@example.com",
            company: "Google Login User"
        }

        // 2. Auto-register to Salesforce (Web-to-Lead)
        const formData = new FormData()
        formData.append("oid", "00Dd500000CQqX6") // User provided OID
        formData.append("retURL", "http://google.com") // Dummy retURL
        formData.append("last_name", mockProfile.last_name)
        formData.append("first_name", mockProfile.first_name)
        formData.append("email", mockProfile.email)
        formData.append("company", mockProfile.company)
        formData.append("description", "User registered via Google Login (Instant Bookmark)")

        try {
            // 'no-cors' mode allows sending data to a different origin without reading the response
            await fetch("https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8", {
                method: "POST",
                mode: "no-cors",
                body: formData
            })

            // Add artificial delay for UX
            await new Promise(resolve => setTimeout(resolve, 1500))

            setStatus("success")
            setTimeout(() => {
                onLogin()
            }, 800)

        } catch (error) {
            console.error("Registration failed", error)
            // Even if SF fails (e.g. adblocker), we likely still want to let the user in for this demo
            onLogin()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative mt-8 overflow-hidden rounded-xl border border-blue-100 bg-blue-50/50 p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Bookmark className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
                このプロンプトをブックマークする
            </h3>
            <p className="mb-6 text-slate-600">
                Googleアカウントでログインすると、<br />
                気に入ったプロンプトを保存して、いつでも見返せるようになります。<br />
                <span className="text-xs text-slate-500">（同時に会員登録が完了し、最新情報をお届けします）</span>
            </p>

            <Button
                size="lg"
                onClick={handleLogin}
                disabled={isLoading || status === "success"}
                className="relative min-w-[240px] rounded-full bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm transition-all"
            >
                {status === "loading" ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                        会員登録中...
                    </span>
                ) : status === "success" ? (
                    <span className="flex items-center gap-2 text-green-600 font-bold">
                        <CheckCircle className="h-5 w-5" /> 登録完了
                    </span>
                ) : (
                    <span className="flex items-center gap-2 font-medium">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                        Googleで無料登録して保存
                    </span>
                )}
            </Button>
            <p className="mt-4 text-xs text-slate-400">
                ※自動的にSalesforceの会員データベースに登録されます。
            </p>
        </div>
    )
}
