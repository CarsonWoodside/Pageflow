import styles from './Profile.module.css';

const THEMES = [
  { id: 'forest', label: 'Forest Journal' },
  { id: 'lamp', label: 'Golden Lamp' },
  { id: 'rain', label: 'Rainy Library' },
  { id: 'morning', label: 'Soft Morning' }
];

export default function Profile({ profile, books, onSaveProfile, onResetOnboarding }) {
  const finished = books.filter((book) => book.status === 'finished').length;

  return (
    <section className={`${styles.page} page-enter`}>
      <div className={styles.card}>
        <p className={styles.kicker}>Your reading corner</p>
        <h2>{profile.name}</h2>
        <p className={styles.copy}>
          All books, progress logs, ratings, and preferences stay on this device in local storage.
        </p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>🎯 Goal: {profile.readingGoal} books</div>
          <div className={styles.statPill}>🏁 Finished: {finished}</div>
        </div>
      </div>

      <div className={styles.card}>
        <h3>Personalise</h3>
        <label className={styles.label}>
          Display name
          <input value={profile.name} onChange={(event) => onSaveProfile({ ...profile, name: event.target.value })} />
        </label>
        <label className={styles.label}>
          Yearly goal
          <input
            type="number"
            min="1"
            value={profile.readingGoal}
            onChange={(event) => onSaveProfile({ ...profile, readingGoal: Number(event.target.value) || 1 })}
          />
        </label>
        <label className={styles.label}>
          Reading vibe
          <input value={profile.vibe} onChange={(event) => onSaveProfile({ ...profile, vibe: event.target.value })} />
        </label>
        <div className={styles.themeGroup}>
          <span className={styles.themeLabel}>Theme</span>
          <div className={styles.themeGrid}>
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                className={`${styles.themeButton} ${profile.theme === theme.id ? styles.themeActive : ''}`}
                onClick={() => onSaveProfile({ ...profile, theme: theme.id })}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h3>Start over</h3>
        <p className={styles.copy}>Reopen the short onboarding flow if you want to refresh the tone and preferences.</p>
        <button className={styles.reset} onClick={onResetOnboarding}>
          Run onboarding again
        </button>
      </div>
    </section>
  );
}
