import type React from "react"

export const Table = ({ children }: { children: React.ReactNode }) => (
    <table className="min-w-full divide-y divide-gray-700">{children}</table>
)

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-800">{children}</thead>
)

export const TableBody = ({ children }: { children: React.ReactNode }) => (
    <tbody className="bg-gray-900 divide-y divide-gray-800">{children}</tbody>
)

export const TableRow = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={`${className} hover:bg-gray-800`} {...props}>
        {children}
    </tr>
)

export const TableHead = ({ children, className = "", ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
        className={`px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ${className}`}
        {...props}
    >
        {children}
    </th>
)

export const TableCell = ({ children, className = "", ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300 ${className}`} {...props}>
        {children}
    </td>
)

