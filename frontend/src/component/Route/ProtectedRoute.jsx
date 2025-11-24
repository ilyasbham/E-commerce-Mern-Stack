// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, children }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   if (loading) return null; // or a loader component

//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   if (isAdmin && user.role !== "admin") return <Navigate to="/login" replace />;

//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) return null; // or a loader

  if (isAuthenticated === false) {
    // Redirect to login with query param for redirect
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

