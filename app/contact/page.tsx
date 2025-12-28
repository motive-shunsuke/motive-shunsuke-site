
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WebToLeadForm } from "@/components/web-to-lead-form"

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <WebToLeadForm />
            </div>
            <Footer />
        </main>
    )
}
