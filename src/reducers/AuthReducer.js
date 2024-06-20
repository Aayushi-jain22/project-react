// import {navigate }from 'react-router-dom'
// const initialState = {
//     token: localStorage.getItem('token'),
//     isAuthenticated: null,
//     loading: true,
//     user: null,
// };

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case 'REGISTER_SUCCESS':
//         case 'LOGIN_SUCCESS':
//             localStorage.setItem('token', action.payload.token);
          
//             console.log('Saving token to localStorage:', action.payload.token); 
//             return {
//                 ...state,
//                 ...action.payload,
//                 isAuthenticated: true,
//                 loading: false,
//             };
//         case 'REGISTER_FAIL':
//         case 'LOGIN_FAIL':
//         case 'LOGOUT':
//             localStorage.removeItem('token');
//             return {
//                 ...state,
//                 token: null,
//                 isAuthenticated: false,
//                 loading: false,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// }

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: action.payload.token,
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'AUTH_ERROR':
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            return {
                ...state,
                loading: false,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
}

