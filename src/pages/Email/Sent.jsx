import React from "react";
import EmailContentLayout from "../Email/EmailContentLayout";

const dummyEmails = [
  {
    id: 1,
    subject: "Welcome to Inbox",
    snippet: "This is a primary email",
    label: "primary",
  },
  {
    id: 2,
    subject: "Feedback received",
    snippet: "User has shared positive feedback.",
    label: "positive",
  },
  {
    id: 3,
    subject: "Bug Report",
    snippet: "There's an issue with login",
    label: "negative",
  },
];

export default function Sent() {
  return <EmailContentLayout emails={dummyEmails} />;
}
