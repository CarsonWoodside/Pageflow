import styles from './Charts.module.css';

const COLORS = ['#2D4A3E', '#C4622D', '#C9963A', '#8A9A5B', '#9B6B5E', '#6D7B8D'];

export default function DonutChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let offset = 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={styles.donutWrap}>
      <svg viewBox="0 0 160 160" className={styles.donut}>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#E8E0D0" strokeWidth="22" />
        {data.map((item, index) => {
          const dash = (item.value / total) * circumference;
          const circle = (
            <circle
              key={item.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={COLORS[index % COLORS.length]}
              strokeWidth="22"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className={styles.legend}>
        {data.map((item, index) => (
          <div key={item.label} className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: COLORS[index % COLORS.length] }} />
            <span>
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
