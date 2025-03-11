import type { Transaction } from "../types"

export function getTransactionStatus(transaction: Transaction): string {
    if (transaction.trtype === "0") {
        return "Success"
    } else if (transaction.trtype === "1") {
        return "Success"}
    else if (transaction.trtype === "24") {
        return "Returnată"
    } else if (transaction.trtype === "22") {
        return "Anulată"
    } else if (transaction.trtype === "21") {
        return "Finalizată"
    } else {
        return "Necunoscut"
    }
}

export function getStatusColor(status: string): string {
    switch (status) {
        case "Success":
            return "bg-green-500"
        case "Returnată":
            return "bg-yellow-500"
        case "Anulată":
            return "bg-red-500"
        case "Finalizată":
            return "bg-blue-500"
        default:
            return "bg-gray-500"
    }
}

