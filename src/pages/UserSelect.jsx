import styles from './UserSelect.module.css';

export default function UserSelect({ users, onSelect }) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.kicker}>A private reading journal</p>
        <h1>Choose your shelf</h1>
        <p className={styles.note}>
          Your data lives on this phone. Share books with Carson, Jessica and Ash using the share button on any book.
        </p>
        <div className={styles.buttons}>
          {users.map((user) => (
            <button key={user.id} className={styles.button} onClick={() => onSelect(user.id)}>
              {user.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
