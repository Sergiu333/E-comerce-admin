import type React from "react"

interface CardProps {
    children: React.ReactNode
    className?: string
}

export function Card({ children, className = "" }: CardProps) {
    return <div className={`bg-gray-900 shadow-lg rounded-lg ${className}`}>{children}</div>
}

export function CardHeader({ children, className = "" }: CardProps) {
    return <div className={`px-4 py-5 border-b border-gray-800 sm:px-6 ${className}`}>{children}</div>
}

export function CardContent({ children, className = "" }: CardProps) {
    return <div className={`px-4 py-5 sm:p-6 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }: CardProps) {
    return <h3 className={`text-lg leading-6 font-medium text-gray-100 ${className}`}>{children}</h3>
}

