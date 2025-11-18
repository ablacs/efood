import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addItem } from "../../features/cart/cartslice";

import { Footer } from "../../components/Footer";
import { Container } from "../../styles";
import * as S from "./styles";
import logo from "../../assets/logo.png";
import { CartModal } from "../../modals/CarModal/CartModal";
import type { Restaurant, MenuItem } from "../../components/Restaurants";
import { formatPrice } from "../../utils/format";

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
    fetch("https://api-ebac.vercel.app/api/efood/restaurantes")
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
      <S.Header>
        <Container>
          <S.HeaderContainer>
            <h1>Restaurantes</h1>
            <Link to={"/"}>
              <img src={logo} alt="Logo" />
            </Link>
            <button onClick={handleCart} className="cart">
              <h1>{count} Produto(s) no carrinho</h1>
            </button>
          </S.HeaderContainer>
        </Container>
      </S.Header>

      <S.HeaderImg backgroundImage={restaurant.capa}>
        <S.HeaderTextContainer>
          <S.Italian>
            <h3>{restaurant.tipo}</h3>
          </S.Italian>
          <S.LaDolce>
            <h1>{restaurant.titulo}</h1>
          </S.LaDolce>
        </S.HeaderTextContainer>
      </S.HeaderImg>

      <Container>
        <S.Products>
          {restaurant.cardapio.map((item) => (
            <S.Cards key={item.id}>
              <S.CardImage src={item.foto} alt={item.nome} />
              <S.CardTitle>{item.nome}</S.CardTitle>
              <S.CardDescription>
                {truncateWords(item.descricao, 25)}
              </S.CardDescription>
              <S.CardButton onClick={() => handleModal(item)}>
                Adicionar ao carrinho
              </S.CardButton>
            </S.Cards>
          ))}
        </S.Products>
      </Container>

      {modal && selectedItem && (
        <S.ModalOverlay onClick={() => handleModal()}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.foto} alt={selectedItem.nome} />
            <div className="modal-content">
              <S.CardTitle>{selectedItem.nome}</S.CardTitle>
              <S.CardDescription>
                {selectedItem.descricao}
                <br />
                <br />
                Serve: {selectedItem.porcao}
              </S.CardDescription>
              <div className="modal-button">
                <S.BotaoModal onClick={handleAddToCart}>
                  Adicionar ao carrinho - {formatPrice(selectedItem.preco)}
                </S.BotaoModal>
              </div>
              <S.ModalClose onClick={() => handleModal()}>X</S.ModalClose>
            </div>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      <CartModal isOpen={cartModal} onClose={handleCart} />
      <Footer />
    </>
  );
};
