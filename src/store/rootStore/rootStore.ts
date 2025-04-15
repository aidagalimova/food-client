import { queryParamsStore } from './queryParamsStore';
import { AuthStore } from './authStore/authStore';

export default class RootStore {
  readonly query = new queryParamsStore();
  readonly auth = new AuthStore();
}
