import axios from 'axios';
import store from './store';
import { logout } from './actions/AuthActions';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Update this to match your backend server URL
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Dispatch logout action if token is invalid or expired
//             store.dispatch(logout());
//         }
//         return Promise.reject(error);
//     }
// );

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const requestUrl = error.config.url;
            
            // Check if the request URL is for the logout endpoint
            if (requestUrl.endsWith('/logout')) {
                // Dispatch logout action
                store.dispatch(logout());
            } else {
                // Handle unauthorized responses for other endpoints
                console.warn('Unauthorized access for:', requestUrl);
                // Optionally handle token refresh or other actions here
            }
        }
        return Promise.reject(error);
    }
);



// export const loadUser = () => async (dispatch) => {
//     const token = localStorage.getItem('token');
  
//     if (token) {
//       dispatch({
//         type: 'USER_LOADING',
//       });
  
//       try {
//         const response = await axiosInstance.get('/user');
//         dispatch({
//           type: 'USER_LOADED',
//           payload: response.data,
//         });
//       } catch (error) {
//         dispatch({
//           type: 'AUTH_ERROR',
//         });
//       }
//     } else {
//       dispatch({
//         type: 'AUTH_ERROR',
//       });
//     }
//   };
// export default axiosInstance;

