import styles from './BookCover.module.css';

export default function BookCover({ title, coverUrl, color, large = false, compact = false }) {
  if (coverUrl) {
    return (
      <div className={`${styles.frame} ${large ? styles.large : ''} ${compact ? styles.compact : ''}`}>
        <img className={styles.image} src={coverUrl} alt={`${title} cover`} />
      </div>
    );
  }

  return (
    <div
      className={`${styles.frame} ${styles.placeholder} ${large ? styles.large : ''} ${compact ? styles.compact : ''}`}
      style={{ background: color }}
      aria-label={`${title} placeholder cover`}
    >
      <span>{title?.slice(0, 1) || '?'}</span>
    </div>
  );
}
