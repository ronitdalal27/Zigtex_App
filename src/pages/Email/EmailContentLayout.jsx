// import React, { useState } from "react";
// import ActionMenu from "./ActionMenu";
// import LabelFilter from "./LabelFilter";
// import EmailList from "./EmailList";

// export default function EmailContentLayout({ emails }) {
//   const [selectedLabel, setSelectedLabel] = useState("Primary");
//   const [selectedEmailIds, setSelectedEmailIds] = useState([]);

//   const newCounts = { Positive: 5, Negative: 1, Warm: 3, Future: 3 };

//   // Filter emails based on label
//   const filteredEmails =
//     selectedLabel === "Primary"
//       ? emails
//       : emails.filter((email) => email.label === selectedLabel);

//   const emailIds = filteredEmails.map((email) => email.id);
//   const allSelected = emailIds.every((id) => selectedEmailIds.includes(id));

//   const handleSelectAllToggle = () => {
//     if (allSelected) {
//       // Unselect all visible
//       setSelectedEmailIds((prev) => prev.filter((id) => !emailIds.includes(id)));
//     } else {
//       // Select all visible
//       setSelectedEmailIds((prev) => [...new Set([...prev, ...emailIds])]);
//     }
//   };

//   const handleToggleEmail = (id) => {
//     setSelectedEmailIds((prev) =>
//       prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="max-w-[1187px] mx-auto px-1 space-y-2">
//       {/* Action Menu */}
//       <div className="w-full flex">
//         <ActionMenu
//           total={filteredEmails.length}
//           allSelected={allSelected}
//           onSelectAll={handleSelectAllToggle}
//         />
//       </div>

//       {/* Label Filter */}
//       <LabelFilter
//         selected={selectedLabel}
//         onSelect={(label) => setSelectedLabel(label)}
//         newCounts={newCounts}
//       />

//       {/* Email List */}
//       <EmailList
//         emails={filteredEmails}
//         selectedEmailIds={selectedEmailIds}
//         onToggleEmail={handleToggleEmail}
//       />
//     </div>
//   );
// }

// src/pages/Email/EmailContentLayout.jsx
import React, { useState } from "react";
import axios from "axios";
import ActionMenu from "./ActionMenu";
import LabelFilter from "./LabelFilter";
import EmailList from "./EmailList";

export default function EmailContentLayout({ emails: initialEmails }) {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedLabel, setSelectedLabel] = useState("Primary");
  const [selectedEmailIds, setSelectedEmailIds] = useState([]);

  const newCounts = { Positive: 5, Negative: 1, Warm: 3, Future: 3 };

  const refreshEmails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gmail/User/ListEmails", {
        withCredentials: true,
      });
      setEmails(res.data);
    } catch (err) {
      console.error("🔁 Error refreshing inbox:", err.message);
    }
  };

  // Filter emails based on label
  const filteredEmails =
    selectedLabel === "Primary"
      ? emails
      : emails.filter((email) => email.label === selectedLabel);

  const emailIds = filteredEmails.map((email) => email.id);
  const allSelected = emailIds.every((id) => selectedEmailIds.includes(id));

  const handleSelectAllToggle = () => {
    if (allSelected) {
      setSelectedEmailIds((prev) => prev.filter((id) => !emailIds.includes(id)));
    } else {
      setSelectedEmailIds((prev) => [...new Set([...prev, ...emailIds])]);
    }
  };

  const handleToggleEmail = (id) => {
    setSelectedEmailIds((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-[1187px] mx-auto px-1 space-y-2">
      {/* Action Menu */}
      <div className="w-full flex">
        <ActionMenu
          total={filteredEmails.length}
          allSelected={allSelected}
          onSelectAll={handleSelectAllToggle}
          onRefresh={refreshEmails} // ✅ Added
        />
      </div>

      {/* Label Filter */}
      <LabelFilter
        selected={selectedLabel}
        onSelect={(label) => setSelectedLabel(label)}
        newCounts={newCounts}
      />

      {/* Email List */}
      <EmailList
        emails={filteredEmails}
        selectedEmailIds={selectedEmailIds}
        onToggleEmail={handleToggleEmail}
      />
    </div>
  );
}


