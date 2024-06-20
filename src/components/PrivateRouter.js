
// // components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;






// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Route } from 'react-router-dom';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//     const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//     const token = localStorage.getItem('token');

//     // Check if authenticated or token exists in localStorage
//     if (!isAuthenticated && token) {
//         return <Navigate to="/tasks" />;
//     }

//     // If not authenticated or no token, redirect to login
//     return (
//         <Route
//             {...rest}
//             element={isAuthenticated || token ? <Element /> : <Navigate to="/login" />}
//         />
//     );
// };

// export default PrivateRoute;



// components/PrivateRoute.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     const loading = useSelector((state) => state.auth.loading);

//     if (loading) {
//         return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
//     }

//     return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

