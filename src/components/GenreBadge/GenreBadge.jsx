import styles from './GenreBadge.module.css';

export default function GenreBadge({ label }) {
  return <span className={styles.badge}>{label}</span>;
}
