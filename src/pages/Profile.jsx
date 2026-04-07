import styles from './Profile.module.css';

export default function Profile({ activeUser, users, onSelect, onSignOut }) {
  return (
    <section className={`${styles.page} page-enter`}>
      <div className={styles.card}>
        <p className={styles.kicker}>Current reader</p>
        <h2>{activeUser.name}</h2>
        <p className={styles.copy}>
          All books, progress logs, ratings, and shared snippets stay on this device in local storage.
        </p>
      </div>

      <div className={styles.card}>
        <h3>Switch user</h3>
        <div className={styles.list}>
          {users.map((user) => (
            <button
              key={user.id}
              className={`${styles.userButton} ${user.id === activeUser.id ? styles.active : ''}`}
              onClick={() => onSelect(user.id)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3>Reset profile selection</h3>
        <p className={styles.copy}>Use this if you want the app to show the chooser again on next launch.</p>
        <button className={styles.reset} onClick={onSignOut}>
          Show user picker
        </button>
      </div>
    </section>
  );
}
