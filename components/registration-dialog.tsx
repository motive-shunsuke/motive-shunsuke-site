
"use client"

import { useState } from "react"
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

export function RegistrationDialog() {
    const { showRegistrationModal, setShowRegistrationModal, login } = useAuth()
    const [step, setStep] = useState<"initial" | "form" | "success">("initial")
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "Google User Company"
    })

    const handleGoogleConnect = () => {
        setIsLoading(true)
        // Simulate API delay
        setTimeout(() => {
            setIsLoading(false)
            setStep("form")
            // Auto-fill simulation
            setFormData({
                lastName: "坂井",
                firstName: "俊介",
                email: "shunsuke@salesforce-fan.com",
                company: "Insta BizHack Inc."
            })
        }, 1200)
    }

    const handleRegister = async () => {
        setIsLoading(true)

        // 1. Web-to-Lead Logic
        const w2lData = new FormData()
        w2lData.append("oid", "00Dd500000CQqX6")
        w2lData.append("retURL", "http://google.com")
        w2lData.append("last_name", formData.lastName)
        w2lData.append("first_name", formData.firstName)
        w2lData.append("email", formData.email)
        w2lData.append("company", formData.company)
        w2lData.append("description", "Registered via Prompt Library (Google Connect)")

        try {
            await fetch("https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8", {
                method: "POST",
                mode: "no-cors",
                body: w2lData
            })

            // Artificial delay
            await new Promise(r => setTimeout(r, 1500))

            // 2. Login Logic
            login({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                company: formData.company,
                avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            })

            setStep("success")

            // Close after showing success
            setTimeout(() => {
                setShowRegistrationModal(false)
                setStep("initial") // Reset for next time (though user is logged in now)
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
                        {step === "initial" && "Googleアカウントで登録"}
                        {step === "form" && "アカウント情報の確認"}
                        {step === "success" && "登録が完了しました！"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === "initial" && "わずか10秒で、全ての限定プロンプトをブックマーク・保存できるようになります。"}
                        {step === "form" && "Googleから取得した情報で会員登録を行います。"}
                        {step === "success" && "お気に入りのプロンプトが見つかりますように。"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {step === "initial" && (
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full gap-3 border-slate-200 py-6 text-base font-medium shadow-sm hover:bg-slate-50"
                            onClick={handleGoogleConnect}
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
                                    <Input value={formData.lastName} readOnly className="bg-slate-50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-500">名</label>
                                    <Input value={formData.firstName} readOnly className="bg-slate-50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500">メールアドレス</label>
                                <Input value={formData.email} readOnly className="bg-slate-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500">会社名</label>
                                <Input value={formData.company} readOnly className="bg-slate-50" />
                            </div>

                            <Button
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold mt-2"
                                onClick={handleRegister}
                                disabled={isLoading}
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
