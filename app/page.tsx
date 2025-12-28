import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PromptLibrary } from "@/components/prompt-library"
import { ProductLinks } from "@/components/product-links"
import { SalesforceInsights } from "@/components/salesforce-insights"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <Hero />
      <div id="prompts">
        <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading prompts...</div>}>
          <PromptLibrary limit={6} hideFilters={true} showViewMore={true} />
        </Suspense>
      </div>
      <div id="products">
        <ProductLinks />
      </div>
      <div id="insights">
        <SalesforceInsights />
      </div>
      <Footer />
    </main>
  )
}
