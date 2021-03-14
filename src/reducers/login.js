import { LOGIN, USER } from '../constants';

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                user: null,
                error: false,
            };
        case LOGIN.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: false,
            };
        case LOGIN.LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                username: null,
                error: action.error,
            };
        case USER.LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default loginReducer;
