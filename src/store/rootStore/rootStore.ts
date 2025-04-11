import { queryParamsStore } from './queryParamsStore';

export default class RootStore {
  readonly query = new queryParamsStore();
}
