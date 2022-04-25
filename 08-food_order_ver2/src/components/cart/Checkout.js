import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => {
  return value.trim() === '';
};

const isFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isFiveChars(postal);
    const cityIsValid = !isEmpty(city);

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.street && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formInputValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.postal && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formInputValidity.name && <p>Please enter a valid postal code.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.city && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputValidity.name && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
