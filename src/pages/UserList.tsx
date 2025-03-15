import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import styles from './UserList.module.css';

export const UserList = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const location = useLocation();
  const newUserId = location.state?.newUserId;

  return (
    <div className={styles.container}>
      <h1>User List</h1>
      <div className={styles.links}>
        <Link to="/uncontrolled-form" className={styles.link}>
          Uncontrolled components
        </Link>
        <Link to="/controlled-form" className={styles.link}>
          React Hook Form
        </Link>
      </div>
      <div className={styles.users}>
        {users.map((user) => (
          <div
            key={user.id}
            className={`${styles.userCard} ${user.id === newUserId ? styles.newUser : ''}`}
          >
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender === 'male' ? 'Male' : 'Female'}</p>
            <p>Country: {user.country}</p>
            <img src={user.image} alt="User" className={styles.userImage} />
          </div>
        ))}
      </div>
    </div>
  );
};
