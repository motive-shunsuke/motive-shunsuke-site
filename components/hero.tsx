"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
    const scrollToPrompts = () => {
        const element = document.getElementById('prompts');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-blue-50/50 px-4 pt-16 text-center md:pt-24">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#e0f2fe_100%)] opacity-60" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8 flex flex-col items-center"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl ring-4 ring-blue-100/50"
                >
                    {/* User Photo */}
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                </motion.div>

                <Badge variant="tech" className="mb-6 px-4 py-1.5 text-sm tracking-wide shadow-sm">
                    AI × 業務ハック
                </Badge>

                <h1 className="mb-6 max-w-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-sm md:text-5xl lg:text-6xl">
                    自由な時間を<br className="md:hidden" />取り戻す
                </h1>

                <p className="max-w-2xl text-lg font-medium text-slate-600 md:text-xl lg:leading-relaxed">
                    AIでの自動化とSalesforce運用の最適化で、<br className="hidden md:inline" />
                    あなたのビジネスに「余裕」と「成果」をもたらします。
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
                <Button
                    size="lg"
                    onClick={scrollToPrompts}
                    className="h-12 rounded-full bg-slate-900 px-8 text-base font-semibold text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                    プロンプト集を見る
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-slate-200 px-8 text-base font-semibold text-slate-700 hover:bg-white hover:text-slate-900 hover:border-slate-300 cursor-pointer"
                >
                    お問い合わせ
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 animate-bounce text-slate-400"
            >
                <ArrowDown className="h-6 w-6" />
            </motion.div>
        </section>
    )
}
