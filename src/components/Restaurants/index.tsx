import {
  Button,
  CardDescription,
  CardImage,
  Cards,
  CardsList,
  CardTitle,
  Nota,
  Tag,
  TagContainer,
} from "./styles";
import estrela from "../../assets/estrela.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export type MenuItem = {
  foto: string;
  preco: number;
  id: number;
  nome: string;
  descricao: string;
  porcao: string;
};
export type Restaurant = {
  id: number;
  titulo: string;
  destacado?: boolean;
  tipo: string;
  avaliacao: number;
  descricao: string;
  capa: string;
  cardapio: MenuItem[];
};

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    fetch("https://ebac-fake-api.vercel.app/api/efood/restaurantes")
      .then((res) => res.json())
      .then((res) => setRestaurants(res));
  }, []);
  return (
    <>
      <CardsList>
        {restaurants.map((restaurant) => (
          <Cards key={restaurant.id}>
            <CardImage src={restaurant.capa} alt="" />
            <CardTitle>
              <h1>{restaurant.titulo} </h1>
              <Nota>
                <h2>{restaurant.avaliacao}</h2>
                <img src={estrela} alt="" />
              </Nota>
            </CardTitle>
            <CardDescription>{restaurant.descricao}</CardDescription>
            <Link to={`/restaurants/${restaurant.id}`}>
              <Button>Saiba mais</Button>
            </Link>
            <TagContainer>
              {restaurant.destacado && <Tag>Destaque</Tag>}

              <Tag>{restaurant.tipo} </Tag>
            </TagContainer>
          </Cards>
        ))}
      </CardsList>
    </>
  );
};
