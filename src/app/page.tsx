"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./components/Card"
import { Select, SelectItem } from "./components/Select"
import { Checkbox } from "./components/Checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/Table"
import TransactionModal from "./components/TransactionModal"
import StatusLegend from "./components/StatusLegend"
import type { Transaction, Column } from "./types"
import { getTransactionStatus, getStatusColor } from "./utils/transactionStatus"
import "./styles/custom-scrollbar.css"

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [terminals, setTerminals] = useState<string[]>([])
  const [filter, setFilter] = useState("")
  const [terminalFilter, setTerminalFilter] = useState("")
  const [countFilter, setCountFilter] = useState("10")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>({
    STATUS: true,
    terminal: true,
    trtype: true,
    ORDER: true,
    amount: true,
    currency: true,
    action: true,
    rc: true,
    approval: true,
    rrn: true,
    int_ref: true,
    timestamp: true,
    nonce: true,
    p_sign: true,
    eci: true,
    text: true,
  })
console.log(filteredTransactions, "aasdas")

  const columns: Column[] = [
    { key: "STATUS", label: "Status" },
    { key: "terminal", label: "Terminal" },
    { key: "trtype", label: "TrType" },
    { key: "ORDER", label: "Order" },
    { key: "amount", label: "Amount" },
    { key: "currency", label: "Currency" },
    { key: "action", label: "Action" },
    { key: "rc", label: "RC" },
    { key: "approval", label: "Approval" },
    { key: "rrn", label: "RRN" },
    { key: "int_ref", label: "Int Ref" },
    { key: "timestamp", label: "Timestamp" },
    { key: "nonce", label: "Nonce" },
    { key: "", label: "P Sign" },
    { key: "eci", label: "ECI" },
    { key: "text", label: "Text" },
  ]

  useEffect(() => {
    loadTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [transactions, filter, terminalFilter, countFilter])

  const loadTransactions = async () => {
    const response = await fetch("https://api-tau-kohl.vercel.app/get-data")
    const data = await response.json()
    setTransactions(data)
    setTerminals(Array.from(new Set(data.map((txn: Transaction) => txn.terminal))))
  }

  const filterTransactions = () => {
    let filtered = transactions.filter((transaction) => {
      const statusMatch = filter === "" || filter === "all" || getTransactionStatus(transaction) === filter
      const terminalMatch = terminalFilter === "" || terminalFilter === "all" || transaction.terminal === terminalFilter
      return statusMatch && terminalMatch
    })

    if (countFilter && countFilter !== "all") {
      filtered = filtered.slice(-Number.parseInt(countFilter))
    }

    setFilteredTransactions(filtered)
  }

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }))
  }

  const showModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
  }

  return (
      <div className="min-h-screen bg-black text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tranzacții</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusLegend />
              <div className="flex flex-wrap gap-4 mb-4 mt-6">
                <Select onValueChange={setFilter} placeholder="Toate tranzacțiile">
                  <SelectItem value="">Toate tranzacțiile</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Returnată">Returnate</SelectItem>
                  <SelectItem value="Anulată">Anulate</SelectItem>
                  <SelectItem value="Finalizată">Finalizate</SelectItem>
                </Select>

                <Select onValueChange={setTerminalFilter} placeholder="Selectează Terminal">
                  <SelectItem value="">Toate terminalele</SelectItem>
                  {terminals.map((terminal) => (
                      <SelectItem key={terminal} value={terminal}>
                        {terminal}
                      </SelectItem>
                  ))}
                </Select>

                <Select onValueChange={setCountFilter} placeholder="Număr de tranzacții">
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="10">Ultimele 10</SelectItem>
                  <SelectItem value="50">Ultimele 50</SelectItem>
                  <SelectItem value="100">Ultimele 100</SelectItem>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {columns.map((column) => (
                    <Checkbox
                        key={column.key}
                        id={column.key}
                        checked={visibleColumns[column.key]}
                        onChange={() => toggleColumn(column.key)}
                        label={column.label}
                    />
                ))}
              </div>

              <div className="rounded-md border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.map(
                            (column) =>
                                visibleColumns[column.key] && <TableHead key={column.key}>{column.label}</TableHead>,
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction, index) => {
                        const status = getTransactionStatus(transaction)
                        const statusColor = getStatusColor(status)
                        return (
                            <TableRow key={index} onClick={() => showModal(transaction)} className="cursor-pointer">
                              {columns.map(
                                  (column) =>
                                      visibleColumns[column.key] && (
                                          <TableCell key={column.key}>
                                            {column.key === "STATUS" ? (
                                                <div className="flex items-center">
                                                  <div className={`w-2.5 h-2.5 rounded-full mr-2 ${statusColor}`}></div>
                                                  {status}
                                                </div>
                                            ) : (
                                                transaction[column.key]
                                            )}
                                          </TableCell>
                                      ),
                              )}
                            </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedTransaction && (
              <TransactionModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
          )}
        </div>
      </div>
  )
}

