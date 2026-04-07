import { useState } from 'react';
import { buildShareSnippet } from '../../utils/share';
import styles from './ShareButton.module.css';

export default function ShareButton({ book }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const snippet = buildShareSnippet(book);
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this snippet', snippet);
    }
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}
