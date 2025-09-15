// src/pages/email/GmailLogin.jsx
import React from "react";

export default function GmailLogin() {
  const handleGmailLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Connect Your Gmail</h1>
      <p className="mb-6 text-gray-600">To view emails, please sign in with your Gmail account.</p>
      <button
        onClick={handleGmailLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Sign in with Gmail
      </button>
    </div>
  );
}
