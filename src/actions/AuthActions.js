
import axiosInstance from '../axiosInstance';

export const register = (userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/register', userData);
        if (response && response.data) {
            dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
            // navigate('/login');
        }
    } catch (error) {
        dispatch({ type: 'REGISTER_FAIL', payload: error.response ? error.response.data : error.message });
    }
};

export const login = (userData, navigate) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/login', userData);
        if (response && response.data) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
            localStorage.setItem('token', response.data.token); // Save token to local storage
            navigate('/tasks'); // Navigate to tasks page after successful login
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response ? error.response.data : error.message });
    }
};

export const loadUser = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch({
            type: 'USER_LOADED',
            payload: { token },
        });
    } else {
        dispatch({
            type: 'AUTH_ERROR',
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axiosInstance.post('/logout'); // Ensure the token is included in the headers
        localStorage.removeItem('token');
        dispatch({
            type: 'LOGOUT',
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: 'LOGOUT_FAILURE',
            payload: error.message,
        });
    }
};









// import axiosInstance from '../axiosInstance';

// export const register = (userData) => async (dispatch) => {
//     try {
//         const response = await axiosInstance.post('/register', userData);
//         if (response && response.data) {
//             dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });    
//         }
//     } catch (error) {
//         dispatch({ type: 'REGISTER_FAIL', payload: error.response ? error.response.data : error.message });
//     }
// };

// export const login = (userData, navigate) => async (dispatch) => {
//     try {
//         const response = await axiosInstance.post('/login', userData);
//         if (response && response.data) {
//             dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
//             localStorage.setItem('token', response.data.token); // Save token to local storage
//             navigate('/tasks'); // Navigate to tasks page after successful login

//         }
//     } catch (error) {
//         dispatch({ type: 'LOGIN_FAIL', payload: error.response ? error.response.data : error.message });
//     }
// };

// export const loadUser = () => async (dispatch) => {
//     const token = localStorage.getItem('token');

//     if (token) {
//         dispatch({
//             type: 'USER_LOADED',
//             payload: { token },
//         });
//     } else {
//         dispatch({
//             type: 'AUTH_ERROR',
//         });
//     }
// };

// export const logout = () => async (dispatch) => {
//     try {
//         await axiosInstance.post('/logout'); // Ensure the token is included in the headers
//         localStorage.removeItem('token');
//         dispatch({
//             type: 'LOGOUT',
//         });
//     } catch (error) {
//         console.error(error);
//         dispatch({
//             type: 'LOGOUT_FAILURE',
//             payload: error.message,
//         });
//     }
// };

