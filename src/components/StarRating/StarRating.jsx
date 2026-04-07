import styles from './StarRating.module.css';

export default function StarRating({ value = 0, onChange, size = 'md' }) {
  return (
    <div className={`${styles.rating} ${styles[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;
        const Tag = onChange ? 'button' : 'span';
        return (
          <Tag
            key={star}
            type={onChange ? 'button' : undefined}
            className={`${styles.star} ${active ? styles.active : ''}`}
            onClick={onChange ? () => onChange(star) : undefined}
          >
            ★
          </Tag>
        );
      })}
    </div>
  );
}
