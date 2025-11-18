import * as S from "./styles";
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
    fetch("https://api-ebac.vercel.app/api/efood/restaurantes")
      .then((res) => res.json())
      .then((res) => setRestaurants(res));
  }, []);
  return (
    <>
      <S.CardsList>
        {restaurants.map((restaurant) => (
          <S.Cards key={restaurant.id}>
            <S.CardImage src={restaurant.capa} alt="Restaurant picture" />
            <S.CardTitle>
              <h1>{restaurant.titulo} </h1>
              <S.Nota>
                <h2>{restaurant.avaliacao}</h2>
                <img src={estrela} alt="rating" />
              </S.Nota>
            </S.CardTitle>
            <S.CardDescription>{restaurant.descricao}</S.CardDescription>
            <Link to={`/restaurants/${restaurant.id}`}>
              <S.Button>Saiba mais</S.Button>
            </Link>
            <S.TagContainer>
              {restaurant.destacado && <S.Tag>Destaque</S.Tag>}

              <S.Tag>{restaurant.tipo} </S.Tag>
            </S.TagContainer>
          </S.Cards>
        ))}
      </S.CardsList>
    </>
  );
};
