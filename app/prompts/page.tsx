import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromptLibrary } from "@/components/prompt-library"

export default function PromptsPage() {
    return (
        <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
            <Header />
            <div className="pt-10">
                <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading prompts...</div>}>
                    <PromptLibrary title="プロンプトライブラリ (全30+件)" showViewMore={false} />
                </Suspense>
            </div>
            <Footer />
        </main>
    )
}
