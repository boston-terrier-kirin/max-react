import { useState, useRef } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ErrorModal from '../ui/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [username, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);

  // refでstateの代わりができなくもないが、入力値のクリアをする場合、直接domの値を変更することになるので良くない。
  // refはリードオンリーの用途で使うのが正解な気がする。
  const usernameRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();

    // refで値を参照
    console.log(usernameRef.current.value);

    // currentに入っているのは生のdomなので、これはやらない方が良い
    // usernameRef.current.value = '';

    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Username or age is empty.',
      });
      return;
    }

    if (+age < 0) {
      setError({
        title: 'Invalid age',
        message: 'Age must not be negative value.',
      });
      return;
    }

    props.onAddUser(username, age);

    setUserName('');
    setAge('');
    setError(null);
  };

  const errorHander = () => {
    setError(null);
  };

  const renderedError = error && (
    <ErrorModal
      title={error.title}
      message={error.message}
      onConfirm={errorHander}
    />
  );

  return (
    <>
      {renderedError}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            ref={usernameRef}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
