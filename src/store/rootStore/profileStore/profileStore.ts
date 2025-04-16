import { makeObservable, observable, action, runInAction } from 'mobx';
import { profile, UserProfileResponse } from 'api/profile';
import { AxiosError } from 'axios';
import type { ApiError } from 'api/types';
import type { UserProfile } from './types';

export class ProfileStore {
  isLoading: boolean = false;
  error: ApiError | null = null;
  profile: UserProfile | null = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable.ref,
      profile: observable.ref,

      fetchProfile: action.bound,
      clearProfile: action.bound,
    });
  }

  setProfile(profileData: UserProfileResponse) {
    this.profile = {
      ...profileData,
      createdAt: new Date(profileData.createdAt),
      updatedAt: new Date(profileData.updatedAt),
    };
  }

  async fetchProfile(): Promise<boolean> {
    runInAction(() => {
      this.error = null;
      this.isLoading = true;
    });

    try {
      const profileData = await profile.getCurrentUser();
      runInAction(() => {
        this.setProfile(profileData);
      });
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof AxiosError && error.response?.data.error;
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  clearProfile() {
    this.profile = null;
    this.error = null;
  }
}
