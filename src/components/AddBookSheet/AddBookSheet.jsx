import { useEffect, useMemo, useState } from 'react';
import { colorFromString } from '../../utils/colors';
import { useBookSearch } from '../../hooks/useBookSearch';
import SearchResult from '../SearchResult/SearchResult';
import styles from './AddBookSheet.module.css';

const GENRES = ['Fiction', 'Non-Fiction', 'Other'];

function deriveGenre(subjects = []) {
  const text = subjects.join(' ').toLowerCase();

  const nonFictionHints = [
    'biography',
    'memoir',
    'history',
    'essay',
    'essays',
    'journalism',
    'politics',
    'science',
    'psychology',
    'self-help',
    'self help',
    'business',
    'philosophy',
    'travel',
    'autobiography',
    'nonfiction',
    'non-fiction'
  ];

  const fictionHints = [
    'fiction',
    'novel',
    'fantasy',
    'romance',
    'mystery',
    'thriller',
    'science fiction',
    'sci-fi',
    'historical fiction',
    'horror',
    'young adult'
  ];

  if (nonFictionHints.some((hint) => text.includes(hint))) {
    return 'Non-Fiction';
  }

  if (fictionHints.some((hint) => text.includes(hint))) {
    return 'Fiction';
  }

  return 'Other';
}

function initialForm() {
  return {
    title: '',
    author: '',
    totalPages: '',
    currentPage: '',
    genre: 'Fiction',
    coverUrl: '',
    status: 'reading',
    dateStarted: new Date().toISOString().slice(0, 10),
    openLibraryKey: null,
    firstPublishYear: null
  };
}

export default function AddBookSheet({ isOpen, onClose, onAddBook }) {
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(initialForm);
  const { results, loading, error } = useBookSearch(query);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setForm(initialForm());
    }
  }, [isOpen]);

  const isValid = useMemo(() => form.title.trim() && form.author.trim(), [form.author, form.title]);

  const applyResult = (result) => {
    setForm((current) => ({
      ...current,
      title: result.title,
      author: result.author,
      totalPages: result.totalPages || '',
      genre: deriveGenre(result.subjects),
      coverUrl: result.coverUrl || '',
      openLibraryKey: result.openLibraryKey,
      firstPublishYear: result.firstPublishYear
    }));
    setQuery(result.title);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <section className={styles.sheet}>
        <div className={styles.handle} />
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>Build your shelf</p>
            <h2>Add a book</h2>
          </div>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>

        <div className={styles.form}>
          <label>
            Search Open Library
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title or author" />
          </label>

          {(results.length > 0 || loading || error) && (
            <div className={styles.results}>
              {loading && <p className={styles.note}>Searching…</p>}
              {error && <p className={styles.note}>{error}</p>}
              {results.map((result) => (
                <SearchResult key={`${result.openLibraryKey}-${result.title}`} result={result} onSelect={applyResult} />
              ))}
            </div>
          )}

          <label>
            Title
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          </label>

          <label>
            Author
            <input value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} />
          </label>

          <div className={styles.row}>
            <label>
              Total pages
              <input
                type="number"
                inputMode="numeric"
                value={form.totalPages}
                onChange={(event) => setForm({ ...form, totalPages: event.target.value })}
              />
            </label>

            <label>
              Genre
              <select value={form.genre} onChange={(event) => setForm({ ...form, genre: event.target.value })}>
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Cover image URL
            <input value={form.coverUrl} onChange={(event) => setForm({ ...form, coverUrl: event.target.value })} />
          </label>

          <div className={styles.row}>
            <label>
              Status
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                <option value="reading">Reading</option>
                <option value="want_to_read">Want to Read</option>
              </select>
            </label>

            {form.status === 'reading' && (
              <label>
                Date started
                <input
                  type="date"
                  value={form.dateStarted}
                  onChange={(event) => setForm({ ...form, dateStarted: event.target.value })}
                />
              </label>
            )}
          </div>

          {form.status === 'reading' && (
            <label>
              Current page
              <input
                type="number"
                inputMode="numeric"
                value={form.currentPage}
                onChange={(event) => setForm({ ...form, currentPage: event.target.value })}
                placeholder="Optional"
              />
            </label>
          )}

          <button
            className={styles.submit}
            disabled={!isValid}
            onClick={() =>
              onAddBook({
                ...form,
                coverColor: colorFromString(form.title)
              })
            }
          >
            Save to shelf
          </button>
        </div>
      </section>
    </>
  );
}
