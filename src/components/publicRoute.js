// // components/PublicRoute.js
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (isAuthenticated) {
//     return children;
//   }
//   //   return isAuthenticated : children;
// };

// export default PublicRoute;
