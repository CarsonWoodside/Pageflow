import { useEffect, useState } from 'react';

function normaliseResult(result) {
  return {
    openLibraryKey: result.key || null,
    title: result.title || '',
    author: result.author_name?.join(', ') || 'Unknown author',
    totalPages: result.number_of_pages_median || '',
    coverUrl: result.cover_i ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` : null,
    subjects: result.subject || [],
    firstPublishYear: result.first_publish_year || null
  };
}

export function useBookSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setError('');
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError('');
        const params = new URLSearchParams({
          q: query,
          fields: 'key,title,author_name,number_of_pages_median,cover_i,subject,first_publish_year',
          limit: '10'
        });
        const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`, {
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error('Search unavailable');
        }
        const data = await response.json();
        setResults((data.docs || []).slice(0, 5).map(normaliseResult));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Search unavailable, enter manually');
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return { results, loading, error };
}
