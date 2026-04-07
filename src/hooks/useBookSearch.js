import { useEffect, useState } from 'react';

function getOpenLibraryCover(result) {
  if (result.cover_i) {
    return `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`;
  }

  const isbn = result.isbn?.find(Boolean);
  if (isbn) {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  }

  return null;
}

function getGoogleImageLink(item) {
  const links = item?.volumeInfo?.imageLinks;
  return links?.thumbnail?.replace('http://', 'https://') || links?.smallThumbnail?.replace('http://', 'https://') || null;
}

async function fetchGoogleBooksCover(result, signal) {
  const queries = [];
  const isbn = result.isbn?.find(Boolean);
  const title = result.title || '';
  const author = result.author_name?.[0] || '';

  if (isbn) {
    queries.push(`isbn:${isbn}`);
  }
  if (title && author) {
    queries.push(`intitle:"${title}" inauthor:"${author}"`);
  }
  if (title) {
    queries.push(`intitle:"${title}"`);
  }

  for (const q of queries) {
    const params = new URLSearchParams({
      q,
      maxResults: '3',
      fields: 'items(volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks,volumeInfo/industryIdentifiers)'
    });
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params.toString()}`, { signal });
    if (!response.ok) continue;

    const data = await response.json();
    const direct = (data.items || []).find((item) => getGoogleImageLink(item));
    if (direct) {
      return getGoogleImageLink(direct);
    }
  }

  return null;
}

async function normaliseResult(result, signal) {
  const coverUrl = getOpenLibraryCover(result) || (await fetchGoogleBooksCover(result, signal));

  return {
    openLibraryKey: result.key || null,
    title: result.title || '',
    author: result.author_name?.join(', ') || 'Unknown author',
    totalPages: result.number_of_pages_median || '',
    coverUrl,
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
          fields: 'key,title,author_name,number_of_pages_median,cover_i,isbn,subject,first_publish_year',
          limit: '10'
        });
        const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`, {
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error('Search unavailable');
        }
        const data = await response.json();
        const normalised = await Promise.all(
          (data.docs || []).slice(0, 5).map((result) => normaliseResult(result, controller.signal))
        );
        setResults(normalised);
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
