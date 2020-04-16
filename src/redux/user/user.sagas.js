// Redux Saga
import { takeLatest, put, all, call } from 'redux-saga/effects';

// Actions
import UserActionTypes from './user.types';
import { 
  googleSignInSuccess,
  googleSigninFailure,
} from './user.actions';

// Firestore
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';



export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(googleSignInSuccess({ 
      id: userSnapshot.id,
      ...userSnapshot.data(), 
    }));
  } catch(error) {
    yield put(googleSigninFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)])
}