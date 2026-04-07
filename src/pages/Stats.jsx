import BarChart from '../components/charts/BarChart';
import DonutChart from '../components/charts/DonutChart';
import LineChart from '../components/charts/LineChart';
import {
  getFinishedPerMonth,
  getHeatmapData,
  getFunStats,
  getGenreBreakdown,
  getPagesPerMonth,
  getPaceSeries,
  getSummaryStats,
  getTotalFinishedReads
} from '../utils/stats';
import styles from './Stats.module.css';

export default function Stats({ books, profile }) {
  const summary = getSummaryStats(books);
  const pagesPerMonth = getPagesPerMonth(books);
  const finishedPerMonth = getFinishedPerMonth(books);
  const genreBreakdown = getGenreBreakdown(books);
  const paceSeries = getPaceSeries(books);
  const fun = getFunStats(books);
  const heatmap = getHeatmapData(books);
  const finishedReads = getTotalFinishedReads(books);
  const goalPercent = profile.readingGoal ? Math.min(100, Math.round((finishedReads / profile.readingGoal) * 100)) : 0;

  return (
    <section className={`${styles.page} page-enter`}>
      <div className={styles.goalCard}>
        <div>
          <p className={styles.goalLabel}>Goal progress</p>
          <h2>
            {finishedReads} of {profile.readingGoal} books
          </h2>
          <p className={styles.goalCopy}>
            {goalPercent}% complete. {Math.max(profile.readingGoal - finishedReads, 0)} left to hit your goal.
          </p>
        </div>
        <div className={styles.goalRing}>
          <strong>{goalPercent}%</strong>
        </div>
      </div>

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
        <h2>Reading days</h2>
        <div className={styles.heatmap}>
          {heatmap.map((day) => (
            <div
              key={day.key}
              className={styles.heatCell}
              style={{ opacity: day.value ? Math.min(1, 0.2 + day.value / 40) : 0.14 }}
              title={`${day.label}: ${day.value} pages`}
            />
          ))}
        </div>
        <p className={styles.heatLabel}>Last 35 days of reading activity.</p>
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
