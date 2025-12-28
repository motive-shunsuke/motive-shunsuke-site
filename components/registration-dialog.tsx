
"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/providers/auth-provider"
import { CheckCircle, Loader2 } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"

export function RegistrationDialog() {
    const { user, isLoggedIn, login, showRegistrationModal, setShowRegistrationModal, updateProfile } = useAuth()
    const [step, setStep] = useState<"initial" | "form" | "success">("initial")
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    // Handle Post-Login Logic (If logged in but not registered in Salesforce)
    useEffect(() => {
        if (isLoggedIn && user) {
            const hasRegistered = localStorage.getItem("bizhack_sf_registered")
            if (!hasRegistered) {
                // User is logged in but hasn't completed Salesforce registration
                setFormData({
                    lastName: user.lastName,
                    firstName: user.firstName,
                    email: user.email,
                    company: user.company !== "Member" ? user.company : "" // Default to empty if generic
                })
                setStep("form")
                setShowRegistrationModal(true)
            } else {
                // Already registered, ensure modal is closed
                if (step === "initial") {
                    setShowRegistrationModal(false)
                }
            }
        }
    }, [isLoggedIn, user, setShowRegistrationModal])

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        await login() // This triggers NextAuth Google Sign In (Redirects)
    }

    const handleRegister = async () => {
        setIsLoading(true)

        // Save profile updates (in case user edited name/company)
        updateProfile({
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company
        })

        // 1. Web-to-Lead Logic
        const w2lData = new FormData()
        w2lData.append("oid", "00Dd500000CQqX6")
        w2lData.append("retURL", "http://google.com") // Dummy return URL since we use no-cors
        w2lData.append("last_name", formData.lastName)
        w2lData.append("first_name", formData.firstName)
        w2lData.append("email", formData.email)
        w2lData.append("company", formData.company || "Individual") // Fallback
        w2lData.append("description", "Registered via Prompt Library (Google Auth)")
        if (captchaToken) {
            w2lData.append("g-recaptcha-response", captchaToken)
        }

        try {
            await fetch("https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8", {
                method: "POST",
                mode: "no-cors",
                body: w2lData
            })

            // Mark as registered
            localStorage.setItem("bizhack_sf_registered", "true")

            setStep("success")

            // Close after showing success
            setTimeout(() => {
                setShowRegistrationModal(false)
                // Don't reset step immediately to avoid flicker, handled by useEffect
            }, 2000)

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader className="text-center items-center">
                    {step === "success" ? (
                        <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                    ) : (
                        <div className="mb-4 h-12 w-12 overflow-hidden rounded-full border border-slate-200 p-1">
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-full w-full object-contain" />
                        </div>
                    )}
                    <DialogTitle className="text-xl">
                        {step === "initial" && "Googleアカウントで登録/ログイン"}
                        {step === "form" && "アカウント情報の確認"}
                        {step === "success" && "登録が完了しました！"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === "initial" && "わずか10秒で、全ての限定プロンプトをブックマーク・保存できるようになります。"}
                        {step === "form" && "Googleから取得した情報で会員登録を完了します。会社名を入力してください。"}
                        {step === "success" && "お気に入りのプロンプトが見つかりますように。"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {step === "initial" && (
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full gap-3 border-slate-200 py-6 text-base font-medium shadow-sm hover:bg-slate-50"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <img src="https://www.google.com/favicon.ico" alt="G" className="h-5 w-5" />
                            )}
                            Googleで続ける
                        </Button>
                    )}

                    {step === "form" && (
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-500">姓</label>
                                    <Input
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-500">名</label>
                                    <Input
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500">メールアドレス</label>
                                <Input value={formData.email} readOnly className="bg-slate-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500">会社名 <span className="text-red-500">*</span></label>
                                <Input
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="会社名を入力"
                                />
                            </div>

                            <div className="flex justify-center my-2">
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} // Ideally prevent crash if missing
                                    onChange={(val) => setCaptchaToken(val)}
                                    size="compact"
                                />
                            </div>

                            <Button
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold mt-2"
                                onClick={handleRegister}
                                disabled={isLoading || !formData.company || !captchaToken}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 登録中...
                                    </>
                                ) : (
                                    "登録してプロンプトを保存"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
