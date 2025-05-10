import { action, makeObservable, observable, reaction } from 'mobx';
import qs from 'qs';
import { SetURLSearchParams } from 'react-router-dom';
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
  private _setSearchParams: SetURLSearchParams | null = null;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });

    reaction(
      () => this._params,
      (params) => {
        if (this._setSearchParams) {
          const queryString = qs.stringify(params);
          this._setSearchParams(queryString);
        }
      },
    );
  }

  setUrlUpdater(handler: SetURLSearchParams | null) {
    this._setSearchParams = handler;
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

  clearParams() {
    this._params = {};
  }

  setSearch(search: string) {
    const cleanSearch = search.startsWith('?') ? search.slice(1) : search;
    this._params = qs.parse(cleanSearch);
  }
}
