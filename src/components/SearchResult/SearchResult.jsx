import BookCover from '../BookCover/BookCover';
import styles from './SearchResult.module.css';

export default function SearchResult({ result, onSelect }) {
  return (
    <button className={styles.item} onClick={() => onSelect(result)}>
      <BookCover title={result.title} coverUrl={result.coverUrl} color="#d9cfbb" compact />
      <div className={styles.content}>
        <strong>{result.title}</strong>
        <span>{result.author}</span>
        <span>{result.totalPages ? `${result.totalPages} pages` : 'Page count unavailable'}</span>
      </div>
    </button>
  );
}
