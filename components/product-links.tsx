import { ExternalLink, Database, Code, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
    {
        title: "Notion Template for Biz",
        description: "業務効率化に特化したNotionテンプレート配布中。",
        icon: Database,
        link: "#",
        tag: "Template"
    },
    {
        title: "AI Automation Tool",
        description: "日々の定型業務を自動化するオリジナルスクリプト。",
        icon: Zap,
        link: "#",
        tag: "Tool"
    },
    {
        title: "Learning Roadmap",
        description: "エンジニア未経験からAI活用人材になるためのロードマップ。",
        icon: Code,
        link: "#",
        tag: "Document"
    }
]

export function ProductLinks() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="mb-12 flex flex-col items-center text-center">
                <Badge variant="outline" className="mb-4 border-slate-200 bg-slate-50 text-slate-700">
                    Products & Resources
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    開発ツール・リソース
                </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {products.map((product, index) => (
                    <a
                        key={index}
                        href={product.link}
                        className="group block"
                    >
                        <Card className="h-full border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <product.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="flex items-center gap-2">
                                    {product.title}
                                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                </CardTitle>
                                <CardDescription>{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="secondary" className="bg-slate-100 group-hover:bg-slate-200">
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
