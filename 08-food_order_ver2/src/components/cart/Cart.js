import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../ui/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHander = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cancelOrderHandler = () => {
    setIsCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      'https://react-http-913ae-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({ user: userData, order: cartCtx.items }),
      }
    );

    setIsSubmitting(false);
    setSuccess(true);

    cartCtx.clearCart();
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={() => cartItemRemoveHander(item.id)}
      onAdd={() => cartItemAddHandler(item)}
    />
  ));

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cardModalContent = (
    <>
      <ul className={classes['cart-items']}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout
          onCancel={cancelOrderHandler}
          onConfirm={submitOrderHandler}
        />
      ) : (
        modalActions
      )}
    </>
  );

  const submittingContent = <p>Sending order data...</p>;
  const successContent = (
    <>
      <p>Successfully sent the order!</p>{' '}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {isSubmitting && submittingContent}
      {!isSubmitting && !success && cardModalContent}
      {success && successContent}
    </Modal>
  );
};

export default Cart;
