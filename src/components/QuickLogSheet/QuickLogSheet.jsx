import { useEffect, useMemo, useState } from 'react';
import styles from './QuickLogSheet.module.css';

export default function QuickLogSheet({ book, isOpen, onClose, onSave, onSaveAndFinish, onUndo }) {
  const [pageValue, setPageValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPageValue(book ? String(book.currentPage || '') : '');
    }
  }, [isOpen, book]);

  const nextPage = Number(pageValue || 0);
  const sessionPages = Math.max(0, nextPage - (book?.currentPage || 0));
  const lastEntry = useMemo(() => book?.log?.[book.log.length - 1] || null, [book]);
  const canFinish = Boolean(book?.totalPages) && nextPage >= (book?.totalPages || 0);

  if (!isOpen || !book) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <section className={styles.sheet}>
        <div className={styles.handle} />
        <div className={styles.header}>
          <div>
            <p className={styles.kicker}>Quick log</p>
            <h2>{book.title}</h2>
          </div>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>

        <p className={styles.meta}>Last updated on page {book.currentPage || 0}</p>
        {lastEntry && (
          <p className={styles.subtle}>
            Last session: {lastEntry.pagesRead} page{lastEntry.pagesRead === 1 ? '' : 's'} on{' '}
            {new Date(lastEntry.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </p>
        )}

        <label className={styles.label}>
          Current page now
          <input
            className={styles.input}
            type="number"
            min={book.currentPage || 0}
            inputMode="numeric"
            value={pageValue}
            onChange={(event) => setPageValue(event.target.value)}
            placeholder={`Enter page ${book.currentPage || 0}+`}
          />
        </label>

        <p className={styles.preview}>
          This session will count as {sessionPages} page{sessionPages === 1 ? '' : 's'}.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.primary}
            onClick={() => {
              onSave(book.id, nextPage);
              onClose();
            }}
          >
            Save current page
          </button>
          {canFinish && (
            <button
              className={styles.finish}
              onClick={() => {
                onSaveAndFinish(book.id, nextPage);
                onClose();
              }}
            >
              Save and mark finished
            </button>
          )}
          <button
            className={styles.secondary}
            onClick={() => onUndo(book.id)}
            disabled={!book.log?.length}
          >
            Undo last log entry
          </button>
        </div>
      </section>
    </>
  );
}
