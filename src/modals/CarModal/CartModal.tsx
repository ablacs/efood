import { CardButton, ModalOverlay } from "../../pages/Torteria/styles";
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
import pizza from "../../assets/images/pizza.png";
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
  if (!isOpen) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <SideModal onClick={(e) => e.stopPropagation()}>
        {step === "cart" && (
          <>
            {cartItems.map((item) => (
              <CardModal key={item.id}>
                <img src={pizza} alt="" />
                <CartDescription>
                  <h1>{item.name}</h1>
                  <p>R${item.price}</p>
                  <CloseIcon onClick={() => HandleRemove(item.id)}>
                    <img src={trash} alt="" />
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
          <>
            <ModalForm>
              <h1>Entrega</h1>
              <h2>Quem vai receber</h2>
              <input type="text" />
              <h2>Endereço</h2>
              <input type="text" />
              <h2>Cidade</h2>
              <input type="text" />
              <CEP>
                <CEPDescription>
                  <h2>CEP</h2>
                  <input type="text" />
                </CEPDescription>
                <CEPDescription>
                  <h2>Número</h2>
                  <input type="text" />
                </CEPDescription>
              </CEP>
              <h2>Complemento (opcional)</h2>
              <input type="text" />
              <ModalButtons>
                <CardButton onClick={() => setStep("payment")}>
                  Continuar para pagamento
                </CardButton>
                <CardButton onClick={() => setStep("cart")}>
                  Voltar para o carrinho
                </CardButton>
              </ModalButtons>
            </ModalForm>
          </>
        )}
        {step === "payment" && (
          <>
            <ModalForm>
              <h1>Pagamento - Valor total: R${totalPrice}</h1>
              <h2>Nome no cartão</h2>
              <input type="text" />
              <CEP>
                <CEPDescription>
                  <h2>Número do cartão</h2>
                  <input type="text" />
                </CEPDescription>
                <CEPDescription>
                  <h2>CVV</h2>
                  <input type="text" />
                </CEPDescription>
              </CEP>
              <CEP>
                <CEPDescription>
                  <h2>Mês de vencimento</h2>
                  <input type="text" />
                </CEPDescription>
                <CEPDescription>
                  <h2>Ano de vencimento</h2>
                  <input type="text" />
                </CEPDescription>
              </CEP>
              <ModalButtons>
                <CardButton onClick={() => setStep("order")}>
                  Finalizar compra
                </CardButton>
                <CardButton onClick={() => setStep("address")}>
                  voltar para a edição de endereço
                </CardButton>
              </ModalButtons>
            </ModalForm>
          </>
        )}
        {step === "order" && (
          <>
            <ModalForm>
              <h1>Pedido realizado - ORDER_ID</h1>
              <p>
                Estamos felizes em informar que seu pedido já está em processo
                de preparação e, em breve, será entregue no endereço fornecido.
              </p>
              <p>
                Gostaríamos de ressaltar que nossos entregadores não estão
                autorizados a realizar cobranças extras.
              </p>
              <p>
                Lembre-se da importância de higienizar as mãos após o
                recebimento do pedido, garantindo assim sua segurança e
                bem-estar durante a refeição.
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
          </>
        )}
      </SideModal>
    </ModalOverlay>
  );
};
