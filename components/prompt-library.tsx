"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Copy, Check, Lock, ArrowRight, Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { prompts } from "@/lib/prompts"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { useSearchParams } from "next/navigation"

interface PromptLibraryProps {
    limit?: number
    hideFilters?: boolean
    showViewMore?: boolean
    title?: string
}

export function PromptLibrary({ limit, hideFilters = false, showViewMore = false, title = "明日から使える！魔法のプロンプト集" }: PromptLibraryProps) {
    const { isLoggedIn, bookmarks, toggleBookmark, setShowRegistrationModal } = useAuth()
    const searchParams = useSearchParams()

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [copiedId, setCopiedId] = useState<string | null>(null)

    // Check for "bookmarks" filter in URL
    useEffect(() => {
        if (searchParams.get("filter") === "bookmarks") {
            setSelectedTag("bookmarks")
        }
    }, [searchParams])

    // Calculate unique tags
    const allTags = Array.from(new Set(prompts.flatMap(p => p.tags.filter(t => t !== "Free" && t !== "Pro"))))

    // Filter prompts
    const filteredPrompts = prompts.filter(prompt => {
        // 1. Tag / Bookmark Filter
        let matchesTag = true
        if (selectedTag === "bookmarks") {
            matchesTag = bookmarks.includes(prompt.id)
        } else if (selectedTag) {
            matchesTag = prompt.tags.includes(selectedTag)
        }

        // 2. Search Filter
        const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))

        return matchesSearch && matchesTag
    })

    // Apply limit
    const displayPrompts = limit ? filteredPrompts.slice(0, limit) : filteredPrompts

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <section id="prompts" className="container mx-auto px-4 py-20 bg-white">
            <div className="mb-12 flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">
                    Prompt Library
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    {title}
                </h2>
                <p className="max-w-2xl text-slate-600">
                    コピペするだけで、日常の「めんどくさい」が「一瞬」に変わる。<br />
                    誰でも簡単に真似できる、厳選AI活用術です。
                </p>
            </div>

            {!hideFilters && (
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-2">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedTag === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTag(null)}
                            className="rounded-full"
                        >
                            All
                        </Button>

                        {/* Bookmarks Tab */}
                        {isLoggedIn && (
                            <Button
                                variant={selectedTag === "bookmarks" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTag("bookmarks")}
                                className="rounded-full gap-1"
                            >
                                <Bookmark className="w-3 h-3 fill-current" />
                                My Bookmarks
                            </Button>
                        )}

                        {allTags.slice(0, 8).map(tag => (
                            <Button
                                key={tag}
                                variant={selectedTag === tag ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTag(tag)}
                                className="rounded-full"
                            >
                                #{tag}
                            </Button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="キーワード検索..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 rounded-full bg-slate-50 border-slate-200"
                        />
                    </div>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {displayPrompts.map((prompt) => {
                        const isLocked = prompt.isPremium && !isLoggedIn
                        const isBookmarked = bookmarks.includes(prompt.id)

                        return (
                            <motion.div
                                key={prompt.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className={cn(
                                    "flex h-full flex-col border-slate-200 bg-white transition-all hover:shadow-lg relative group",
                                    isLocked ? "opacity-90 bg-slate-50/50 border-dashed" : "hover:border-blue-300"
                                )}>
                                    {/* Bookmark Button (Top Right) */}
                                    <button
                                        onClick={() => toggleBookmark(prompt.id)}
                                        className={cn(
                                            "absolute top-4 right-4 z-20 p-2 rounded-full transition-all",
                                            isBookmarked
                                                ? "text-pink-500 hover:bg-pink-50"
                                                : "text-slate-300 hover:text-pink-400 hover:bg-slate-100"
                                        )}
                                    >
                                        <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
                                    </button>

                                    <CardHeader>
                                        <div className="mb-2 flex flex-wrap gap-2 pr-8">
                                            {prompt.tags.filter(t => t !== "Free" && t !== "Pro").slice(0, 3).map(tag => (
                                                <Badge key={tag} variant={isLocked ? "outline" : "secondary"} className={cn(
                                                    "transition-colors",
                                                    !isLocked && "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                                                )}>
                                                    #{tag}
                                                </Badge>
                                            ))}
                                            {prompt.isPremium && (
                                                <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
                                                    Member Only
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg leading-tight text-slate-900">{prompt.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 relative">
                                        <div className={cn(
                                            "rounded-md p-4 text-xs sm:text-sm font-mono whitespace-pre-wrap max-h-48 overflow-hidden transition-all",
                                            isLocked ? "bg-slate-100 text-slate-400 blur-sm select-none" : "bg-slate-50 text-slate-700 overflow-y-auto custom-scrollbar"
                                        )}>
                                            {isLocked ? "（会員限定コンテンツ）\n\nここには非常に価値のある具体的なプロンプトが表示されます。\n無料登録することで、このコンテンツをブックマークして保存できます。" : prompt.content}
                                        </div>
                                        {isLocked && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <div className="bg-white/90 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm flex items-center gap-2">
                                                    <Lock className="w-4 h-4 text-slate-500" />
                                                    <span className="text-sm font-bold text-slate-700">会員限定</span>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter>
                                        {isLocked ? (
                                            <Button
                                                className="w-full gap-2 transition-all font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                                                onClick={() => setShowRegistrationModal(true)}
                                            >
                                                <span className="flex items-center gap-2">
                                                    登録してプロンプトを表示
                                                </span>
                                            </Button>
                                        ) : (
                                            <Button
                                                className={cn("w-full gap-2 transition-all font-medium", copiedId === prompt.id ? "bg-green-600 hover:bg-green-700 text-white" : "bg-slate-900 text-white hover:bg-slate-800")}
                                                onClick={() => copyToClipboard(prompt.content, prompt.id)}
                                            >
                                                {copiedId === prompt.id ? (
                                                    <>
                                                        <Check className="h-4 w-4" /> Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="h-4 w-4" /> Copy Prompt
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* View More Button */}
            {showViewMore && (
                <div className="mt-12 text-center">
                    <Link href="/prompts">
                        <Button size="lg" className="rounded-full px-8 gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
                            全てのプロンプトを見る ({prompts.length}+) <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            )}

            {!hideFilters && displayPrompts.length === 0 && (
                <div className="mt-12 text-center text-slate-500 py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-lg font-medium mb-2">該当するプロンプトがありません</p>
                    <p className="text-sm">検索条件を変更するか、全てのタグを表示してください。</p>
                </div>
            )}
        </section>
    )
}

