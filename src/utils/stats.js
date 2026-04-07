const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(value) {
  return value ? new Date(value) : null;
}

function daysBetween(start, end) {
  const ms = 1000 * 60 * 60 * 24;
  return Math.max(1, Math.round((end - start) / ms) + 1);
}

export function getSummaryStats(books) {
  const finished = books.filter((book) => book.status === 'finished');
  const readingLogs = books.flatMap((book) => book.log || []);
  const totalPagesRead = readingLogs.reduce((sum, entry) => sum + (entry.pagesRead || 0), 0);
  const ratings = finished.filter((book) => book.rating);
  const averageRating = ratings.length
    ? ratings.reduce((sum, book) => sum + book.rating, 0) / ratings.length
    : 0;

  const uniqueDays = [...new Set(readingLogs.map((entry) => entry.date?.slice(0, 10)).filter(Boolean))].sort().reverse();
  let streak = 0;
  if (uniqueDays.length) {
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    const firstLog = new Date(uniqueDays[0]);
    if (daysBetween(firstLog, cursor) > 1) {
      return {
        finishedCount: finished.length,
        totalPagesRead,
        streak: 0,
        averageRating
      };
    }
    for (const day of uniqueDays) {
      const current = new Date(day);
      current.setHours(0, 0, 0, 0);
      if (Math.round((cursor - current) / (1000 * 60 * 60 * 24)) === 0) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return {
    finishedCount: finished.length,
    totalPagesRead,
    streak,
    averageRating
  };
}

export function getPagesPerMonth(books, year = new Date().getFullYear()) {
  const totals = Array.from({ length: 12 }, (_, index) => ({
    label: MONTHS[index],
    value: 0
  }));

  books.forEach((book) => {
    (book.log || []).forEach((entry) => {
      const date = parseDate(entry.date);
      if (date && date.getFullYear() === year) {
        totals[date.getMonth()].value += entry.pagesRead || 0;
      }
    });
  });

  return totals;
}

export function getFinishedPerMonth(books, year = new Date().getFullYear()) {
  const totals = Array.from({ length: 12 }, (_, index) => ({
    label: MONTHS[index],
    value: 0
  }));

  books
    .filter((book) => book.status === 'finished' && book.dateFinished)
    .forEach((book) => {
      const date = parseDate(book.dateFinished);
      if (date && date.getFullYear() === year) {
        totals[date.getMonth()].value += 1;
      }
    });

  return totals;
}

export function getGenreBreakdown(books) {
  const counts = books
    .filter((book) => book.status === 'finished')
    .reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(counts).map(([label, value]) => ({ label, value }));
}

export function getPaceSeries(books) {
  const entries = books
    .flatMap((book) => (book.log || []).map((entry) => ({ ...entry })))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let cumulative = 0;
  return entries.map((entry) => {
    cumulative += entry.pagesRead || 0;
    return {
      label: new Date(entry.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      value: cumulative
    };
  });
}

export function getFunStats(books) {
  const finished = books.filter((book) => book.status === 'finished');
  const logs = books.flatMap((book) => book.log || []);
  const finishedByMonth = getFinishedPerMonth(books);
  const now = new Date();
  const currentYear = now.getFullYear();
  const lastYear = currentYear - 1;

  const longestBook = finished.reduce((best, book) => (book.totalPages > (best?.totalPages || 0) ? book : best), null);

  const fastestRead = finished.reduce((best, book) => {
    if (!book.dateStarted || !book.dateFinished) return best;
    const span = daysBetween(new Date(book.dateStarted), new Date(book.dateFinished));
    if (!best || span < best.days) return { title: book.title, days: span };
    return best;
  }, null);

  const favouriteGenre = getGenreBreakdown(books).sort((a, b) => b.value - a.value)[0] || null;
  const prolificMonth = finishedByMonth.sort((a, b) => b.value - a.value)[0] || null;
  const readingDays = new Set(logs.map((entry) => entry.date?.slice(0, 10)).filter(Boolean)).size || 1;
  const pagesRead = logs.reduce((sum, entry) => sum + (entry.pagesRead || 0), 0);
  const thisYear = finished.filter((book) => parseDate(book.dateFinished)?.getFullYear() === currentYear).length;
  const previousYear = finished.filter((book) => parseDate(book.dateFinished)?.getFullYear() === lastYear).length;

  return {
    longestBook,
    fastestRead,
    favouriteGenre,
    prolificMonth,
    averagePagesPerReadingDay: Math.round(pagesRead / readingDays),
    yearComparison: { thisYear, previousYear }
  };
}
