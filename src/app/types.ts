export interface Transaction {
    terminal: string
    trtype: string
    ORDER: string
    amount: string
    currency: string
    action: string
    rc: string
    approval: string
    rrn: string
    int_ref: string
    timestamp: string
    nonce: string
    p_sign: string
    eci: string
    text: string
    status?: string
    [key: string]: string | undefined
}

export interface Column {
    key: string
    label: string
}

