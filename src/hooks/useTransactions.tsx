import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import {api} from '../services/api';


interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children : ReactNode;
}

type TransactionsInput = Omit<Transaction, 'id'| 'createdAt'>;

interface TransactionsData {
  transactions : Transaction[];
  createTransaction: (transaction: TransactionsInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionsData>({} as TransactionsData);

export function TransactionsProvider({ children }: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  },[])

  async function createTransaction(transactionInput: TransactionsInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionContext);

  return context;
}