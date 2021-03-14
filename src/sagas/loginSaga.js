import { put, takeEvery, select } from 'redux-saga/effects';
import { setLoginError } from '../actions';
import { LOGIN } from '../constants';

export const getUsername = state => {
    return state.login.user;
}

export function* handleLogin() {
    try {
        const username = yield select(getUsername);
        if (username) {
            sessionStorage.setItem('user', username);
        }

    } catch (error) {
        yield put(setLoginError(error.toString()));
    }
}

export default function* watchLogin() {
    yield takeEvery(LOGIN.LOGIN_SUCCESS, handleLogin);
}
