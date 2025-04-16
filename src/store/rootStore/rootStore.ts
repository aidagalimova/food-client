import { queryParamsStore } from './queryParamsStore';
import { AuthStore } from './authStore/authStore';
import { ProfileStore } from './profileStore';

export default class RootStore {
  readonly query = new queryParamsStore();
  readonly auth = new AuthStore();
  readonly profile = new ProfileStore();
}
