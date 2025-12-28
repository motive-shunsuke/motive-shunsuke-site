
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ThanksPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <div className="mb-6 rounded-full bg-green-100 p-6 text-green-600">
                <CheckCircle className="h-12 w-12" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-900">お問い合わせありがとうございます</h1>
            <p className="mb-8 max-w-md text-slate-600">
                担当者より折り返しご連絡させていただきます。<br />
                自動返信メールをお送りしましたのでご確認ください。
            </p>
            <Link href="/">
                <Button size="lg" className="rounded-full">
                    トップページへ戻る
                </Button>
            </Link>
        </div>
    )
}
