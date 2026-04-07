export const BOOKS_KEY = 'bookshelf_books';
export const PROFILE_KEY = 'bookshelf_profile';
export const ONBOARDING_KEY = 'bookshelf_onboarding_complete';

export function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readString(key, fallback = '') {
  return window.localStorage.getItem(key) || fallback;
}

export function writeString(key, value) {
  window.localStorage.setItem(key, value);
}
