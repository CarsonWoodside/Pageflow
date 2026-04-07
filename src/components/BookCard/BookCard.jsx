import { useNavigate } from 'react-router-dom';
import BookCover from '../BookCover/BookCover';
import GenreBadge from '../GenreBadge/GenreBadge';
import ProgressBar from '../ProgressBar/ProgressBar';
import StarRating from '../StarRating/StarRating';
import styles from './BookCard.module.css';

function getRelativeLogText(book) {
  const lastEntry = book.log?.[book.log.length - 1];
  if (!lastEntry) return 'No reading session logged yet';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const entryDate = new Date(lastEntry.date);
  entryDate.setHours(0, 0, 0, 0);
  const dayDiff = Math.round((today - entryDate) / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) return 'Last logged today';
  if (dayDiff === 1) return 'Last logged yesterday';
  return `Last logged ${dayDiff} days ago`;
}

function getProgressLine(book) {
  const lastEntry = book.log?.[book.log.length - 1];
  if (!lastEntry) {
    return `Page ${book.currentPage || 0} of ${book.totalPages || '?'}`;
  }

  return `${lastEntry.pagesRead} page${lastEntry.pagesRead === 1 ? '' : 's'} in your last session`;
}

export default function BookCard({ book, index = 0, onQuickLog }) {
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
                You&apos;re on page {book.currentPage || 0} of {book.totalPages || '?'} · {progress}% through
              </p>
              <p className={styles.progressDetail}>{getProgressLine(book)}</p>
              <p className={styles.lastLogged}>{getRelativeLogText(book)}</p>
            </>
          )}
          {book.status === 'finished' && <StarRating value={book.rating || 0} size="sm" />}
          {book.status === 'want_to_read' && <p className={styles.meta}>Saved for later</p>}
          {book.status === 'dnf' && <p className={styles.meta}>Paused or not for now</p>}
        </div>
      </button>
      {book.status === 'reading' && (
        <button className={styles.quickLog} onClick={() => onQuickLog?.(book)}>
          ✦ Quick Log
        </button>
      )}
    </article>
  );
}
