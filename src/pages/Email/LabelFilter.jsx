import React from "react";
import { LABELS } from "../../components/constants/EmailLabels";
import { PrimaryIcon, PositiveIcon, NegativeIcon, WarmIcon, FutureRefIcon } from "../../icons";


// Define styles for each label
const labelStyles = {
  Primary: {
    color: "text-[#C84031]",
    bar: "bg-[#C84031]",
    icon: <PrimaryIcon className="w-[40px] h-[40px]"/>,
  },
  Positive: {
    color: "text-[#2D8A34]",
    bar: "bg-[#2D8A34]",
    icon: <PositiveIcon className="w-[40px] h-[40px]"/>,
  },
  Negative: {
    color: "text-[#D22F2F]",
    bar: "bg-[#D22F2F]",
    icon: <NegativeIcon className="w-[40px] h-[40px]"/>,
  },
  Warm: {
    color: "text-[#FF9900]",
    bar: "bg-[#FF9900]",
    icon: <WarmIcon className="w-[40px] h-[40px]"/>,
  },
  Future: {
    color: "text-[#5B6BC0]",
    bar: "bg-[#5B6BC0]",
    icon: <FutureRefIcon className="w-[40px] h-[40px]"/>,
  },
};

export default function LabelFilter({ selected, onSelect, newCounts }) {
  return (
    <div className="w-full max-w-[1187px] mx-auto px-6 bg-[#F7F8F9] shadow-[inset_0_-1px_0_0_#EDEFF1]">
      <div className="flex h-[50px] items-center gap-[50px]">
        {LABELS.map((label) => {
          const isActive = selected === label;
          const { color, bar, icon } = labelStyles[label];
          const newCount = newCounts[label] || 0; // default 0 if not provided

          return (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className={`relative ${
                label === "Future" ? "w-[200px]" : "w-[140px]"
              } h-[54px] bg-[#F7F8F9] flex flex-col items-left justify-center
                ${label === "Primary" ? "mr-[150px]" : ""}`}
            >

              <div className="inline-flex items-center gap-[10px]">
                <div className="flex justify-center items-center w-[22px] h-[22px]">
                  {icon}
                </div>

                <div className="flex items-center gap-[6px]">
                  <span
                    className={`font-roboto text-[14px] font-medium leading-[120%] tracking-[-0.14px] ${
                      isActive ? color : "text-gray-400"
                    }`}
                  >
                    {label === "Future"
                      ? "Future Reference"
                      : label.charAt(0).toUpperCase() + label.slice(1)}
                  </span>

                  {/* ✅ Dynamic "new" badge */}
                  {label !== "Primary" && newCounts[label] > 0 && (
                    <span
                      className={`
                        ml-1 px-1.5 py-[1px] text-[12px] font-roboto font-bold leading-[120%] 
                        rounded-[2px] flex items-center
                        ${
                          label === "Positive"
                            ? "bg-[#27A544] text-[#FFF5F5]"
                            : label === "Negative"
                            ? "bg-[#D22F2F] text-[#FFF5F5]"
                            : label === "Warm"
                            ? "bg-[#FF9900] text-[#FFF5F5]"
                            : label === "Future"
                            ? "bg-[#5B6BC0] text-[#FFF5F5]"
                            : ""
                        }
                      `}
                    >
                      {newCounts[label]} new
                    </span>
                  )}

                </div>
              </div>

              {/* Bottom bar */}
              {isActive && (
                <div
                  className={`absolute bottom-0 h-[3px] rounded-t-[5px] ${bar} ${
                    label === "Primary"
                      ? "w-[214px] left-0"
                      : label === "Future"
                      ? "w-[200px] left-[1px]"
                      : "w-[130px] right-[10px]"
                  }`}
                ></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
