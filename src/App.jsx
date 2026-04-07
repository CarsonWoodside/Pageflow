import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import styles from './App.module.css';
import { useUser } from './hooks/useUser';
import { useBooks } from './hooks/useBooks';
import BottomNav from './components/BottomNav/BottomNav';
import AddBookSheet from './components/AddBookSheet/AddBookSheet';
import Shelf from './pages/Shelf';
import Stats from './pages/Stats';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import UserSelect from './pages/UserSelect';
import BookDetail from './pages/BookDetail';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeUser, users, selectUser, clearUser } = useUser();
  const booksApi = useBooks(activeUser?.id);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const currentBook = useMemo(
    () => booksApi.books.find((book) => location.pathname === `/book/${book.id}`),
    [booksApi.books, location.pathname]
  );

  if (!activeUser) {
    return <UserSelect users={users} onSelect={selectUser} />;
  }

  return (
    <div className={styles.outer}>
      <div className={styles.deviceFrame}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>{activeUser.name}'s reading journal</p>
            <h1 className={styles.title}>Bookshelf</h1>
          </div>
          <div className={styles.headerActions}>
            {location.pathname !== '/book/new' && (
              <button className={styles.primaryButton} onClick={() => setIsAddOpen(true)}>
                Add Book
              </button>
            )}
            <button className={styles.secondaryButton} onClick={() => navigate('/profile')}>
              Switch User
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
              element={<Shelf books={booksApi.books} />}
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
                />
              }
            />
            <Route path="/stats" element={<Stats books={booksApi.statsBooks} />} />
            <Route
              path="/friends"
              element={
                <Friends
                  activeUser={activeUser}
                  users={users}
                  sharedSnippets={booksApi.sharedSnippets}
                  onSaveSnippet={booksApi.saveSharedSnippet}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile activeUser={activeUser} users={users} onSelect={selectUser} onSignOut={clearUser} />}
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
      </div>
    </div>
  );
}
