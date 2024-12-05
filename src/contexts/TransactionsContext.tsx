import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionContextType {
  transactions: Transaction[]
}

interface TransactionsProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsContextProvider({
  children,
}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  return useContext(TransactionsContext)
}
