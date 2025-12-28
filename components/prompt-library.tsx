"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Sample Data
const prompts = [
    {
        id: "1",
        title: "メール作成自動化",
        description: "丁寧なビジネスメールを素早く作成するためのプロンプト。",
        content: "以下の要件に基づいて、取引先に送るビジネスメールを作成してください。\n\n【要件】\n・相手：株式会社〇〇 山田様\n・目的：次回の打ち合わせ日程調整\n・候補日：X月X日 14:00~, X月Y日 10:00~\n・トーン：丁寧かつ簡潔に",
        tags: ["時短", "文章作成"]
    },
    {
        id: "2",
        title: "議事録の要約",
        description: "長い会議の書き起こしを要点だけにまとめる。",
        content: "以下の会議の書き起こしテキストを、以下の項目で要約してください。\n\n1. 決定事項\n2. ネクストアクション（担当者・期限）\n3. 保留事項\n\n【テキスト】\n[ここにテキストを貼り付け]",
        tags: ["時短", "分析"]
    },
    {
        id: "3",
        title: "セールストークスクリプト",
        description: "商品提案時の効果的な切り返しトークを作成。",
        content: "あなたはトップセールスマンです。顧客から「価格が高い」と言われた際の、価値を強調しつつ納得感のある切り返しトークを3パターン作成してください。\n商品：[商品名]\n価格：[価格]\n主なメリット：[メリット]",
        tags: ["営業", "アイデア"]
    },
    {
        id: "4",
        title: "データ分析・傾向把握",
        description: "CSVデータなどからトレンドを読み解く。",
        content: "以下の売上データを分析し、月ごとのトレンドと、来月の売上予測を立ててください。\nまた、売上が落ち込んでいる月があればその仮説も提示してください。\n\n[データ]",
        tags: ["分析", "Salesforce"]
    },
    {
        id: "5",
        title: "Salesforce数式作成",
        description: "複雑な数式フィールドのロジックを作成する。",
        content: "Salesforceの数式フィールドを作成したいです。\n要件：\n・契約終了日が今日から30日以内の場合、「更新アラート」と表示\n・それ以外は空白\n・オブジェクト：契約(Contract)\n・フィールド名：EndDate",
        tags: ["Salesforce", "時短"]
    }
]

const allTags = Array.from(new Set(prompts.flatMap(p => p.tags)))

export function PromptLibrary() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = prompt.title.includes(searchTerm) || prompt.description.includes(searchTerm)
        const matchesTag = selectedTag ? prompt.tags.includes(selectedTag) : true
        return matchesSearch && matchesTag
    })

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <section id="prompts" className="container mx-auto px-4 py-20 md:py-32 bg-slate-50/50">
            <div className="mb-12 flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">
                    Prompt Library
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    すぐに使えるAIプロンプト集
                </h2>
                <p className="max-w-2xl text-slate-600">
                    コピペして使える厳選プロンプト。業務効率化の第一歩をここから。
                </p>
            </div>

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
                    {allTags.map(tag => (
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
                        placeholder="プロンプトを検索..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-full bg-white"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {filteredPrompts.map((prompt) => (
                        <motion.div
                            key={prompt.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="flex h-full flex-col border-slate-200 bg-white transition-all hover:shadow-lg hover:border-blue-200">
                                <CardHeader>
                                    <div className="mb-2 flex flex-wrap gap-2">
                                        {prompt.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <CardTitle className="text-xl">{prompt.title}</CardTitle>
                                    <CardDescription>{prompt.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="rounded-md bg-slate-50 p-4 text-xs sm:text-sm text-slate-700 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                                        {prompt.content}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className={cn("w-full gap-2 transition-all", copiedId === prompt.id ? "bg-green-600 hover:bg-green-700" : "bg-slate-900 hover:bg-slate-800")}
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
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPrompts.length === 0 && (
                <div className="mt-12 text-center text-slate-500">
                    <p>該当するプロンプトが見つかりませんでした。</p>
                </div>
            )}
        </section>
    )
}
