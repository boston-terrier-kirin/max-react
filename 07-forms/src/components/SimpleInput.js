import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameRef = useRef();
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setNameIsValid(false);
      return;
    }

    setNameIsValid(true);

    console.log('name: ', name);
    console.log('nameRef.current.value: ', nameRef.current.value);

    setName('');
  };

  const nameClasses = nameIsValid ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          ref={nameRef}
        />
        {!nameIsValid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
