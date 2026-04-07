import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './App.module.css';
import { useBooks } from './hooks/useBooks';
import { useOnboarding } from './hooks/useOnboarding';
import { getTotalFinishedReads } from './utils/stats';
import BottomNav from './components/BottomNav/BottomNav';
import AddBookSheet from './components/AddBookSheet/AddBookSheet';
import QuickLogSheet from './components/QuickLogSheet/QuickLogSheet';
import Shelf from './pages/Shelf';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import BookDetail from './pages/BookDetail';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const booksApi = useBooks();
  const { isComplete, profile, saveProfile, completeOnboarding, resetOnboarding } = useOnboarding();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [quickLogBook, setQuickLogBook] = useState(null);
  const [celebration, setCelebration] = useState('');
  const currentBook = useMemo(
    () => booksApi.books.find((book) => location.pathname === `/book/${book.id}`),
    [booksApi.books, location.pathname]
  );
  const activeQuickLogBook = useMemo(
    () => booksApi.books.find((book) => book.id === quickLogBook?.id) || null,
    [booksApi.books, quickLogBook]
  );
  const finishedReads = useMemo(() => getTotalFinishedReads(booksApi.books), [booksApi.books]);
  const previousFinishedReads = useRef(finishedReads);

  useEffect(() => {
    if (previousFinishedReads.current !== finishedReads) {
      if (finishedReads > previousFinishedReads.current) {
        if (profile.readingGoal && finishedReads >= profile.readingGoal && previousFinishedReads.current < profile.readingGoal) {
          setCelebration(`✨ Goal reached. ${finishedReads} books finished this year.`);
        } else {
          setCelebration(`🎉 Finished read #${finishedReads}. Another one for the shelf.`);
        }
      }
      previousFinishedReads.current = finishedReads;
    }
  }, [finishedReads, profile.readingGoal]);

  useEffect(() => {
    if (!celebration) return undefined;
    const timer = window.setTimeout(() => setCelebration(''), 2600);
    return () => window.clearTimeout(timer);
  }, [celebration]);

  if (!isComplete) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  return (
    <div className={styles.outer} data-theme={profile.theme || 'forest'}>
      <div className={styles.deviceFrame}>
        {celebration && <div className={styles.celebration}>{celebration}</div>}
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>✨ {profile.name}'s reading journal</p>
            <h1 className={styles.title}>Bookshelf</h1>
          </div>
          <div className={styles.headerActions}>
            {location.pathname !== '/book/new' && location.pathname !== '/profile' && (
              <button className={styles.primaryButton} onClick={() => setIsAddOpen(true)}>
                ＋ Add Book
              </button>
            )}
            <button className={styles.secondaryButton} onClick={() => navigate('/profile')}>
              ⚙︎ Profile
            </button>
          </div>
        </header>

        <main className={styles.content}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/shelf" replace />}
            />
            <Route
              path="/shelf"
              element={<Shelf books={booksApi.books} onQuickLog={setQuickLogBook} />}
            />
            <Route
              path="/book/:bookId"
              element={
                <BookDetail
                  book={currentBook}
                  onBack={() => navigate('/shelf')}
                  onDelete={(bookId) => {
                    booksApi.deleteBook(bookId);
                    navigate('/shelf');
                  }}
                  onLogProgress={booksApi.logProgress}
                  onMarkFinished={booksApi.markFinished}
                  onUpdateBook={booksApi.updateBook}
                  onReread={booksApi.rereadBook}
                />
              }
            />
            <Route path="/stats" element={<Stats books={booksApi.statsBooks} profile={profile} />} />
            <Route
              path="/profile"
              element={<Profile profile={profile} books={booksApi.books} onSaveProfile={saveProfile} onResetOnboarding={resetOnboarding} />}
            />
          </Routes>
        </main>

        <BottomNav />
        <AddBookSheet
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAddBook={(book) => {
            const created = booksApi.addBook(book);
            setIsAddOpen(false);
            navigate(`/book/${created.id}`);
          }}
        />
        <QuickLogSheet
          book={activeQuickLogBook}
          isOpen={Boolean(activeQuickLogBook)}
          onClose={() => setQuickLogBook(null)}
          onSave={(bookId, pageValue) => booksApi.logProgress(bookId, { mode: 'currentPage', value: pageValue })}
          onSaveAndFinish={(bookId, pageValue) => {
            booksApi.logAndFinish(bookId, pageValue, {
              dateFinished: new Date().toISOString().slice(0, 10),
              rating: activeQuickLogBook?.rating || null,
              review: activeQuickLogBook?.review || ''
            });
          }}
          onUndo={booksApi.undoLastLog}
        />
      </div>
    </div>
  );
}
