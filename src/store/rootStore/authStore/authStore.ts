import { makeObservable, observable, action, runInAction, computed, reaction } from 'mobx';
import { AxiosError } from 'axios';
import { auth } from 'api/auth';
import type { ApiError } from 'api/types';
import type { LoginData, RegisterData } from './types';
import rootStore from '../instance';

type PrivateFields = '_token';

export class AuthStore {
  isLoading: boolean = false;
  error: ApiError | null = null;
  private _token: string | null = localStorage.getItem('jwt');
  private disposer: () => void;

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _token: observable,
      isLoading: observable,
      error: observable.ref,

      isAuthenticated: computed,

      login: action.bound,
      register: action.bound,
      clearError: action.bound,
      logout: action.bound,
    });

    this.disposer = reaction(
      () => this._token,
      (token) => {
        if (token) {
          localStorage.setItem('jwt', token);
        } else {
          localStorage.removeItem('jwt');
        }
      },
    );
  }

  get isAuthenticated(): boolean {
    return !!this._token;
  }

  clearError() {
    this.error = null;
  }

  logout() {
    this._token = null;
    this.error = null;
    rootStore.profile.clearProfile();
  }

  async login(data: LoginData): Promise<boolean> {
    runInAction(() => {
      this.error = null;
      this.isLoading = true;
    });

    try {
      const response = await auth.login(data);
      runInAction(() => {
        this._token = response.jwt;
        rootStore.profile.setProfile(response.user);
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

  async register(data: RegisterData): Promise<boolean> {
    runInAction(() => {
      this.error = null;
      this.isLoading = true;
    });

    try {
      const response = await auth.register(data);
      runInAction(() => {
        this._token = response.jwt;
        rootStore.profile.setProfile(response.user);
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

  destroy() {
    this.disposer();
  }
}
