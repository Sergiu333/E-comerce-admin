import type React from "react"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                className={`form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded transition duration-150 ease-in-out ${className}`}
                {...props}
            />
            {label && <span className="text-sm text-gray-300">{label}</span>}
        </label>
    )
}

