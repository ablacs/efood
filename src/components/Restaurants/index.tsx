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
import sushi from "../../assets/images/sushi.png";
import estrela from "../../assets/estrela.svg";
import pasta from "../../assets/images/pasta.png";
import { Link } from "react-router-dom";

export const Restaurants = () => (
  <>
    <CardsList>
      <Cards>
        <CardImage src={sushi} alt="" />
        <CardTitle>
          <h1>Hioki Sushi</h1>
          <Nota>
            <h2>4.9</h2>
            <img src={estrela} alt="" />
          </Nota>
        </CardTitle>
        <CardDescription>
          Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis
          frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega
          rápida, embalagens cuidadosas e qualidade garantida.Experimente o
          Japão sem sair do lar com nosso delivery!
        </CardDescription>
        <Button>Saiba mais</Button>
        <TagContainer>
          <Tag>Destaque da semana</Tag>
          <Tag>Japonesa</Tag>
        </TagContainer>
      </Cards>
      <Cards>
        <CardImage src={pasta} alt="" />
        <CardTitle>
          <h1>La Dolce Vita Trattoria</h1>
          <Nota>
            <h2>4.6</h2>
            <img src={estrela} alt="" />
          </Nota>
        </CardTitle>
        <CardDescription>
          A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você!
          Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis,
          tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e
          sabor inesquecível. Peça já!
        </CardDescription>
        <Link to={"/torteria"}>
          <Button>Saiba mais</Button>
        </Link>
        <TagContainer>
          <Tag>Italiana</Tag>
        </TagContainer>
      </Cards>
      <Cards>
        <CardImage src={sushi} alt="" />
        <CardTitle>
          <h1>Hioki Sushi</h1>
          <Nota>
            <h2>Nota</h2>
            <img src={estrela} alt="" />
          </Nota>
        </CardTitle>
        <CardDescription>
          Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis
          frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega
          rápida, embalagens cuidadosas e qualidade garantida.Experimente o
          Japão sem sair do lar com nosso delivery!
        </CardDescription>
        <Button>Saiba mais</Button>
        <TagContainer>
          <Tag>Destaque da semana</Tag>
          <Tag>Japonesa</Tag>
        </TagContainer>
      </Cards>
      <Cards>
        <CardImage src={sushi} alt="" />
        <CardTitle>
          <h1>Hioki Sushi</h1>
          <Nota>
            <h2>Nota</h2>
            <img src={estrela} alt="" />
          </Nota>
        </CardTitle>
        <CardDescription>
          Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis
          frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega
          rápida, embalagens cuidadosas e qualidade garantida.Experimente o
          Japão sem sair do lar com nosso delivery!
        </CardDescription>
        <Button>Saiba mais</Button>
        <TagContainer>
          <Tag>Destaque da semana</Tag>
          <Tag>Japonesa</Tag>
        </TagContainer>
      </Cards>
    </CardsList>
  </>
);
