import React, { useState } from "react";

// Helper: extract name from "Name <email@example.com>"
const extractSenderName = (from = "") => {
  const match = from.match(/^(.*?)</);
  return match ? match[1].trim() : from;
};

// Helper: extract time from date string
const formatTime = (dateStr) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (err) {
    return "";
  }
};

export default function EmailList({ emails }) {
  const [selectedEmails, setSelectedEmails] = useState([]);

  const toggleEmailSelection = (id) => {
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  if (!emails || emails.length === 0) {
    return (
      <p className="text-gray-400 text-center py-6">No emails to show.</p>
    );
  }

  return (
    <div className="space-y-2">
      {emails.map((email) => {
        const isChecked = selectedEmails.includes(email.id);
        const senderName = extractSenderName(email.from);
        const label = email.label || "Primary";
        const time = email.time || formatTime(email.date);

        // Dynamic label color
        const labelStyles = {
          Positive: "bg-[#27A544] text-white",
          Negative: "bg-[#D22F2F] text-white",
          Warm: "bg-[#FF9900] text-white",
          Future: "bg-[#5B6BC0] text-white",
          Primary: "bg-gray-200 text-black",
        };

        return (
          <div
            key={email.id}
            className="flex items-center justify-center gap-[70px] bg-white w-[1171px] h-[38px] px-4"
          >
            {/* ✅ Left Section: Checkbox + Sender */}
            <div className="flex items-center gap-[8px] min-w-[150px]">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleEmailSelection(email.id)}
                className="w-[16px] h-[16px] accent-[#202124] cursor-pointer"
              />
              <span className="text-[#202124] font-roboto text-[14px] font-bold">
                {senderName || "Unknown Sender"}
              </span>
            </div>

            {/* ✅ Middle Section: Label + Subject + Snippet */}
            <div className="flex items-center gap-[4px] flex-grow">
              <span
                className={`px-[4px] py-[1px] text-[12px] font-roboto font-bold rounded-[2px] ${
                  labelStyles[label] || "bg-gray-200 text-black"
                }`}
              >
                {label}
              </span>

              <span className="text-[#202124] font-roboto text-[14px] font-bold truncate max-w-[220px]">
                {email.subject || "(No Subject)"}
              </span>

              <span className="text-[14px] font-roboto font-normal text-black/60 truncate max-w-[400px]">
                {email.preview || email.snippet || ""}
              </span>
            </div>

            {/* ✅ Right Section: Time */}
            <div className="flex justify-end items-start">
              <div className="flex w-[120px] px-[16px] py-[9px] pr-[40px] justify-end items-center gap-[16px] bg-white">
                <span className="text-[#202124] text-right font-roboto text-[14px] font-bold">
                  {time}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

