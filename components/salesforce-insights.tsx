import { Lightbulb, TrendingUp, ShieldCheck } from "lucide-react"

export function SalesforceInsights() {
    return (
        <section className="bg-slate-900 py-20 text-white">
            <div className="container mx-auto px-4">
                <div className="mb-12 flex flex-col items-center text-center">
                    <span className="mb-2 font-bold text-blue-400 tracking-wider text-sm">SALESFORCE INSIGHTS</span>
                    <h2 className="mb-8 text-3xl font-bold md:text-4xl">
                        元Salesforce SEが教える<br />運用の勘所
                    </h2>
                    <p className="max-w-2xl text-slate-400">
                        システムの導入だけでなく、現場で定着させるためのノウハウや、<br className="hidden md:inline" />AIと組み合わせた最新の活用事例を発信しています。
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-800 p-8 transition-colors hover:bg-slate-750 border border-slate-700">
                        <Lightbulb className="mb-4 h-10 w-10 text-yellow-400" />
                        <h3 className="mb-2 text-xl font-bold">定着化の鍵は「入力負荷の削減」</h3>
                        <p className="text-slate-400 leading-relaxed">
                            現場がSalesforceを使わない最大の理由は入力が面倒だからです。AI自動入力やデフォルト値の活用で、入力を極限まで減らす設計が重要です。
                        </p>
                    </div>
                    <div className="rounded-2xl bg-slate-800 p-8 transition-colors hover:bg-slate-750 border border-slate-700">
                        <TrendingUp className="mb-4 h-10 w-10 text-blue-400" />
                        <h3 className="mb-2 text-xl font-bold">レポートは「行動」に繋げる</h3>
                        <p className="text-slate-400 leading-relaxed">
                            ただ数字を見るだけのダッシュボードは意味がありません。「この数字が下がったらここへ電話する」というアクションまで設計に落とし込みます。
                        </p>
                    </div>
                    <div className="rounded-2xl bg-slate-800 p-8 transition-colors hover:bg-slate-750 border border-slate-700">
                        <ShieldCheck className="mb-4 h-10 w-10 text-green-400" />
                        <h3 className="mb-2 text-xl font-bold">権限設計はシンプルに</h3>
                        <p className="text-slate-400 leading-relaxed">
                            複雑すぎるプロファイルやロール階層は運用の足かせになります。必要最小限の権限からスタートし、拡張性を持たせた設計を心がけましょう。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
