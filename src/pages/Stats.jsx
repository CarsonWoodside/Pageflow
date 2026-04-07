import BarChart from '../components/charts/BarChart';
import DonutChart from '../components/charts/DonutChart';
import LineChart from '../components/charts/LineChart';
import {
  getFinishedPerMonth,
  getFunStats,
  getGenreBreakdown,
  getPagesPerMonth,
  getPaceSeries,
  getSummaryStats
} from '../utils/stats';
import styles from './Stats.module.css';

export default function Stats({ books }) {
  const summary = getSummaryStats(books);
  const pagesPerMonth = getPagesPerMonth(books);
  const finishedPerMonth = getFinishedPerMonth(books);
  const genreBreakdown = getGenreBreakdown(books);
  const paceSeries = getPaceSeries(books);
  const fun = getFunStats(books);

  return (
    <section className={`${styles.page} page-enter`}>
      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <strong>{summary.finishedCount}</strong>
          <span>Books finished</span>
        </div>
        <div className={styles.card}>
          <strong>{summary.totalPagesRead}</strong>
          <span>Total pages read</span>
        </div>
        <div className={styles.card}>
          <strong>{summary.streak}</strong>
          <span>Current streak</span>
        </div>
        <div className={styles.card}>
          <strong>{summary.averageRating ? summary.averageRating.toFixed(1) : '—'}</strong>
          <span>Average rating</span>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h2>Pages read per month</h2>
        <BarChart data={pagesPerMonth} horizontal color="var(--color-accent)" />
      </div>

      <div className={styles.chartCard}>
        <h2>Books finished per month</h2>
        <BarChart data={finishedPerMonth} color="var(--color-primary)" />
      </div>

      <div className={styles.chartCard}>
        <h2>Genre breakdown</h2>
        {genreBreakdown.length ? <DonutChart data={genreBreakdown} /> : <p>No finished books yet.</p>}
      </div>

      <div className={styles.chartCard}>
        <h2>Reading pace</h2>
        {paceSeries.length ? <LineChart data={paceSeries} /> : <p>Log a reading session to see your pace.</p>}
      </div>

      <div className={styles.chartCard}>
        <h2>Fun stats</h2>
        <div className={styles.funStats}>
          <p>Longest book finished: {fun.longestBook ? `${fun.longestBook.title} (${fun.longestBook.totalPages} pages)` : '—'}</p>
          <p>Fastest read: {fun.fastestRead ? `${fun.fastestRead.title} (${fun.fastestRead.days} days)` : '—'}</p>
          <p>Favourite genre: {fun.favouriteGenre ? fun.favouriteGenre.label : '—'}</p>
          <p>Most prolific month: {fun.prolificMonth?.value ? `${fun.prolificMonth.label} (${fun.prolificMonth.value})` : '—'}</p>
          <p>Average pages per reading day: {fun.averagePagesPerReadingDay || 0}</p>
          <p>
            Finished this year vs last year: {fun.yearComparison.thisYear} vs {fun.yearComparison.previousYear}
          </p>
        </div>
      </div>
    </section>
  );
}
