import { useState } from 'react';
import { ONBOARDING_KEY, PROFILE_KEY, readJson, readString, writeJson, writeString } from '../utils/storage';

const defaultProfile = {
  name: '',
  readingGoal: 12,
  vibe: 'Cosy evenings',
  accent: 'Forest green',
  theme: 'forest'
};

export function useOnboarding() {
  const [isComplete, setIsComplete] = useState(() => readString(ONBOARDING_KEY) === 'true');
  const [profile, setProfile] = useState(() => ({ ...defaultProfile, ...readJson(PROFILE_KEY, defaultProfile) }));

  const saveProfile = (nextProfile) => {
    const merged = { ...defaultProfile, ...nextProfile };
    setProfile(merged);
    writeJson(PROFILE_KEY, merged);
  };

  const completeOnboarding = (nextProfile) => {
    saveProfile(nextProfile);
    setIsComplete(true);
    writeString(ONBOARDING_KEY, 'true');
  };

  const resetOnboarding = () => {
    setIsComplete(false);
    writeString(ONBOARDING_KEY, 'false');
  };

  return {
    isComplete,
    profile,
    saveProfile,
    completeOnboarding,
    resetOnboarding
  };
}
