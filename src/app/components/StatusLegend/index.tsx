import {getStatusColor} from "@/app/utils/transactionStatus";

const statuses = ["Success", "Returnată", "Anulată", "Finalizată", "Necunoscut"]

export default function StatusLegend() {
    return (
        <div className="flex flex-wrap gap-4 mb-4">
            {statuses.map((status) => (
                <div key={status} className="flex items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusColor(status)}`}></div>
                    <span>{status}</span>
                </div>
            ))}
        </div>
    )
}

