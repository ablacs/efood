import { CartModal } from "../../modals/CarModal/CartModal";

export const Checkout = () => {
  return (
    <>
      <h1>Checkout Page</h1>
      <CartModal isOpen onClose={() => {}}></CartModal>
    </>
  );
};
