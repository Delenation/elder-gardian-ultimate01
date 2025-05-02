import { Navigate } from "react-router";

export default function RedirectIndex() {
  return <Navigate to="/dashboard" replace />;
}