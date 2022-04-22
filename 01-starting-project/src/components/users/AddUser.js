import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [username, setUserName] = useState('');
  const [age, setAge] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();

    if (username.trim().length === 0 || age.trim().length === 0) {
      return;
    }

    if (+age < 0) {
      return;
    }

    props.onAddUser(username, age);

    setUserName('');
    setAge('');
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
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
  );
};

export default AddUser;
