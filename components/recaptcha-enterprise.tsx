"use client"

import { useEffect, useRef, useState } from "react"

interface ReCaptchaEnterpriseProps {
    siteKey: string
    action?: string
    onVerify: (token: string) => void
}

declare global {
    interface Window {
        grecaptcha: any
    }
}

export function ReCaptchaEnterprise({ siteKey, action = "submit", onVerify }: ReCaptchaEnterpriseProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const hasRun = useRef(false)

    useEffect(() => {
        if (typeof window === "undefined" || hasRun.current) return

        // Check if script is already loaded
        if (document.getElementById("recaptcha-enterprise-script")) {
            setIsLoaded(true)
            return
        }

        const script = document.createElement("script")
        script.id = "recaptcha-enterprise-script"
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
        script.async = true
        script.defer = true
        script.onload = () => setIsLoaded(true)
        document.head.appendChild(script)

        hasRun.current = true
    }, [siteKey])

    useEffect(() => {
        if (isLoaded && window.grecaptcha && window.grecaptcha.enterprise) {
            window.grecaptcha.enterprise.ready(async () => {
                try {
                    const token = await window.grecaptcha.enterprise.execute(siteKey, { action })
                    onVerify(token)
                } catch (e) {
                    console.error("ReCAPTCHA execution failed", e)
                }
            })
        }
    }, [isLoaded, siteKey, action, onVerify])

    return (
        <div className="text-xs text-slate-400 mt-2 text-center">
            Protected by reCAPTCHA Enterprise
            <br />
            <a href="https://policies.google.com/privacy" target="_blank" className="hover:underline">Privacy</a> & <a href="https://policies.google.com/terms" target="_blank" className="hover:underline">Terms</a>
        </div>
    )
}
