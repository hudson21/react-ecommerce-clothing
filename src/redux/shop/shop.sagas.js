// Redux Saga
import { takeEvery } from 'redux-saga/effects';

// Actions
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
 yield console.log('fetchCollectionsAsync');
}

export function* fetchCollectionsStart() {
  yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}