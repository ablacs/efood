import { Link } from "react-router-dom";
import { useState } from "react";

import { Footer } from "../../components/Footer";
import { Container } from "../../styles";
import {
  BotaoModal,
  CardButton,
  CardDescription,
  CardImage,
  Cards,
  CardTitle,
  Header,
  HeaderContainer,
  HeaderImg,
  HeaderTextContainer,
  Italian,
  LaDolce,
  ModalClose,
  ModalContent,
  ModalOverlay,
  Products,
} from "./styles";
import logo from "../../assets/logo.png";
import pizza from "../../assets/images/pizza.png";
import { CartModal } from "../../modals/CarModal/CartModal";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addItem } from "../../features/cart/cartslice";

export const Torteria = () => {
  const [modal, setModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const handleCart = () => setCartModal(!cartModal);

  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.cart.items.length);
  const handleClick = () => {
    dispatch(
      addItem({ id: Date.now(), name: "Pizza Marguerita", price: 60.9 })
    );
  };

  const handleModal = () => setModal(!modal);
  return (
    <>
      <Header>
        <Container>
          <HeaderContainer>
            <h1>Restaurantes</h1>
            <Link to={"/"}>
              <img src={logo} />
            </Link>
            <h1>{count} Produto(s) no carrinho</h1>
          </HeaderContainer>
        </Container>
      </Header>
      <HeaderImg>
        <HeaderTextContainer>
          <Italian>
            <h3>Italiana</h3>
          </Italian>
          <LaDolce>
            <h1>La Dolce Vita Trattoria</h1>
          </LaDolce>
        </HeaderTextContainer>
      </HeaderImg>
      <Container>
        <Products>
          <Cards>
            <CardImage src={pizza} alt="" />
            <CardTitle>Pizza marguerita</CardTitle>
            <CardDescription>
              A clássica Marguerita: molho de tomate suculento, mussarela
              derretida, manjericão fresco e um toque de azeite. Sabor e
              simplicidade!
            </CardDescription>
            <CardButton onClick={handleModal}>Adicionar ao carrinho</CardButton>
          </Cards>
          <Cards>
            <CardImage src={pizza} alt="" />
            <CardTitle>Pizza marguerita</CardTitle>
            <CardDescription>
              A clássica Marguerita: molho de tomate suculento, mussarela
              derretida, manjericão fresco e um toque de azeite. Sabor e
              simplicidade!
            </CardDescription>
            <CardButton onClick={handleModal}>Adicionar ao carrinho</CardButton>
          </Cards>
          <Cards>
            <CardImage src={pizza} alt="" />
            <CardTitle>Pizza marguerita</CardTitle>
            <CardDescription>
              A clássica Marguerita: molho de tomate suculento, mussarela
              derretida, manjericão fresco e um toque de azeite. Sabor e
              simplicidade!
            </CardDescription>
            <CardButton onClick={handleModal}>Adicionar ao carrinho</CardButton>
          </Cards>
          <Cards>
            <CardImage src={pizza} alt="" />
            <CardTitle>Pizza marguerita</CardTitle>
            <CardDescription>
              A clássica Marguerita: molho de tomate suculento, mussarela
              derretida, manjericão fresco e um toque de azeite. Sabor e
              simplicidade!
            </CardDescription>
            <CardButton onClick={handleModal}>Adicionar ao carrinho</CardButton>
          </Cards>
          <Cards>
            <CardImage src={pizza} alt="" />
            <CardTitle>Pizza marguerita</CardTitle>
            <CardDescription>
              A clássica Marguerita: molho de tomate suculento, mussarela
              derretida, manjericão fresco e um toque de azeite. Sabor e
              simplicidade!
            </CardDescription>
            <CardButton onClick={handleModal}>Adicionar ao carrinho</CardButton>
          </Cards>
          <Cards>
            <CardImage src={pizza} alt="" />
            <CardTitle>Pizza marguerita</CardTitle>
            <CardDescription>
              A clássica Marguerita: molho de tomate suculento, mussarela
              derretida, manjericão fresco e um toque de azeite. Sabor e
              simplicidade!
            </CardDescription>
            <CardButton onClick={handleModal}>Adicionar ao carrinho</CardButton>
          </Cards>
        </Products>
      </Container>
      {modal && (
        <ModalOverlay onClick={handleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src={pizza} />
            <div className="modal-content">
              <CardTitle>Produto adicionado!</CardTitle>
              <CardDescription>
                A pizza Margherita é uma pizza clássica da culinária italiana,
                reconhecida por sua simplicidade e sabor inigualável. Ela é
                feita com uma base de massa fina e crocante, coberta com molho
                de tomate fresco, queijo mussarela de alta qualidade, manjericão
                fresco e azeite de oliva extra-virgem. A combinação de sabores é
                perfeita, com o molho de tomate suculento e ligeiramente ácido,
                o queijo derretido e cremoso e as folhas de manjericão frescas,
                que adicionam um toque de sabor herbáceo. É uma pizza simples,
                mas deliciosa, que agrada a todos os paladares e é uma ótima
                opção para qualquer ocasião. Serve: de 2 a 3 pessoas
              </CardDescription>
              <div className="modal-button">
                <BotaoModal onClick={handleClick}>
                  Adicionar ao carrinho - R$ 60,90
                </BotaoModal>
                <BotaoModal onClick={handleCart}>Ver carrinho</BotaoModal>
              </div>
              <ModalClose onClick={handleModal}>X</ModalClose>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
      <CartModal isOpen={cartModal} onClose={handleCart} />
      <Footer />
    </>
  );
};
