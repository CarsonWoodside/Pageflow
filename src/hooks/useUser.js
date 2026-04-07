import { useEffect, useState } from 'react';
import { getActiveUserId, setActiveUserId, USERS } from '../utils/storage';

export function useUser() {
  const [activeUserId, setUserId] = useState(() => getActiveUserId());

  useEffect(() => {
    if (activeUserId) {
      setActiveUserId(activeUserId);
    }
  }, [activeUserId]);

  const activeUser = USERS.find((user) => user.id === activeUserId) || null;

  return {
    activeUser,
    users: USERS,
    selectUser: setUserId,
    clearUser: () => setUserId(null)
  };
}
