import { useState } from "react";

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <div
                className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${
                    checked ? "bg-blue-600" : "bg-gray-700"
                }`}
                onClick={() => onChange(!checked)}
            >
                <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </div>
            <span className="text-sm text-gray-300">
        {checked ? "Mediul de producție" : "Mediul de test"}
      </span>
        </label>
    );
}
