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

export default function Shelf({ books }) {
  const [filter, setFilter] = useState('all');
  const filteredBooks = useMemo(
    () => (filter === 'all' ? books : books.filter((book) => book.status === filter)),
    [books, filter]
  );

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
        <div className={styles.list}>
          {filteredBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>A shelf with room to grow</h2>
          <p>Add a book to start tracking pages, reviews, streaks, and shared snippets.</p>
        </div>
      )}
    </section>
  );
}
