import styles from './ProgressBar.module.css';

export default function ProgressBar({ value = 0 }) {
  return (
    <div className={styles.track} aria-label={`Progress ${value}%`}>
      <div className={styles.fill} style={{ width: `${value}%` }} />
    </div>
  );
}
