"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/providers/auth-provider"
import { PromptLibrary } from "@/components/prompt-library"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, User as UserIcon, Heart, Save } from "lucide-react"

function MyPageContent() {
    const { user, isLoggedIn, updateProfile } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultTab = searchParams.get("tab") || "profile"

    const [isSaving, setIsSaving] = useState(false)
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        company: user?.company || "",
        title: user?.title || "",
        description: user?.description || ""
    })

    // Update local state when user loads
    useState(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                company: user.company || "",
                title: user.title || "",
                description: user.description || ""
            })
        }
    })

    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <Card className="w-full max-w-md text-center p-8">
                        <div className="mb-4 bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                            <UserIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">ログインが必要です</h2>
                        <p className="text-slate-600 mb-6">マイページを表示するにはログインしてください。</p>
                        <Button onClick={() => router.push("/")}>トップへ戻る</Button>
                    </Card>
                </div>
                <Footer />
            </main>
        )
    }

    const handleSaveProfile = async () => {
        setIsSaving(true)
        // Simulate network delay
        await new Promise(r => setTimeout(r, 800))

        updateProfile({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            company: profileData.company,
            title: profileData.title,
            description: profileData.description
        })

        setIsSaving(false)
    }

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            <Header />

            <div className="container mx-auto px-4 py-10 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar Profile Summary */}
                    <Card className="w-full md:w-1/3 bg-white shadow-sm border-slate-200">
                        <CardContent className="pt-8 text-center flex flex-col items-center">
                            <Avatar className="h-24 w-24 mb-4 ring-4 ring-offset-2 ring-blue-50">
                                <AvatarImage src={user?.avatarUrl} alt={user?.lastName} />
                                <AvatarFallback className="bg-slate-100 text-slate-500 text-2xl">
                                    {user?.lastName?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold">{user?.lastName} {user?.firstName}</h2>
                            <p className="text-sm text-slate-500 mb-1">{user?.email}</p>
                            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {user?.company}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    <div className="w-full md:w-2/3">
                        <Tabs defaultValue={defaultTab} className="w-full">
                            <TabsList className="w-full grid w-full grid-cols-2 bg-white border border-slate-200 p-1 mb-6 h-auto rounded-xl">
                                <TabsTrigger value="profile" className="py-3 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 font-medium rounded-lg">
                                    <UserIcon className="w-4 h-4 mr-2" />
                                    プロフィール設定
                                </TabsTrigger>
                                <TabsTrigger value="bookmarks" className="py-3 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 font-medium rounded-lg">
                                    <Heart className="w-4 h-4 mr-2" />
                                    ブックマーク
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <Card className="border-slate-200 shadow-sm">
                                    <CardHeader>
                                        <CardTitle>プロフィール編集</CardTitle>
                                        <CardDescription>
                                            アカウント情報を管理できます。
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">姓</label>
                                                <Input
                                                    value={profileData.lastName}
                                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                                    className="bg-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">名</label>
                                                <Input
                                                    value={profileData.firstName}
                                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                                    className="bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">メールアドレス (Google)</label>
                                            <Input value={user?.email} disabled className="bg-slate-50" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">会社名</label>
                                            <Input
                                                value={profileData.company}
                                                onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                                                placeholder="会社名を入力"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">役職</label>
                                            <Input
                                                value={profileData.title}
                                                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                                                placeholder="例: マーケティングマネージャー"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">自己紹介 / メモ</label>
                                            <Textarea
                                                value={profileData.description}
                                                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                                                placeholder="興味のある分野や、生成AI活用における目標など"
                                                className="min-h-[100px]"
                                            />
                                        </div>

                                        <Button
                                            onClick={handleSaveProfile}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                                            disabled={isSaving}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 保存中...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" /> 変更を保存
                                                </>
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="bookmarks">
                                <Card className="border-slate-200 shadow-sm border-0 bg-transparent shadow-none">
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
                                        <h3 className="text-lg font-bold mb-2">保存したプロンプト</h3>
                                        <p className="text-slate-500 text-sm">
                                            ブックマークしたプロンプトがここに表示されます。
                                        </p>
                                    </div>
                                    <PromptLibrary
                                        limit={100}
                                        hideFilters={true}
                                        title=""
                                        showViewMore={false}
                                        defaultFilter="bookmarks"
                                    />
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}

export default function MyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
            <MyPageContent />
        </Suspense>
    )
}
