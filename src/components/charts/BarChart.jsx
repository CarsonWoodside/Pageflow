import styles from './Charts.module.css';

export default function BarChart({ data, horizontal = false, color = 'var(--color-accent)' }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  if (horizontal) {
    return (
      <div className={styles.horizontalChart}>
        {data.map((item, index) => (
          <div key={item.label} className={styles.horizontalRow}>
            <span>{item.label}</span>
            <div className={styles.horizontalTrack}>
              <div
                className={styles.horizontalFill}
                style={{
                  width: `${(item.value / max) * 100}%`,
                  background: color,
                  animationDelay: `${index * 50}ms`
                }}
              />
            </div>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    );
  }

  const width = 320;
  const height = 180;
  const barWidth = width / data.length - 8;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg}>
      {data.map((item, index) => {
        const scaled = (item.value / max) * 120;
        const x = index * (barWidth + 8) + 4;
        const y = 140 - scaled;
        return (
          <g key={item.label}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={scaled}
              rx="8"
              fill={color}
              className={styles.bar}
              style={{ animationDelay: `${index * 50}ms` }}
            />
            <text x={x + barWidth / 2} y="168" textAnchor="middle" className={styles.axisLabel}>
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
