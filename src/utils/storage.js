export const USERS = [
  { id: 'carson', name: 'Carson' },
  { id: 'jessica', name: 'Jessica' },
  { id: 'ash', name: 'Ash' }
];

const ACTIVE_USER_KEY = 'bookshelf_active_user';

export function getActiveUserId() {
  return window.localStorage.getItem(ACTIVE_USER_KEY);
}

export function setActiveUserId(userId) {
  window.localStorage.setItem(ACTIVE_USER_KEY, userId);
}

export function getBooksKey(userId) {
  return `bookshelf_${userId}_books`;
}

export function getSharedKey(userId) {
  return `bookshelf_${userId}_shared_snippets`;
}

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
