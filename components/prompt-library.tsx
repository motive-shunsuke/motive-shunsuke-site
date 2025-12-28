"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Copy, Check, Terminal, Sparkles, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Professional Grade Prompts
const prompts = [
    {
        id: "pro-1",
        title: "高精度ペルソナ定義 & 共感マップ作成",
        description: "マーケティング施策の精度を劇的に高めるための、深層心理に迫るペルソナ定義。",
        content: `あなたは世界トップクラスのマーケティングストラテジストです。
以下の[ターゲット層]について、深層心理まで掘り下げたペルソナを定義し、共感マップ(Empathy Map)を作成してください。

ターゲット層: [例: 30代男性、大手企業のDX推進担当]

出力形式:
1. 基本プロファイル (名前、年齢、役職、年収、家族構成)
2. サイコグラフィック (価値観、ライフスタイル、性格特性)
3. 業務上の課題 (Pain Points) と 理想の状態 (Gain Points)
4. 共感マップ
   - 見ているもの (Seeing)
   - 聞いているもの (Hearing)
   - 考えていること・感じていること (Thinking & Feeling)
   - 言っていること・行っていること (Saying & Doing)

重要なポイント:
一般的な表面的な分析ではなく、「本音」や「建前」、「恐れ」や「野心」まで踏み込んで記述してください。`,
        tags: ["マーケティング", "分析", "戦略"]
    },
    {
        id: "pro-2",
        title: "GASコード生成: スプシ⇔Gmail連携",
        description: "スプレッドシートのリストに基づいて、条件分岐付きでGmailを自動送信するGASコード生成。",
        content: `Google Apps Script (GAS) のエキスパートとして振る舞ってください。
以下の要件を満たすGASの関数 \`sendPersonalizedEmails\` を作成してください。

【要件】
1. アクティブなスプレッドシートの「List」シートからデータを取得する。
2. データ構造: A列=会社名, B列=担当者名, C列=メールアドレス, D列=ステータス
3. D列が「未送信」の行に対してのみ処理を行う。
4. 送信内容は以下の通り埋め込む:
   件名: 【ご提案】[会社名]様の業務効率化について
   本文: [担当者名] 様、... (一般的な営業メールのテンプレート)
5. 送信完了後、D列を「送信済み」に更新する。
6. エラーハンドリングを含め、実行ログに残すこと。

コードは可読性を高くし、JSDoc形式でコメントを付与してください。`,
        tags: ["開発", "GAS", "自動化"]
    },
    {
        id: "pro-3",
        title: "Salesforce SOQLクエリ最適化",
        description: "複雑な条件でのデータ抽出を行うための、パフォーマンスを考慮したSOQLクエリを作成。",
        content: `Salesforceのシニアデベロッパーとして答えてください。
以下のビジネス要件を満たすための、最適化されたSOQLクエリを作成してください。

【要件】
・取得対象: 商談 (Opportunity)
・条件:
  1. 完了予定日 (CloseDate) が今月以内
  2. フェーズ (StageName) が 'Proposal' または 'Negotiation'
  3. 金額 (Amount) が 1,000,000 円以上
・取得項目: 商談名, 金額, フェーズ, 取引先名 (Account.Name), 所有者名 (Owner.Name)
・並び替え: 金額の降順
・リミット: 上位50件

パフォーマンスへの配慮（インデックスの使用可能性など）についても解説を加えてください。`,
        tags: ["Salesforce", "開発", "分析"]
    },
    {
        id: "pro-4",
        title: "議事録からネクストアクション自動抽出",
        description: "会議の乱雑なメモから、実行可能なタスクリストと担当者、期限を構造化して抽出。",
        content: `優秀なプロジェクトマネージャーとして振る舞ってください。
以下の[会議メモ]から、具体的な「ネクストアクション」を抽出し、テーブル形式で整理してください。

[会議メモ]
[ここにテキストを貼り付け]

【出力フォーマット】
Markdownテーブル形式:
| タスク内容 | 担当者 | 推定期限 | 優先度(高/中/低) |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

抽出ルール:
1. 曖昧な表現は、実行可能なアクションに変換する（例:「検討する」→「〇〇についてのリサーチを行い、案を3つ提示する」）。
2. 担当者や期限が明記されていない場合は、文脈から推測するか「要確認」と記載する。
3. 優先度は文脈の緊急度から判断する。`,
        tags: ["効率化", "マネジメント", "時短"]
    },
    {
        id: "pro-5",
        title: "クレーム対応メールの自動生成 (感情分析)",
        description: "顧客の怒りの感情に寄り添い、鎮火させるための丁寧かつ解決志向の返信メールを作成。",
        content: `カスタマーサポートの責任者（CS Head）として対応してください。
顧客から以下のクレームメールが届きました。
顧客の感情（怒り、失望、困惑）を汲み取り、共感を示した上で、建設的な解決策を提示する返信メールを作成してください。

[顧客からのメール]
「先日購入した御社のツールですが、マニュアル通りに設定しても全く動作しません。サポートに電話しても繋がりませんし、どうなっているのですか？業務に支障が出ており、大変困っています。早急に対応してください。返金も考えています。」

【返信の方針】
1. まず不便をかけたことを心から詫びる。
2. 状況を詳細に確認するための質問を簡潔にする（PC環境など）。
3. 優先対応することを伝え、担当者の直通連絡先を案内する。
4. 丁寧だが、卑屈になりすぎないプロフェッショナルなトーンで。`,
        tags: ["営業", "CS", "文章作成"]
    },
    {
        id: "pro-6",
        title: "要件定義書のドラフト作成",
        description: "ざっくりとしたアイデアから、開発者が理解できるレベルのシステム要件定義書を生成。",
        content: `システムアーキテクトとして振る舞ってください。
「[アプリ/サービスの概要]」を作りたいと考えています。
これについて、開発チームに渡せるレベルの「要件定義書」のドラフトを作成してください。

サービス概要: [例: 社内用の備品管理アプリ。QRコードで貸出・返却を管理したい]

【出力項目】
1. プロジェクトの目的・背景
2. 主要機能一覧 (Functional Requirements)
   - ユーザー側機能
   - 管理者側機能
3. 非機能要件 (Non-Functional Requirements)
   - セキュリティ、パフォーマンス、対応デバイス
4. データモデル案 (主要なエンティティとリレーション)
5. 想定される技術スタック (FW, DB, Infra)

抜け漏れがないよう、網羅的に記述してください。`,
        tags: ["開発", "PM", "設計"]
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
        <section id="prompts" className="container mx-auto px-4 py-20 bg-white">
            <div className="mb-12 flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">
                    Professional Prompt Library
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    プロが使う、実践的AIプロンプト
                </h2>
                <p className="max-w-2xl text-slate-600">
                    「なんとなく」の指示ではAIの真価は発揮できません。<br />
                    業務ハックの専門家が実際に使用している、高精度なプロンプトを公開。
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
                        className="pl-10 rounded-full bg-slate-50 border-slate-200"
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
                            <Card className="flex h-full flex-col border-slate-200 bg-white transition-all hover:shadow-lg hover:border-blue-300 group">
                                <CardHeader>
                                    <div className="mb-2 flex flex-wrap gap-2">
                                        {prompt.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <CardTitle className="text-lg leading-tight">{prompt.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="relative rounded-md bg-slate-900 p-4 text-xs sm:text-sm text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar">
                                        {/* Visual decoration for code block look */}
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            <div className="h-2 w-2 rounded-full bg-red-500/50" />
                                            <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                                            <div className="h-2 w-2 rounded-full bg-green-500/50" />
                                        </div>
                                        {prompt.content}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className={cn("w-full gap-2 transition-all font-medium", copiedId === prompt.id ? "bg-green-600 hover:bg-green-700 text-white" : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50")}
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
