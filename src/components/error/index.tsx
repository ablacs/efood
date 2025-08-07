import { Link } from "react-router-dom";
import { ErrorMessage } from "./styles";
import { Button } from "../Restaurants/styles";

export const InProgress = () => {
  return (
    <ErrorMessage>
      <h1>Página em construção</h1>
      <Link to={"/"}>
        <Button>Voltar</Button>
      </Link>
    </ErrorMessage>
  );
};
