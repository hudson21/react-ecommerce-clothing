// Redux Saga
import { takeLatest, call, put } from 'redux-saga/effects';

// Firestore
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// Actions
import ShopActionTypes from './shop.types';
import { 
  getCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(getCollectionsSuccess(collectionsMap));
  } catch(error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
} 