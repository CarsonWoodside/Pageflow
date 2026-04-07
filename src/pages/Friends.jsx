import { useMemo, useState } from 'react';
import styles from './Friends.module.css';

export default function Friends({ activeUser, users, sharedSnippets, onSaveSnippet }) {
  const others = useMemo(() => users.filter((user) => user.id !== activeUser.id), [activeUser.id, users]);
  const [fromName, setFromName] = useState('');
  const [snippet, setSnippet] = useState('');

  return (
    <section className={`${styles.page} page-enter`}>
      <div className={styles.hero}>
        <p className={styles.kicker}>What we&apos;re reading</p>
        <h2>Friends</h2>
        <p className={styles.copy}>
          Everyone&apos;s shelf is private to their own phone, but you can still swap snippets and keep a personal memory shelf here.
        </p>
      </div>

      {others.map((user) => (
        <article key={user.id} className={styles.friendCard}>
          <h3>{user.name}</h3>
          <p>{user.name}&apos;s shelf will appear here when they&apos;re on their device — you&apos;re each on your own phone!</p>
          <p className={styles.subtle}>
            {user.name}&apos;s shelf lives on their device — share what you&apos;re reading below 📱
          </p>
        </article>
      ))}

      <article className={styles.shareCard}>
        <div>
          <p className={styles.kicker}>Share a book</p>
          <h3>Recently Shared</h3>
        </div>
        <input
          className={styles.input}
          value={fromName}
          onChange={(event) => setFromName(event.target.value)}
          placeholder="Who sent this?"
        />
        <textarea
          className={styles.textarea}
          rows="4"
          value={snippet}
          onChange={(event) => setSnippet(event.target.value)}
          placeholder="Paste a copied snippet from iMessage or WhatsApp"
        />
        <button
          className={styles.button}
          onClick={() => {
            if (!fromName.trim() || !snippet.trim()) return;
            onSaveSnippet({ fromName, snippet });
            setFromName('');
            setSnippet('');
          }}
        >
          Save snippet
        </button>
      </article>

      <div className={styles.snippets}>
        {sharedSnippets.length ? (
          sharedSnippets.map((entry) => (
            <article key={entry.id} className={styles.snippetCard}>
              <div className={styles.snippetHead}>
                <strong>{entry.fromName}</strong>
                <span>{new Date(entry.savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
              </div>
              <p>{entry.snippet}</p>
            </article>
          ))
        ) : (
          <article className={styles.snippetCard}>
            <p>No shared snippets saved yet.</p>
          </article>
        )}
      </div>
    </section>
  );
}
