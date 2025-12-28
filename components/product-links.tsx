import { ExternalLink, Github, Command, Server, Bot, Cloud } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
    {
        title: "Google Apps Script",
        description: "Gmail, Calendar, Sheetsを連携させ、業務を完全自動化するためのスクリプト集。",
        icon: Command, // Lucide doesn't have GAS icon, standard command/code icon
        link: "https://developers.google.com/apps-script",
        tag: "Automation"
    },
    {
        title: "Google Gemini",
        description: "最新のマルチモーダルAIを活用した業務分析・画像解析ノウハウ。",
        icon: Bot,
        link: "https://gemini.google.com/",
        tag: "AI"
    },
    {
        title: "GitHub Actions",
        description: "コードの管理からデプロイまで。CI/CDパイプラインの構築ガイド。",
        icon: Github,
        link: "https://github.com",
        tag: "DevOps"
    },
    {
        title: "Vercel Deployment",
        description: "Next.jsアプリケーションを最速・最適にデプロイするためのプラットフォーム。",
        icon: Server, // Triangle-ish
        link: "https://vercel.com",
        tag: "Infrastructure"
    },
    {
        title: "Looker Studio",
        description: "Salesforceやスプレッドシートのデータを統合し、可視化するBIツール。",
        icon: Cloud,
        link: "https://lookerstudio.google.com/",
        tag: "Data Viz"
    },
    {
        title: "Salesforce Einstein",
        description: "CRMにAIを組み込み、顧客インサイトを深めるための活用術。",
        icon: Cloud,
        link: "https://www.salesforce.com/ap/products/einstein/overview/",
        tag: "CRM AI"
    }
]

export function ProductLinks() {
    return (
        <section className="container mx-auto px-4 py-20 bg-slate-50/50">
            <div className="mb-12 flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-4 border-slate-200 bg-white text-slate-700">
                    Tools & Resources
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    開発ツール・リソース
                </h2>
                <p className="max-w-2xl text-slate-600">
                    業務効率化とAI活用のために厳選した、プロフェッショナルなツール群。
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                    <a
                        key={index}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                    >
                        <Card className="h-full border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <product.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    {product.title}
                                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                </CardTitle>
                                <CardDescription>{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="secondary" className="bg-slate-50 group-hover:bg-slate-100">
                                    {product.tag}
                                </Badge>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        </section>
    )
}
