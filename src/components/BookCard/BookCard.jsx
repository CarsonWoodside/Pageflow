import { useNavigate } from 'react-router-dom';
import BookCover from '../BookCover/BookCover';
import GenreBadge from '../GenreBadge/GenreBadge';
import ProgressBar from '../ProgressBar/ProgressBar';
import StarRating from '../StarRating/StarRating';
import ShareButton from '../ShareButton/ShareButton';
import styles from './BookCard.module.css';

export default function BookCard({ book, index = 0 }) {
  const navigate = useNavigate();
  const progress = book.totalPages ? Math.round((book.currentPage / book.totalPages) * 100) : 0;

  return (
    <article className={styles.card} style={{ animationDelay: `${index * 40}ms` }}>
      <button className={styles.main} onClick={() => navigate(`/book/${book.id}`)}>
        <BookCover title={book.title} coverUrl={book.coverUrl} color={book.coverColor} />
        <div className={styles.body}>
          <div className={styles.topRow}>
            <GenreBadge label={book.genre} />
            <span className={styles.status}>{book.status.replaceAll('_', ' ')}</span>
          </div>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
          {book.status === 'reading' && (
            <>
              <ProgressBar value={progress} />
              <p className={styles.meta}>
                {book.currentPage}/{book.totalPages || '?'} pages · {progress}%
              </p>
            </>
          )}
          {book.status === 'finished' && <StarRating value={book.rating || 0} size="sm" />}
          {book.status === 'want_to_read' && <p className={styles.meta}>Saved for later</p>}
          {book.status === 'dnf' && <p className={styles.meta}>Paused or not for now</p>}
        </div>
      </button>
      <div className={styles.actions}>
        <ShareButton book={book} />
      </div>
    </article>
  );
}
