import React from "react"
import {Transaction} from "@/app/types";
import {getStatusColor, getTransactionStatus} from "@/app/utils/transactionStatus";
import {Button} from "@/app/components/Button";

interface TransactionModalProps {
    transaction: Transaction
    onClose: () => void
}

export default function TransactionModal({ transaction, onClose }: TransactionModalProps) {
    const fieldsToShow = ["terminal", "amount", "currency", "rrn", "status"]
    const status = getTransactionStatus(transaction)
    const statusColor = getStatusColor(status)

    const submitForm = (url: string, trtype: number) => {
        const form = document.createElement("form")
        form.action = url
        form.method = "POST"

        Object.entries(transaction).forEach(([key, value]) => {
            const input = document.createElement("input")
            input.type = "hidden"
            input.name = key
            input.value = value as string
            form.appendChild(input)
        })

        const trtypeInput = document.createElement("input")
        trtypeInput.type = "hidden"
        trtypeInput.name = "TRTYPE"
        trtypeInput.value = trtype.toString()
        form.appendChild(trtypeInput)

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)
    }

    const finalizeTransaction = () => {
        submitForm("https://ecomt.victoriabank.md/cgi-bin/cgi_link?", 21)
        onClose()
    }

    const cancelTransaction = () => {
        submitForm("https://ecomt.victoriabank.md/cgi-bin/cgi_link?", 22)
        onClose()
    }

    const returnTransaction = () => {
        submitForm("https://ecomt.victoriabank.md/cgi-bin/cgi_link?", 24)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full text-gray-300 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 focus:outline-none"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-100 pr-8">Detalii Tranzacție</h2>
                <div className="mb-4">
                    {fieldsToShow.map((field) => (
                        <div key={field} className="grid grid-cols-2 gap-2 mb-2">
                            <span className="font-medium">{field}:</span>
                            <span>
                {field === "status" ? (
                    <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full mr-2 ${statusColor}`}></div>
                        {status}
                    </div>
                ) : (
                    transaction[field]
                )}
              </span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={finalizeTransaction}>Finalizează</Button>
                    <Button onClick={cancelTransaction} variant="outline">
                        Anulare
                    </Button>
                    <Button onClick={returnTransaction} variant="outline">
                        Retur
                    </Button>
                </div>
            </div>
        </div>
    )
}

