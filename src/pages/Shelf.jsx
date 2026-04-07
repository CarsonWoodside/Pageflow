import { useMemo, useState } from 'react';
import BookCard from '../components/BookCard/BookCard';
import styles from './Shelf.module.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'reading', label: 'Reading' },
  { id: 'finished', label: 'Finished' },
  { id: 'want_to_read', label: 'Want to Read' },
  { id: 'dnf', label: 'DNF' }
];

export default function Shelf({ books, onQuickLog }) {
  const [filter, setFilter] = useState('all');
  const readingBooks = useMemo(() => books.filter((book) => book.status === 'reading'), [books]);
  const filteredBooks = useMemo(
    () => (filter === 'all' ? books : books.filter((book) => book.status === filter)),
    [books, filter]
  );
  const remainingBooks = useMemo(() => filteredBooks.filter((book) => book.status !== 'reading'), [filteredBooks]);
  const emptyMessage =
    books.length === 0
      ? 'Add a book to start tracking progress!'
      : `No books in ${FILTERS.find((item) => item.id === filter)?.label.toLowerCase()} yet.`;

  return (
    <section className="page-enter">
      <div className={styles.tabs}>
        {FILTERS.map((item) => (
          <button
            key={item.id}
            className={`${styles.tab} ${filter === item.id ? styles.active : ''}`}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredBooks.length ? (
        <>
          {filter === 'all' && Boolean(readingBooks.length) && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Currently Reading</h2>
                <span>{readingBooks.length} active</span>
              </div>
              <div className={styles.list}>
                {readingBooks.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} onQuickLog={onQuickLog} />
                ))}
              </div>
            </div>
          )}

          {!(filter === 'all' && remainingBooks.length === 0) && (
            <div className={styles.section}>
              {filter === 'all' && <h2 className={styles.subheading}>Everything Else</h2>}
              <div className={styles.list}>
                {(filter === 'all' ? remainingBooks : filteredBooks).map((book, index) => (
                  <BookCard key={book.id} book={book} index={index + readingBooks.length} onQuickLog={onQuickLog} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty}>
          <h2>{books.length === 0 ? '📚 A shelf with room to grow' : 'Nothing here yet'}</h2>
          <p>{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}
