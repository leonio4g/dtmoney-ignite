import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, TransactionType, RadioBox } from './styles';

import CloseImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';


interface TransactionModalProps {
  isOpen: boolean;
  OnRequestClose: () => void;
}

export function TransactionModal({ isOpen, OnRequestClose }: TransactionModalProps) {
  const {createTransaction} = useTransactions();
  
  const [type, setType] = useState('deposit');
  const [title, settitle ] = useState('');
  const [amount, setAmount ] = useState(0);
  const [category, setCategory ] = useState('');

  async function handleCreateNewTransaction(event : FormEvent) {
    event.preventDefault();

   await createTransaction({
     title,
     amount,
     category,
     type,
   })
   setAmount(0);
   setCategory('');
   setType('deposit');
   settitle('');
   OnRequestClose();
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={OnRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={OnRequestClose} className="react-modal-close" >
        <img src={CloseImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction} >
        <h2>Cadastrar Transação</h2>
        <input placeholder="Titulo" 
        onChange={event => settitle(event.target.value)}
        value={title} />
        <input type="number" 
        placeholder="Valor"
        onChange={event => setAmount(Number(event.target.value))}
        value={amount} />
        <TransactionType>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionType>
        <input placeholder="Categoria"
         onChange={event => setCategory(event.target.value)}
         value={category} />

        <button type="submit">Cadastrar</button>
      </Container>

    </Modal>
  )
}