import Card from '../ui/Card';
import classes from './UsersList.module.css';

const UsersList = (props) => {
  if (props.users.length === 0) {
    return;
  }

  const renderedList = props.users.map((user) => (
    <li key={user.id}>
      {user.username} ({user.age} years old)
    </li>
  ));

  return (
    <Card className={classes.users}>
      <ul>{renderedList}</ul>
    </Card>
  );
};

export default UsersList;
