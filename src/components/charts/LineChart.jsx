import styles from './Charts.module.css';

export default function LineChart({ data }) {
  const points = data.slice(-12);
  const width = 320;
  const height = 180;
  const max = Math.max(...points.map((item) => item.value), 1);
  const step = points.length > 1 ? width / (points.length - 1) : width;
  const path = points
    .map((point, index) => {
      const x = index * step;
      const y = 150 - (point.value / max) * 110;
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg}>
      <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="4" className={styles.line} />
      {points.map((point, index) => {
        const x = index * step;
        const y = 150 - (point.value / max) * 110;
        return (
          <g key={`${point.label}-${index}`}>
            <circle cx={x} cy={y} r="4" fill="var(--color-accent)" />
            <text x={x} y="170" textAnchor="middle" className={styles.axisLabel}>
              {point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
