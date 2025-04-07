import { action, makeObservable, observable, reaction } from 'mobx';
import qs from 'qs';

type PrivateFields = '_params';

export enum FilterParams {
  Search = 'search',
  CategoryIds = 'categoryIds',
  Page = 'page',
  Rating = 'rating',
  TotalTime = 'totalTime',
  CookingTime = 'cookingTime',
  PreparationTime = 'preparationTime',
  Vegetarian = 'vegetarian',
}

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  private _setSearchParams: ((query: string, options?: { replace?: boolean }) => void) | null = null;
  private _disposer: (() => void) | null = null;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  setUrlUpdater(setSearchParams: (query: string, options?: { replace?: boolean }) => void) {
    if (this._disposer) {
      this._disposer();
    }

    this._setSearchParams = setSearchParams;

    this._disposer = reaction(
      () => this._params,
      (params) => {
        if (this._setSearchParams) {
          const queryString = qs.stringify(params);
          this._setSearchParams(queryString, { replace: true });
        }
      },
    );
  }

  getParam(key: FilterParams) {
    return this._params[key];
  }

  setParam(key: FilterParams, value?: string) {
    const newParams = { ...this._params };
    if (value) {
      newParams[key] = value;
    } else {
      delete newParams[key];
    }

    this._params = newParams;
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
