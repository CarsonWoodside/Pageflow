import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const items = [
  { to: '/shelf', label: 'Shelf' },
  { to: '/stats', label: 'Stats' },
  { to: '/friends', label: 'Friends' },
  { to: '/profile', label: 'Profile' }
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
