import { CardButton, ModalOverlay } from "../../pages/Home/styles";
import {
  CardModal,
  CartDescription,
  CEP,
  CEPDescription,
  CloseIcon,
  ModalButtons,
  ModalForm,
  SideModal,
  Value,
} from "./styles";
import trash from "../../assets/lixeira-de-reciclagem 1.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../features/cart/cartslice";
import type { RootState } from "../../app/store";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleCheckout = async () => {
    const orderData = {
      products: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
      })),
      delivery: {
        receiver: (document.getElementById("receiver") as HTMLInputElement)
          ?.value,
        address: {
          description: (document.getElementById("address") as HTMLInputElement)
            ?.value,
          city: (document.getElementById("city") as HTMLInputElement)?.value,
          zipCode: (document.getElementById("zip") as HTMLInputElement)?.value,
          number: parseInt(
            (document.getElementById("number") as HTMLInputElement)?.value
          ),
          complement: (
            document.getElementById("complement") as HTMLInputElement
          )?.value,
        },
      },
      payment: {
        card: {
          name: (document.getElementById("cardName") as HTMLInputElement)
            ?.value,
          number: (document.getElementById("cardNumber") as HTMLInputElement)
            ?.value,
          code: parseInt(
            (document.getElementById("cvv") as HTMLInputElement)?.value
          ),
          expires: {
            month: parseInt(
              (document.getElementById("month") as HTMLInputElement)?.value
            ),
            year: parseInt(
              (document.getElementById("year") as HTMLInputElement)?.value
            ),
          },
        },
      },
    };

    console.log("🟡 Enviando para API:", orderData);

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
      console.log("✅ Resposta da API:", data);
      setOrderInfo(data);
      setStep("order");
    } catch (error) {
      console.error("🚨 Erro ao enviar pedido:", error);
      alert(
        "Ocorreu um erro ao finalizar o pedido. Verifique os dados e tente novamente."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <SideModal onClick={(e) => e.stopPropagation()}>
        {step === "cart" && (
          <>
            {cartItems.map((item) => (
              <CardModal key={item.id}>
                <img src={item.image} alt={item.name} />
                <CartDescription>
                  <h1>{item.name}</h1>
                  <p>R${item.price}</p>
                  <CloseIcon onClick={() => HandleRemove(item.id)}>
                    <img src={trash} alt="Remover" />
                  </CloseIcon>
                </CartDescription>
              </CardModal>
            ))}
            <Value>
              <h1>Valor total:</h1>
              <p>R${totalPrice}</p>
            </Value>
            <CardButton onClick={() => setStep("address")}>
              Continuar com a entrega
            </CardButton>
          </>
        )}

        {step === "address" && (
          <ModalForm>
            <h1>Entrega</h1>
            <h2>Quem vai receber</h2>
            <input id="receiver" type="text" />
            <h2>Endereço</h2>
            <input id="address" type="text" />
            <h2>Cidade</h2>
            <input id="city" type="text" />
            <CEP>
              <CEPDescription>
                <h2>CEP</h2>
                <input id="zip" type="text" />
              </CEPDescription>
              <CEPDescription>
                <h2>Número</h2>
                <input id="number" type="number" />
              </CEPDescription>
            </CEP>
            <h2>Complemento (opcional)</h2>
            <input id="complement" type="text" />
            <ModalButtons>
              <CardButton onClick={() => setStep("payment")}>
                Continuar para pagamento
              </CardButton>
              <CardButton onClick={() => setStep("cart")}>
                Voltar para o carrinho
              </CardButton>
            </ModalButtons>
          </ModalForm>
        )}

        {step === "payment" && (
          <ModalForm>
            <h1>Pagamento - Valor total: R${totalPrice}</h1>
            <h2>Nome no cartão</h2>
            <input id="cardName" type="text" />
            <CEP>
              <CEPDescription>
                <h2>Número do cartão</h2>
                <input id="cardNumber" type="text" />
              </CEPDescription>
              <CEPDescription>
                <h2>CVV</h2>
                <input id="cvv" type="number" />
              </CEPDescription>
            </CEP>
            <CEP>
              <CEPDescription>
                <h2>Mês de vencimento</h2>
                <input id="month" type="number" />
              </CEPDescription>
              <CEPDescription>
                <h2>Ano de vencimento</h2>
                <input id="year" type="number" />
              </CEPDescription>
            </CEP>
            <ModalButtons>
              <CardButton onClick={handleCheckout}>Finalizar compra</CardButton>
              <CardButton onClick={() => setStep("address")}>
                Voltar para a edição de endereço
              </CardButton>
            </ModalButtons>
          </ModalForm>
        )}

        {step === "order" && orderInfo && (
          <ModalForm>
            <h1>Pedido realizado - {orderInfo.orderId}</h1>
            <p>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
            </p>
            <p>
              Gostaríamos de ressaltar que nossos entregadores não estão
              autorizados a realizar cobranças extras.
            </p>
            <p>
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar durante a
              refeição.
            </p>
            <p>
              Esperamos que desfrute de uma deliciosa e agradável experiência
              gastronômica. Bom apetite!
            </p>
            <ModalButtons>
              <Link to="/">
                <CardButton>Concluir</CardButton>
              </Link>
            </ModalButtons>
          </ModalForm>
        )}
      </SideModal>
    </ModalOverlay>
  );
};
