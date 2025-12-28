
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WebToLeadForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false)

    // Form State for controlled inputs (to allow auto-fill)
    const [formData, setFormData] = useState({
        last_name: "",
        first_name: "",
        email: "",
        company: "",
        title: "", // Job Title
        description: "" // Message
    })

    const handleGoogleLogin = () => {
        setIsLoading(true)
        // Simulate Google Login API call
        setTimeout(() => {
            setIsLoading(false)
            setIsGoogleLoggedIn(true)
            // Auto-fill Logic
            setFormData(prev => ({
                ...prev,
                last_name: "坂井", // Example data from Google
                first_name: "俊介",
                email: "shunsuke@example.com",
                company: "Insta BizHack Inc."
            }))
        }, 1500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    const textareaClass = "flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"

    return (
        <Card className="w-full max-w-2xl mx-auto bg-white border-slate-200 shadow-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">お問い合わせ</CardTitle>
                <CardDescription>
                    Salesforceの導入相談や、AI活用に関するご質問はこちらから。
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Google Login Button for Autofill */}
                <div className="mb-8 text-center bg-slate-50 p-6 rounded-xl border border-dashed border-slate-200">
                    <p className="text-sm text-slate-600 mb-4">
                        Googleアカウントでログインすると、基本情報を自動入力できます。
                    </p>
                    <Button
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={isLoading || isGoogleLoggedIn}
                        className="bg-white hover:bg-slate-50 relative border-slate-200"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                                取得中...
                            </span>
                        ) : isGoogleLoggedIn ? (
                            <span className="flex items-center gap-2 text-green-600 font-bold">
                                ✓ 入力完了
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                Googleで自動入力
                            </span>
                        )}
                    </Button>
                </div>

                {/* Salesforce Web-to-Lead Form */}
                <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">

                    {/* Hidden Fields */}
                    <input type="hidden" name="oid" value={process.env.NEXT_PUBLIC_SALESFORCE_OID || "00Dxxxxxxxxxxxx"} />
                    <input type="hidden" name="retURL" value={`${typeof window !== 'undefined' ? window.location.origin : ''}/thanks`} />

                    {/* Visible Fields */}
                    <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="last_name" className={labelClass}>姓 <span className="text-red-500">*</span></label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="山田"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="first_name" className={labelClass}>名</label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="太郎"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className={labelClass}>メールアドレス <span className="text-red-500">*</span></label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="taro.yamada@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="company" className={labelClass}>会社名</label>
                            <Input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="株式会社Awesome"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="title" className={labelClass}>役職</label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="マーケティングマネージャー"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className={labelClass}>お問い合わせ内容</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="具体的なご相談内容をご記入ください。"
                                className={textareaClass}
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all">
                            送信する
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
