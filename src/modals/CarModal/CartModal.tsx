import { CardButton, ModalOverlay } from "../../pages/Home/styles";
import * as S from "./styles";
import trash from "../../assets/lixeira-de-reciclagem 1.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../../features/cart/cartslice";
import type { RootState } from "../../app/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type OrderInfo = {
  orderId: string;
  status?: string;
};

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [step, setStep] = useState<"cart" | "address" | "payment" | "order">(
    "cart"
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const HandleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  const [receiver, setReceiver] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleCheckout = async () => {
    const orderData = {
      products: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
      })),
      delivery: {
        receiver,
        address: {
          description: address,
          city,
          zipCode: zip,
          number: parseInt(number),
          complement,
        },
      },
      payment: {
        card: {
          name: cardName,
          number: cardNumber,
          code: parseInt(cvv),
          expires: {
            month: parseInt(month),
            year: parseInt(year),
          },
        },
      },
    };

    console.log("Enviando para API:", orderData);

    try {
      const response = await fetch(
        "https://api-ebac.vercel.app/api/efood/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      setOrderInfo(data);
      setStep("order");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert(
        "Ocorreu um erro ao finalizar o pedido. Verifique os dados e tente novamente."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <S.SideModal onClick={(e) => e.stopPropagation()}>
        {step === "cart" && (
          <>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <S.CardModal key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <S.CartDescription>
                      <h1>{item.name}</h1>
                      <p>{formatPrice(item.price)}</p>
                      <S.CloseIcon onClick={() => HandleRemove(item.id)}>
                        <img src={trash} alt="Remover" />
                      </S.CloseIcon>
                    </S.CartDescription>
                  </S.CardModal>
                ))}

                <S.Value>
                  <h1>Valor total:</h1>
                  <p>{formatPrice(totalPrice)} </p>
                </S.Value>

                <CardButton onClick={() => setStep("address")}>
                  Continuar com a entrega
                </CardButton>
              </>
            ) : (
              <S.Value>
                <h1>Seu carrinho está vazio</h1>
              </S.Value>
            )}
          </>
        )}

        {step === "address" && (
          <S.ModalForm>
            <h1>Entrega</h1>

            <h2>Quem vai receber</h2>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />

            <h2>Endereço</h2>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h2>Cidade</h2>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <S.CEP>
              <S.CEPDescription>
                <h2>CEP</h2>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </S.CEPDescription>

              <S.CEPDescription>
                <h2>Número</h2>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </S.CEPDescription>
            </S.CEP>

            <h2>Complemento (opcional)</h2>
            <input
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <S.ModalButtons>
              <CardButton onClick={() => setStep("payment")}>
                Continuar para pagamento
              </CardButton>

              <CardButton onClick={() => setStep("cart")}>
                Voltar para o carrinho
              </CardButton>
            </S.ModalButtons>
          </S.ModalForm>
        )}

        {step === "payment" && (
          <S.ModalForm>
            <h1>Pagamento - Valor total: {formatPrice(totalPrice)}</h1>

            <h2>Nome no cartão</h2>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <S.CEP>
              <S.CEPDescription>
                <h2>Número do cartão</h2>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </S.CEPDescription>

              <S.CEPDescription>
                <h2>CVV</h2>
                <input
                  type="number"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </S.CEPDescription>
            </S.CEP>

            <S.CEP>
              <S.CEPDescription>
                <h2>Mês de vencimento</h2>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </S.CEPDescription>

              <S.CEPDescription>
                <h2>Ano de vencimento</h2>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </S.CEPDescription>
            </S.CEP>

            <S.ModalButtons>
              <CardButton onClick={handleCheckout}>Finalizar compra</CardButton>

              <CardButton onClick={() => setStep("address")}>
                Voltar para a edição de endereço
              </CardButton>
            </S.ModalButtons>
          </S.ModalForm>
        )}

        {step === "order" && orderInfo && (
          <S.ModalForm>
            <h1>Pedido realizado - {orderInfo.orderId}</h1>
            <p>
              Seu pedido está em preparação e será entregue em breve no endereço
              informado.
            </p>
            <p>Os entregadores não estão autorizados a cobrar taxas extras.</p>
            <p>Lembre-se de higienizar as mãos ao receber o pedido.</p>
            <p>Bom apetite!</p>

            <S.ModalButtons>
              <Link to="/">
                <CardButton onClick={() => dispatch(clearCart())}>
                  Concluir
                </CardButton>
              </Link>
            </S.ModalButtons>
          </S.ModalForm>
        )}
      </S.SideModal>
    </ModalOverlay>
  );
};
