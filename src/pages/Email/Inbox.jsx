// src/pages/email/Inbox.jsx
import React, { useEffect, useState } from "react";
import EmailContentLayout from "../Email/EmailContentLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");

        // Optional: still save token if you want to use it elsewhere
        if (tokenFromUrl) {
          localStorage.setItem("gmailToken", tokenFromUrl);
          window.history.replaceState({}, document.title, "/email/inbox");
        }

        // ✅ Send session cookies
        const res = await axios.get("http://localhost:3000/gmail/User/ListEmails", {
          withCredentials: true,
        });

        setEmails(res.data); // ✅ Your backend already sends final array
      } catch (err) {
        console.error("Failed to fetch inbox emails:", err);
        navigate("/email/login");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []); // empty dependency array is correct

  // ✅ Logout handler (for frontend only)
  const handleLogout = () => {
    localStorage.removeItem("gmailToken"); // optional
    window.location.href = "/email/login"; // 🔥 this clears passport session
  };

  if (loading) return <p className="text-center py-10">Loading emails...</p>;

  return (
    <div>
      <div className="flex justify-end px-4 py-2">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <EmailContentLayout emails={emails} />
    </div>
  );
}
