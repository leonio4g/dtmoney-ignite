import Logo from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
  onOpenTransactionModal: () => void;
}

export function Header({onOpenTransactionModal}: HeaderProps){


  return (
    <Container>
      <Content>
      <img src={Logo} alt="dt money"/>
      <button type="button" onClick={onOpenTransactionModal}>
        Nova Transação
      </button>

      
      </Content>
    </Container>
  )
}