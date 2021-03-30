import { Summery } from "../Summary";
import { TransactionTable } from "../TransactionTable";
import { Container } from "./styles";

export function Dashboard(){
  return(
    <Container>
      <Summery/>
      <TransactionTable />
    </Container>
  );
}