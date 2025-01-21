import React, { useState } from "react";
import { Transaction } from "@/app/types";
import { getStatusColor, getTransactionStatus } from "@/app/utils/transactionStatus";
import { Button } from "@/app/components/Button";

interface TransactionModalProps {
    transaction: Transaction;
    onClose: () => void;
}

export default function TransactionModal({ transaction, onClose }: TransactionModalProps) {
    const [amount, setAmount] = useState<any>(transaction.amount);
    const fieldsToShow = ["terminal", "amount", "currency", "rrn", "status"];
    const status = getTransactionStatus(transaction);
    const statusColor = getStatusColor(status);

    const submitForm = (url: string, trtype: number) => {
        const form = document.createElement("form");
        form.action = url;
        form.method = "POST";
        form.target = "_blank";

        form.innerHTML = `
            <input type="hidden" name="AMOUNT" value="${amount}" />
            <input type="hidden" name="CURRENCY" value="${transaction.currency}" />
            <input type="hidden" name="ORDER" value="${transaction.ORDER}" />
            <input type="hidden" name="DESC" value="${transaction.desc}" />
            <input type="hidden" name="MERCH_NAME" value="${transaction.merch_name}" />
            <input type="hidden" name="MERCH_URL" value="www.test.md" />
            <input type="hidden" name="MERCHANT" value="${transaction.merchant}" />
            <input type="hidden" name="TERMINAL" value="${transaction.terminal}" />
            <input type="hidden" name="EMAIL" value="${transaction.email}" />
            <input type="hidden" name="TRTYPE" value="${trtype}" />
            <input type="hidden" name="COUNTRY" value="${transaction.currency}" />
            <input type="hidden" name="NONCE" value="${transaction.nonce}" />
            <input type="hidden" name="BACKREF" value="http://www.test.md/" />
            <input type="hidden" name="MERCH_GMT" value="2" />
            <input type="hidden" name="TIMESTAMP" value="${transaction.timestamp}" />
            <input type="hidden" name="P_SIGN" value="${transaction.p_sign}" />
            <input type="hidden" name="LANG" value="en" />
            <input type="hidden" name="MERCH_ADDRESS" value="${transaction.merch_address}" />
            <input type="hidden" name="RRN" value="${transaction.rrn}" />
            <input type="hidden" name="INT_REF" value="${transaction.int_ref}" />
        `;

        document.body.appendChild(form);
        form.submit();
    };

    const finalizeTransaction = () => {
        submitForm("https://ecomt.victoriabank.md/cgi-bin/cgi_link?", 21);
        onClose();
    };

    const cancelTransaction = () => {
        submitForm("https://ecomt.victoriabank.md/cgi-bin/cgi_link?", 22);
        onClose();
    };

    const returnTransaction = () => {
        submitForm("https://ecomt.victoriabank.md/cgi-bin/cgi_link?", 24);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                            {field === "amount" ? (
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={
                                    (e) => setAmount(Number(e.target.value))}
                                    className="bg-gray-800 p-2 rounded text-gray-300"
                                />
                            ) : (
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
                            )}
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
    );
}
