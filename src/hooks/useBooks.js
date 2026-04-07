import { useEffect, useMemo, useState } from 'react';
import { colorFromString } from '../utils/colors';
import { getBooksKey, getSharedKey, readJson, writeJson } from '../utils/storage';

function today() {
  return new Date().toISOString();
}

function clamp(value, max) {
  return Math.max(0, Math.min(value, max || value));
}

export function useBooks(userId) {
  const [books, setBooks] = useState([]);
  const [sharedSnippets, setSharedSnippets] = useState([]);

  useEffect(() => {
    if (!userId) return;
    setBooks(readJson(getBooksKey(userId), []));
    setSharedSnippets(readJson(getSharedKey(userId), []));
  }, [userId]);

  const persistBooks = (nextBooks) => {
    setBooks(nextBooks);
    writeJson(getBooksKey(userId), nextBooks);
  };

  const persistShared = (nextShared) => {
    setSharedSnippets(nextShared);
    writeJson(getSharedKey(userId), nextShared);
  };

  const addBook = (data) => {
    const initialPage = data.status === 'reading' ? clamp(Number(data.currentPage || 0), Number(data.totalPages || 0)) : 0;
    const book = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      author: data.author.trim(),
      totalPages: Number(data.totalPages) || 0,
      currentPage: initialPage,
      status: data.status,
      genre: data.genre,
      coverUrl: data.coverUrl || null,
      coverColor: data.coverColor || colorFromString(data.title),
      dateAdded: today(),
      dateStarted: data.status === 'reading' ? data.dateStarted || today() : null,
      dateFinished: null,
      rating: null,
      review: '',
      openLibraryKey: data.openLibraryKey || null,
      firstPublishYear: data.firstPublishYear || null,
      log:
        data.status === 'reading' && initialPage > 0
          ? [
              {
                id: crypto.randomUUID(),
                date: data.dateStarted || today(),
                pagesRead: initialPage,
                cumulativePages: initialPage,
                percentComplete: data.totalPages ? Math.round((initialPage / data.totalPages) * 100) : 0
              }
            ]
          : []
    };
    persistBooks([book, ...books]);
    return book;
  };

  const updateBook = (bookId, updates) => {
    const nextBooks = books.map((book) => {
      if (book.id !== bookId) return book;

      if (!Object.prototype.hasOwnProperty.call(updates, 'totalPages')) {
        return { ...book, ...updates };
      }

      const nextTotalPages = Math.max(0, Number(updates.totalPages) || 0);
      const nextCurrentPage = nextTotalPages ? Math.min(book.currentPage || 0, nextTotalPages) : book.currentPage || 0;
      const nextLog = (book.log || []).map((entry) => {
        const cumulativePages = nextTotalPages
          ? Math.min(entry.cumulativePages || 0, nextTotalPages)
          : entry.cumulativePages || 0;

        return {
          ...entry,
          cumulativePages,
          percentComplete: nextTotalPages ? Math.round((cumulativePages / nextTotalPages) * 100) : 0
        };
      });

      return {
        ...book,
        ...updates,
        totalPages: nextTotalPages,
        currentPage: nextCurrentPage,
        log: nextLog
      };
    });
    persistBooks(nextBooks);
  };

  const deleteBook = (bookId) => {
    persistBooks(books.filter((book) => book.id !== bookId));
  };

  const logProgress = (bookId, payload) => {
    const nextBooks = books.map((book) => {
      if (book.id !== bookId) return book;
      const totalPages = Number(book.totalPages || 0);
      let cumulativePages = Number(book.currentPage || 0);
      let pagesRead = 0;

      if (payload.mode === 'currentPage') {
        const nextPage = clamp(Number(payload.value || 0), totalPages || Number(payload.value || 0));
        pagesRead = Math.max(0, nextPage - cumulativePages);
        cumulativePages = nextPage;
      } else {
        pagesRead = Math.max(0, Number(payload.value || 0));
        cumulativePages = clamp(cumulativePages + pagesRead, totalPages || cumulativePages + pagesRead);
      }

      if (pagesRead <= 0 && cumulativePages === Number(book.currentPage || 0)) {
        return book;
      }

      const percentComplete = totalPages ? Math.round((cumulativePages / totalPages) * 100) : 0;
      const entry = {
        id: crypto.randomUUID(),
        date: payload.date || today(),
        pagesRead,
        cumulativePages,
        percentComplete
      };

      return {
        ...book,
        currentPage: cumulativePages,
        status: cumulativePages > 0 && book.status === 'want_to_read' ? 'reading' : book.status,
        dateStarted: book.dateStarted || payload.date || today(),
        log: [...(book.log || []), entry]
      };
    });
    persistBooks(nextBooks);
  };

  const markFinished = (bookId, payload) => {
    const nextBooks = books.map((book) => {
      if (book.id !== bookId) return book;
      const alreadyComplete = (book.currentPage || 0) >= (book.totalPages || 0);
      const finalEntry =
        !alreadyComplete && book.totalPages
          ? {
              id: crypto.randomUUID(),
              date: payload.dateFinished || today(),
              pagesRead: Math.max(0, book.totalPages - (book.currentPage || 0)),
              cumulativePages: book.totalPages,
              percentComplete: 100
            }
          : null;
      return {
        ...book,
        currentPage: book.totalPages || book.currentPage,
        status: 'finished',
        dateStarted: book.dateStarted || payload.dateFinished || today(),
        dateFinished: payload.dateFinished || today(),
        rating: Number(payload.rating) || null,
        review: payload.review || '',
        log: finalEntry ? [...(book.log || []), finalEntry] : book.log
      };
    });
    persistBooks(nextBooks);
  };

  const saveSharedSnippet = (payload) => {
    const entry = {
      id: crypto.randomUUID(),
      fromName: payload.fromName.trim(),
      snippet: payload.snippet.trim(),
      savedAt: today()
    };
    persistShared([entry, ...sharedSnippets]);
  };

  const statsBooks = useMemo(() => books, [books]);

  return {
    books,
    statsBooks,
    sharedSnippets,
    addBook,
    updateBook,
    deleteBook,
    logProgress,
    markFinished,
    saveSharedSnippet
  };
}
