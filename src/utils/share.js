export function buildShareSnippet(book) {
  const intro =
    book.status === 'finished'
      ? `📖 I just finished ${book.title} by ${book.author}`
      : book.status === 'reading'
        ? `📚 I’m reading ${book.title} by ${book.author}`
        : `📘 ${book.title} by ${book.author}`;

  const rating = book.rating ? ` — ${book.rating}/5 stars.` : '.';
  const review = book.review ? ` ${book.review}` : '';
  return `${intro}${rating}${review}`.trim();
}
