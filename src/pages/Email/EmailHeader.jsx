import React from "react";
import { useCompose } from "../../context/ComposeContext"; // ✅ import context

export default function EmailHeader() {
  const { openCompose } = useCompose(); // ✅ use context
  
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-[#F7F8F9] border-b border-[#E8E8E8] rounded-b-[10px]">
      <div className="flex justify-between items-center h-[78px] px-[24px] pr-[32px] max-w-[1187px] mx-auto">
        <div className="flex items-center gap-[24px]">
          <h1 className="text-[#140D40] font-[700] text-[24px]">Inbox</h1>
          <div className="flex items-center gap-[4px]">
            {/* Icon & Date */}
            <svg width="24" height="24" fill="none"><path d="M13 17L18 12L13 7" stroke="#9F9F9F" strokeWidth="2"/><path d="M6 17L11 12L6 7" stroke="#9F9F9F" strokeWidth="2"/></svg>
            <span className="text-[#9F9F9F] text-[14px]">{today}</span>
          </div>
        </div>

        <button
          onClick={openCompose}
          className="flex items-center gap-[10px] h-[29px] px-[11px] py-[5px] bg-[#1743FC] text-white rounded-[4px]"
        >
          <svg width="20" height="20" fill="none"><path d="M4.1 15.8H5.3L13.5 7.7 12.3 6.5 4.1 14.6V15.8ZM2.5 17.5V14L13.5 3c.2-.2.4-.3.6-.4.2-.1.4-.1.6-.1s.4.1.6.2c.2.1.4.2.6.4L17 4.2c.2.2.3.4.4.6.1.2.2.4.2.6 0 .2-.1.4-.2.6s-.2.4-.4.6L6 17.5H2.5Z" fill="white" /></svg>
          <span className="text-[13px] font-[700]">Compose</span>
        </button>
      </div>
    </header>
  );
}
