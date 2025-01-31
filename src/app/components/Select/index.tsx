import React, { useState } from "react"

interface SelectProps {
    onValueChange: (value: string) => void
    placeholder?: string
    children: React.ReactNode
}

export function Select({ onValueChange, placeholder, children }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")

    const handleSelect = (value: string) => {
        setSelectedValue(value)
        onValueChange(value)
        setIsOpen(false)
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedValue || placeholder || "Select option"}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {React.Children.map(children, (child) => {
                            if (React.isValidElement(child) && child.type === SelectItem) {
                                return React.cloneElement(child, {
                                    // @ts-ignore
                                    onClick: () => handleSelect(child.props.value),
                                })
                            }
                            return child
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

interface SelectItemProps {
    value: string
    children: React.ReactNode
    onClick?: () => void
}

export function SelectItem({ value, children, onClick }: SelectItemProps) {
    return (
        <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            role="menuitem"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

