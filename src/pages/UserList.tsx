import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import styles from './UserList.module.css';

export const UserList = () => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <div className={styles.container}>
      <h1>Список пользователей</h1>
      <div className={styles.links}>
        <Link to="/uncontrolled-form" className={styles.link}>
          Uncontrolled components approach
        </Link>
        <Link to="/controlled-form" className={styles.link}>
          React Hook Form
        </Link>
      </div>
      <div className={styles.users}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <h3>{user.name}</h3>
            <p>Возраст: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Пол: {user.gender === 'male' ? 'Male' : 'Female'}</p>
            <p>Страна: {user.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
