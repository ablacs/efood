import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addItem } from "../../features/cart/cartslice";

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
import { CartModal } from "../../modals/CarModal/CartModal";
import type { Restaurant, MenuItem } from "../../components/Restaurants";

export const Torteria = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modal, setModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  const handleCart = () => setCartModal(!cartModal);
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.cart.items.length);

  const truncateWords = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  useEffect(() => {
    fetch("https://ebac-fake-api.vercel.app/api/efood/restaurantes")
      .then((res) => res.json())
      .then((data: Restaurant[]) => {
        const foundRestaurant = data.find((r) => r.id === Number(id));
        setRestaurant(foundRestaurant || null);
      })
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
      });
  }, [id]);

  const handleModal = (item?: MenuItem) => {
    if (item) setSelectedItem(item);
    setModal(!modal);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      dispatch(
        addItem({
          id: selectedItem.id,
          name: selectedItem.nome,
          price: selectedItem.preco,
          image: selectedItem.foto,
        })
      );
      setModal(false);
    }
  };

  if (!restaurant) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Header>
        <Container>
          <HeaderContainer>
            <h1>Restaurantes</h1>
            <Link to={"/"}>
              <img src={logo} alt="Logo" />
            </Link>
            <a href="#" onClick={handleCart} className="cart">
              <h1>{count} Produto(s) no carrinho</h1>
            </a>
          </HeaderContainer>
        </Container>
      </Header>

      <HeaderImg backgroundImage={restaurant.capa}>
        <HeaderTextContainer>
          <Italian>
            <h3>{restaurant.tipo}</h3>
          </Italian>
          <LaDolce>
            <h1>{restaurant.titulo}</h1>
          </LaDolce>
        </HeaderTextContainer>
      </HeaderImg>

      <Container>
        <Products>
          {restaurant.cardapio.map((item) => (
            <Cards key={item.id}>
              <CardImage src={item.foto} alt={item.nome} />
              <CardTitle>{item.nome}</CardTitle>
              <CardDescription>
                {truncateWords(item.descricao, 25)}
              </CardDescription>
              <CardButton onClick={() => handleModal(item)}>
                Adicionar ao carrinho
              </CardButton>
            </Cards>
          ))}
        </Products>
      </Container>

      {modal && selectedItem && (
        <ModalOverlay onClick={() => handleModal()}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.foto} alt={selectedItem.nome} />
            <div className="modal-content">
              <CardTitle>{selectedItem.nome}</CardTitle>
              <CardDescription>
                {selectedItem.descricao}
                <br />
                <br />
                Serve: {selectedItem.porcao}
              </CardDescription>
              <div className="modal-button">
                <BotaoModal onClick={handleAddToCart}>
                  Adicionar ao carrinho - R$ {selectedItem.preco.toFixed(2)}
                </BotaoModal>
              </div>
              <ModalClose onClick={() => handleModal()}>X</ModalClose>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      <CartModal isOpen={cartModal} onClose={handleCart} />
      <Footer />
    </>
  );
};
