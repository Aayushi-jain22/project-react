// import React, { useEffect } from 'react';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import store from './store';
// import { Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import TaskPage from './pages/TaskPage';
// import ProtectedRoute from './components/protectedRoute';
// import { loadUser } from './actions/AuthActions';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   const { isAuthenticated, loading } = useSelector(state => state.auth);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Define the router configuration
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Navigate to="/register" replace />,
//     },
//     {
//       path: '/login',
//       element: <Login />,
//     },
//     {
//       path: '/register',
//       element: <Register />,
//     },
//     {
//       path: '/tasks',
//       element: (
//         <ProtectedRoute>
//           <TaskPage />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: '*',
//       element: <p>404 Error - Nothing here...</p>,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import TaskPage from './pages/TaskPage';
import PrivateRoute from './components/PrivateRouter'; // Corrected import
import { loadUser } from './actions/AuthActions';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={
              isAuthenticated ? (
                <PrivateRoute>
                  <TaskPage />
                </PrivateRoute>
              ) : loading ? (
                <div>Loading...</div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import AddTask from "./components/AddTask";
// import TaskList from "./components/TaskList";
// import PrivateRoute from "./components/PrivateRouter";
// import { loadUser } from "./actions/AuthActions";
// import { useEffect } from "react";
// import TaskPage from "./pages/TaskPage";

// function App() {
//   return (
//     <div>
//       <Provider store={store}>
//         <Router>
//           <div>
//             <Routes>
//               <Route path="/" element={<Register />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route
//                 path="/tasks"
//                 element={
//                   <TaskPage />
//                   // <PrivateRoute>
//                   // <AddTask />
//                   // </PrivateRoute>
//                 }
//               />
//               {/* <Route path="/" element={<Navigate to="/tasks" />} /> */}
//             </Routes>
//           </div>
//         </Router>
//       </Provider>
//     </div>
//   );
// }

// export default App;
