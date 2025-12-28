import { ExternalLink, Database, Workflow, Bot, Cloud, BarChart3, Globe, Sparkles, GitBranch, Triangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
    {
        title: "Agentforce",
        description: "自律型AIエージェントをローコードで構築。顧客対応から社内業務まで、AIが自ら考え行動します。",
        icon: Bot,
        link: "https://www.salesforce.com/agentforce/",
        tag: "Autonomous AI"
    },
    {
        title: "Salesforce Core",
        description: "Sales Cloud, Service Cloudなど、ビジネスの根幹を支える世界No.1 CRMプラットフォーム。",
        icon: Cloud,
        link: "https://www.salesforce.com/jp/products/",
        tag: "CRM Platform"
    },
    {
        title: "Tableau",
        description: "直感的なビジュアル分析プラットフォーム。データを「見る」だけでなく「理解」し、次のアクションへ。",
        icon: BarChart3,
        link: "https://www.tableau.com/ja-jp",
        tag: "Analytics"
    },
    {
        title: "Google AI",
        description: "GeminiやVertex AIを活用し、マルチモーダルな生成AI体験と高度な機械学習モデルを統合。",
        icon: Sparkles,
        link: "https://ai.google/intl/ja/",
        tag: "Generative AI"
    },
    {
        title: "Git / GitHub",
        description: "世界標準のバージョン管理システム。チーム開発におけるコードの変更履歴を安全かつ効率的に管理。",
        icon: GitBranch,
        link: "https://git-scm.com/",
        tag: "Version Control"
    },
    {
        title: "Vercel",
        description: "Next.jsなどのフロントエンド開発に最適化されたデプロイプラットフォーム。高速なWeb体験を提供。",
        icon: Triangle,
        link: "https://vercel.com/",
        tag: "Deployment"
    }
]

export function ProductLinks() {
    return (
        <section id="products" className="container mx-auto px-4 py-20 bg-slate-50/50">
            <div className="mb-12 flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-4 border-blue-200 bg-white text-blue-700">
                    Technology Stack
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    開発ツール・テクノロジー
                </h2>
                <p className="max-w-2xl text-slate-600">
                    世界最先端のSalesforceプラットフォームを活用し、<br />ビジネスの成長と変革を加速させます。
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
                        <Card className="h-full border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:border-blue-200">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <product.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    {product.title}
                                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                </CardTitle>
                                <CardDescription>{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="secondary" className="bg-slate-50 group-hover:bg-slate-100 text-slate-600">
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
