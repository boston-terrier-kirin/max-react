import { useEffect, useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameRef = useRef();

  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (nameIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameIsValid]);

  const submitHandler = (event) => {
    event.preventDefault();

    setNameTouched(true);

    if (!name.trim()) {
      setNameIsValid(false);
      return;
    }

    setNameIsValid(true);

    console.log('name: ', name);
    console.log('nameRef.current.value: ', nameRef.current.value);

    setName('');
  };

  const nameInputHandler = (event) => {
    setName(event.target.value);

    // setNameの反映が遅れることもあるので、event.target.value で判定した方が無難。
    // if (!name.trim())
    if (!event.target.value.trim()) {
      setNameIsValid(false);
      return;
    }

    setNameIsValid(true);
  };

  const nameBlurHandler = (event) => {
    setNameTouched(true);

    if (!name.trim()) {
      setNameIsValid(false);
      return;
    }

    setNameIsValid(true);
  };

  const nameIsInvalid = nameTouched && !nameIsValid;
  const nameClasses = nameIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameInputHandler}
          onBlur={nameBlurHandler}
          ref={nameRef}
        />
        {nameIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
