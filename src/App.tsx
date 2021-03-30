import { useState } from 'react';
import Modal from 'react-modal'
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { TransactionModal } from './components/TransactionModal';
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {

  const [TransactionModalOpen, setTransactonModalOpen] = useState(false);

  function handleOpenTransactionModal(){
    setTransactonModalOpen(true);
  }

  function handleCloseTransactionModal(){
    setTransactonModalOpen(false);
  }

  return (
    <TransactionsProvider>
     <Header 
     onOpenTransactionModal={handleOpenTransactionModal}/>
     <Dashboard />
     <TransactionModal 
     isOpen={TransactionModalOpen} 
     OnRequestClose={handleCloseTransactionModal} />
     <GlobalStyle/>
     </TransactionsProvider>
  );
}


