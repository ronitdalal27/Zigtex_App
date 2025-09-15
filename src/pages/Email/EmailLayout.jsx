


// src/pages/email/EmailLayout.jsx
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function EmailLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const tokenFromUrl = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (tokenFromUrl) {
      localStorage.setItem("gmailToken", tokenFromUrl);
      navigate("/email", { replace: true });
    }
  }, [tokenFromUrl, navigate]);

  const token = localStorage.getItem("gmailToken");
  if (!token) return <Navigate to="/email/login" replace />;

  return <Outlet />;
}
