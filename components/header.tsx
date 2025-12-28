"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Zap, LogOut, Bookmark, Search, Copy, Check, Lock, ArrowRight, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/providers/auth-provider"
import { RegistrationDialog } from "@/components/registration-dialog"

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { user, isLoggedIn, logout, setShowRegistrationModal } = useAuth()

    const navItems = [
        { name: "プロンプト集", href: "/prompts" }, // Fixed Link
        { name: "開発ツール", href: "/#products" },
        { name: "運用ノウハウ", href: "/#insights" },
    ]

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsOpen(false)

        // Only scroll if it's an anchor link
        if (!href.includes("/#")) {
            return
        }

        if (pathname !== "/") {
            return
        }

        e.preventDefault()
        const targetId = href.replace("/#", "")
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleMyBookmarks = () => {
        router.push("/prompts?filter=bookmarks")
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

                    {isLoggedIn && user ? (
                        <div className="flex items-center gap-4">
                            {/* Inquary Link - Visible when logged in */}
                            <Link href="/contact">
                                <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-900">
                                    お問い合わせ
                                </Button>
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer p-0">
                                        <Avatar className="h-10 w-10 border border-slate-200">
                                            <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                                            <AvatarFallback>{user.lastName[0]}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.lastName} {user.firstName}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.company}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/mypage" className="cursor-pointer w-full flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>マイページ</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/mypage?tab=bookmarks" className="cursor-pointer w-full flex items-center">
                                            <Bookmark className="mr-2 h-4 w-4" />
                                            <span>保存したプロンプト</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>ログアウト</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link href="/contact">
                                <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-900">
                                    お問い合わせ
                                </Button>
                            </Link>
                            <Button
                                size="sm"
                                className="rounded-full bg-slate-900 text-white hover:bg-slate-800 gap-2 shadow-sm"
                                onClick={() => setShowRegistrationModal(true)}
                            >
                                <img src="https://www.google.com/favicon.ico" alt="G" className="w-3 h-3" />
                                登録 / ログイン
                            </Button>
                        </div>
                    )}
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
                        <SheetContent side="right" className="w-[300px] sm:w-[500px]">
                            <SheetHeader className="text-left mb-6">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <Zap className="h-5 w-5 fill-current" />
                                    </div>
                                    AI x BizHack
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4">
                                {isLoggedIn && user && (
                                    <div className="flex items-center gap-3 mb-4 p-4 bg-slate-50 rounded-lg">
                                        <Avatar className="h-10 w-10 border border-slate-200">
                                            <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                                            <AvatarFallback>{user.lastName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{user.lastName} {user.firstName}</p>
                                            <p className="text-xs text-slate-500">{user.company}</p>
                                        </div>
                                    </div>
                                )}

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

                                {isLoggedIn ? (
                                    <>
                                        <div
                                            onClick={() => {
                                                setIsOpen(false)
                                                handleMyBookmarks()
                                            }}
                                            className="block text-lg font-medium text-slate-700 transition-colors hover:text-blue-600 cursor-pointer"
                                        >
                                            ブックマーク一覧
                                        </div>
                                        {/* Mobile: Inquiry + Logout */}
                                        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
                                            <Link href="/contact" onClick={() => setIsOpen(false)}>
                                                <Button variant="outline" className="w-full">お問い合わせ</Button>
                                            </Link>
                                            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={logout}>
                                                ログアウト
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
                                        <Button
                                            className="w-full bg-slate-900 gap-2"
                                            onClick={() => {
                                                setIsOpen(false)
                                                setShowRegistrationModal(true)
                                            }}
                                        >
                                            <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4" />
                                            Googleで登録 / ログイン
                                        </Button>
                                        <Link href="/contact" onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" className="w-full">お問い合わせ</Button>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <RegistrationDialog />
        </header>
    )
}
