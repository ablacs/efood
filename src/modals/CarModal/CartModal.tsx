import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../../features/cart/cartslice";
import type { RootState } from "../../app/store";

import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";
import trash from "../../assets/lixeira-de-reciclagem 1.svg";

import { CardButton, ModalOverlay } from "../../pages/Home/styles";
import * as S from "./styles";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addressSchema } from "../../validation/addressSchema";
import { paymentSchema } from "../../validation/paymentSchema";
import type { AddressFormData } from "../../validation/addressSchema";
import type { PaymentFormData } from "../../validation/paymentSchema";

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
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      receiver: "",
      address: "",
      city: "",
      zip: "",
      number: "",
      complement: "",
    },
    mode: "onTouched",
  });
  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      cvv: "",
      month: "",
      year: "",
    },
    mode: "onTouched",
  });

  const onlyDigits = (s?: string) => (s ? s.replace(/\D/g, "") : "");
  const validateAddressAndNext = async () => {
    setFormErrors([]);
    const valid = await addressForm.trigger();

    if (valid) {
      setStep("payment");
    } else {
      const errs = Object.values(addressForm.formState.errors).map(
        (e) => e?.message || "Campo inválido"
      );
      setFormErrors(errs as string[]);
    }
  };
  const validatePaymentAndCheckout = async () => {
    setFormErrors([]);
    const valid = await paymentForm.trigger();

    if (valid) {
      handleCheckout();
    } else {
      const errs = Object.values(paymentForm.formState.errors).map(
        (e) => e?.message || "Campo inválido"
      );
      setFormErrors(errs as string[]);
    }
  };
  const handleCheckout = async () => {
    const addr = addressForm.getValues();
    const pay = paymentForm.getValues();

    const orderData = {
      products: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
      })),
      delivery: {
        receiver: addr.receiver,
        address: {
          description: addr.address,
          city: addr.city,
          zipCode: onlyDigits(addr.zip),
          number: parseInt(addr.number),
          complement: addr.complement ?? "",
        },
      },
      payment: {
        card: {
          name: pay.cardName,
          number: onlyDigits(pay.cardNumber),
          code: parseInt(onlyDigits(pay.cvv)),
          expires: {
            month: parseInt(pay.month),
            year:
              pay.year.length === 2
                ? parseInt(`20${pay.year}`)
                : parseInt(pay.year),
          },
        },
      },
    };

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
        throw new Error(errorText);
      }

      const data = await response.json();
      setOrderInfo(data);
      setStep("order");
    } catch {
      alert("Erro ao finalizar pedido");
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

                      <S.CloseIcon onClick={() => handleRemove(item.id)}>
                        <img src={trash} alt="Remover" />
                      </S.CloseIcon>
                    </S.CartDescription>
                  </S.CardModal>
                ))}

                <S.Value>
                  <h1>Valor total:</h1>
                  <p>{formatPrice(totalPrice)}</p>
                </S.Value>

                <CardButton onClick={() => setStep("address")}>
                  Continuar com entrega
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

            {formErrors.length > 0 && (
              <div className="error-message">
                <p>Preencha os campos corretamente</p>
                {formErrors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

            <h2>Quem vai receber</h2>
            <input
              {...addressForm.register("receiver")}
              placeholder="Nome do destinatário"
            />

            <h2>Endereço</h2>
            <input
              {...addressForm.register("address")}
              placeholder="Rua, Av, etc."
            />

            <h2>Cidade</h2>
            <input {...addressForm.register("city")} placeholder="Cidade" />

            <S.CEP>
              <S.CEPDescription>
                <h2>CEP</h2>
                <input
                  {...addressForm.register("zip")}
                  placeholder="00000-000"
                />
              </S.CEPDescription>

              <S.CEPDescription>
                <h2>Número</h2>
                <input {...addressForm.register("number")} placeholder="123" />
              </S.CEPDescription>
            </S.CEP>

            <h2>Complemento</h2>
            <input
              {...addressForm.register("complement")}
              placeholder="Apto, bloco..."
            />

            <S.ModalButtons>
              <CardButton onClick={validateAddressAndNext}>
                Continuar para pagamento
              </CardButton>

              <CardButton onClick={() => setStep("cart")}>
                Voltar ao carrinho
              </CardButton>
            </S.ModalButtons>
          </S.ModalForm>
        )}
        {step === "payment" && (
          <S.ModalForm>
            <h1>Pagamento — Total: {formatPrice(totalPrice)}</h1>

            {formErrors.length > 0 && (
              <div className="error-message">
                <p>Preencha os campos corretamente</p>
                {formErrors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

            <h2>Nome no cartão</h2>
            <input
              {...paymentForm.register("cardName")}
              placeholder="Nome como no cartão"
            />

            <S.CEP>
              <S.CEPDescription>
                <h2>Número do cartão</h2>
                <input
                  {...paymentForm.register("cardNumber")}
                  placeholder="1111222233334444"
                />
              </S.CEPDescription>

              <S.CEPDescription>
                <h2>CVV</h2>
                <input {...paymentForm.register("cvv")} placeholder="123" />
              </S.CEPDescription>
            </S.CEP>

            <S.CEP>
              <S.CEPDescription>
                <h2>Mês</h2>
                <input {...paymentForm.register("month")} placeholder="MM" />
              </S.CEPDescription>

              <S.CEPDescription>
                <h2>Ano</h2>
                <input {...paymentForm.register("year")} placeholder="YYYY" />
              </S.CEPDescription>
            </S.CEP>

            <S.ModalButtons>
              <CardButton onClick={validatePaymentAndCheckout}>
                Finalizar compra
              </CardButton>

              <CardButton onClick={() => setStep("address")}>
                Voltar ao endereço
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
                <CardButton
                  onClick={() => {
                    dispatch(clearCart());
                  }}
                >
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
