import { useEffect, useState } from "react";
import BookCover from "../components/BookCover/BookCover";
import GenreBadge from "../components/GenreBadge/GenreBadge";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import StarRating from "../components/StarRating/StarRating";
import styles from "./BookDetail.module.css";

export default function BookDetail({
  book,
  onBack,
  onDelete,
  onLogProgress,
  onMarkFinished,
  onUpdateBook,
  onReread,
}) {
  const [logValue, setLogValue] = useState("");
  const [finishDate, setFinishDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [rating, setRating] = useState(book?.rating || 0);
  const [review, setReview] = useState(book?.review || "");
  const [totalPagesDraft, setTotalPagesDraft] = useState(
    book?.totalPages || "",
  );

  useEffect(() => {
    setRating(book?.rating || 0);
    setReview(book?.review || "");
    setTotalPagesDraft(book?.totalPages || "");
  }, [book]);

  if (!book) {
    return (
      <div className={styles.empty}>
        <p>That book could not be found.</p>
        <button onClick={onBack}>Back to shelf</button>
      </div>
    );
  }

  const progress = book.totalPages
    ? Math.round((book.currentPage / book.totalPages) * 100)
    : 0;
  const nextPageValue = Number(logValue || 0);
  const sessionPages = Math.max(0, nextPageValue - (book.currentPage || 0));

  return (
    <section className={`${styles.page} page-enter`}>
      <button className={styles.back} onClick={onBack}>
        Back
      </button>

      <div className={styles.hero}>
        <BookCover
          title={book.title}
          coverUrl={book.coverUrl}
          color={book.coverColor}
          large
        />
        <div className={styles.heroCopy}>
          <GenreBadge label={book.genre} />
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p className={styles.meta}>
            {book.totalPages
              ? `${book.totalPages} pages`
              : "Page count pending"}
            {book.firstPublishYear
              ? ` · First published ${book.firstPublishYear}`
              : ""}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Edition details</h3>
        <p className={styles.meta}>
          Different editions can have different page counts. Update the total
          pages here if your copy is different.
        </p>
        <label className={styles.label}>
          Total pages in your edition
          <div className={styles.inlineAction}>
            <input
              className={styles.input}
              type="number"
              min="0"
              inputMode="numeric"
              value={totalPagesDraft}
              onChange={(event) => setTotalPagesDraft(event.target.value)}
              placeholder="Enter page count"
            />
            <button
              className={styles.secondary}
              onClick={() =>
                onUpdateBook(book.id, {
                  totalPages: Number(totalPagesDraft) || 0,
                })
              }
            >
              Save pages
            </button>
          </div>
        </label>
      </div>

      {(book.status === "reading" || book.status === "finished") && (
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <h3>Reading progress</h3>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
          <p className={styles.meta}>
            {book.currentPage}/{book.totalPages || "?"} pages
          </p>
        </div>
      )}

      {book.status !== "finished" && (
        <div className={styles.section}>
          <h3>Update progress</h3>
          <p className={styles.meta}>Set the page you&apos;re on now.</p>
          <input
            className={styles.input}
            type="number"
            min={book.currentPage || 0}
            value={logValue}
            onChange={(event) => setLogValue(event.target.value)}
            placeholder={`You were on page ${book.currentPage || 0}`}
          />
          <p className={styles.sessionHint}>
            Last saved page: {book.currentPage || 0}. If you save page{" "}
            {nextPageValue || book.currentPage || 0}, this session counts as{" "}
            {sessionPages} page{sessionPages === 1 ? "" : "s"} read.
          </p>
          <button
            className={styles.primary}
            onClick={() => {
              onLogProgress(book.id, {
                mode: "currentPage",
                value: Number(logValue),
              });
              setLogValue("");
            }}
          >
            Save current page
          </button>
          <button
            className={styles.secondary}
            onClick={() => onUpdateBook(book.id, { status: "dnf" })}
          >
            Mark as DNF
          </button>
        </div>
      )}

      <div className={styles.section}>
        <h3>
          {book.status === "finished" ? "Finished notes" : "Mark finished"}
        </h3>
        <label className={styles.label}>
          Date finished
          <input
            className={styles.input}
            type="date"
            value={finishDate}
            onChange={(event) => setFinishDate(event.target.value)}
          />
        </label>
        <StarRating value={rating} onChange={setRating} />
        <textarea
          className={styles.textarea}
          rows="4"
          value={review}
          onChange={(event) => setReview(event.target.value)}
          placeholder="A short review"
        />
        <button
          className={styles.primary}
          onClick={() =>
            onMarkFinished(book.id, {
              dateFinished: finishDate,
              rating,
              review,
            })
          }
        >
          Save finished book
        </button>
        {book.status === "finished" && (
          <button
            className={styles.secondary}
            onClick={() => onReread(book.id)}
          >
            Start a re-read
          </button>
        )}
        {Boolean(book.pastReads?.length) && (
          <p className={styles.meta}>
            Previous completed reads saved: {book.pastReads.length}
          </p>
        )}
      </div>

      <div className={styles.section}>
        <h3>Progress history</h3>
        {book.log?.length ? (
          <div className={styles.log}>
            {[...book.log].reverse().map((entry) => (
              <div key={entry.id} className={styles.logEntry}>
                <strong>
                  {new Date(entry.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
                <span>
                  {entry.pagesRead} pages · {entry.cumulativePages} total ·{" "}
                  {entry.percentComplete}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.meta}>No sessions logged yet.</p>
        )}
      </div>

      <button className={styles.delete} onClick={() => onDelete(book.id)}>
        Delete book
      </button>
    </section>
  );
}
