import React from "react";

export default function ActionMenu({ total = 50, allSelected, onSelectAll }) {
  return (
    <div className="w-[1171px] h-[54.036px] flex items-center justify-between px-1">
      {/* Left: Checkbox and other icons */}
      <div className="inline-flex items-center gap-[16px] py-[8px]">
        {/* ✅ Select All Checkbox */}
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          title="Select All"
          className="w-[18px] h-[18px] border border-gray-400 rounded-sm cursor-pointer"
        />

        {/* 🔄 Refresh Icon */}
        <button title="Refresh">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.179 2.82083C11.8498 1.49166 10.0256 0.666664 7.99979 0.666664C3.94813 0.666664 0.675629 3.94833 0.675629 8C0.675629 12.0517 3.94813 15.3333 7.99979 15.3333C11.419 15.3333 14.2698 12.9958 15.0856 9.83333H13.179C12.4273 11.9692 10.3923 13.5 7.99979 13.5C4.96563 13.5 2.4998 11.0342 2.4998 8C2.4998 4.96583 4.96563 2.5 7.99979 2.5C9.52146 2.5 10.8781 3.1325 11.8681 4.13166L8.91646 7.08333H15.3331V0.666664L13.179 2.82083Z" fill="black" fill-opacity="0.54"/>
          </svg>
        </button>

        {/* 🗑️ Delete Icon */}
        <button title="Delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
            <path d="M2.625 5.75H4.375M4.375 5.75H18.375M4.375 5.75L4.375 18C4.375 18.4641 4.55937 18.9092 4.88756 19.2374C5.21575 19.5656 5.66087 19.75 6.125 19.75H14.875C15.3391 19.75 15.7842 19.5656 16.1124 19.2374C16.4406 18.9092 16.625 18.4641 16.625 18V5.75M7 5.75V4C7 3.53587 7.18438 3.09075 7.51256 2.76256C7.84075 2.43437 8.28587 2.25 8.75 2.25H12.25C12.7141 2.25 13.1592 2.43437 13.4874 2.76256C13.8156 3.09075 14 3.53587 14 4V5.75" stroke="black" stroke-opacity="0.54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Right: Pagination Info + Arrows */}
      <div className="inline-flex items-center gap-[10px] py-[8px] px-[8px]">
        <span className="text-[14px] font-roboto text-black/60">
          1–50 of {total}
        </span>

        {/* Arrows */}
        <button title="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M14.1259 15.2075L9.92754 11L14.1259 6.7925L12.8334 5.5L7.33337 11L12.8334 16.5L14.1259 15.2075Z" fill="black" fill-opacity="0.37"/>
          </svg>
        </button>
        <button title="Next">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M7.87427 15.2075L12.0726 11L7.87427 6.7925L9.16677 5.5L14.6668 11L9.16677 16.5L7.87427 15.2075Z" fill="black" fill-opacity="0.37"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
