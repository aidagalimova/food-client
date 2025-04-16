import { useCallback, useEffect } from 'react';
import rootStore from '../instance';

export const useProfile = () => {
  const { isLoading, error, profile, fetchProfile, clearProfile } = rootStore.profile;

  const handleFetchProfile = useCallback(async () => {
    await fetchProfile();
  }, []);

  const handleClearProfile = useCallback(() => {
    clearProfile();
  }, []);

  useEffect(() => {
    handleFetchProfile();
  }, [handleFetchProfile]);

  return {
    isLoading,
    error,
    profile,
    handleClearProfile,
  };
};
