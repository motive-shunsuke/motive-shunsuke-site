import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="bg-white py-12 border-t border-slate-100">
            <div className="container mx-auto px-4 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                    最新のハックはInstagramで発信中
                </h3>
                <p className="mb-8 text-slate-600">
                    ショート動画や図解で、より分かりやすく解説しています。<br />
                    ぜひフォローして最新情報をキャッチしてください。
                </p>

                <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg mb-12"
                    asChild
                >
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-2 h-5 w-5" />
                        Instagramをチェック
                    </a>
                </Button>

                <div className="text-sm text-slate-400">
                    © 2024 AI x Business Hack Portfolio. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}
