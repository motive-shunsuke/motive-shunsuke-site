"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)

    const navItems = [
        { name: "プロンプト集", href: "#prompts" },
        { name: "開発ツール", href: "#products" },
        { name: "運用ノウハウ", href: "#insights" },
    ]

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        setIsOpen(false)

        if (href === "#") return

        const element = document.getElementById(href.replace("#", ""))
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
                        <Zap className="h-5 w-5 fill-current" />
                    </div>
                    <span>AI x BizHack</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                        >
                            {item.name}
                        </a>
                    ))}
                    <Button size="sm" className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                        お問い合わせ
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader className="text-left mb-6">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <Zap className="h-5 w-5 fill-current" />
                                    </div>
                                    AI x BizHack
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className="block text-lg font-medium text-slate-700 transition-colors hover:text-blue-600"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <div className="pt-4 mt-4 border-t border-slate-100">
                                    <Button className="w-full bg-slate-900">お問い合わせ</Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
