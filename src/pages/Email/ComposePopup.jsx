// 

// src/pages/Email/ComposePopup.jsx
import React, { useState, useRef } from "react";
import {
  MdMinimize,
  MdClose,
  MdOpenInFull,
  MdArrowDropDown,
  MdAttachFile,
  MdInsertLink,
  MdInsertEmoticon,
  MdDelete,
} from "react-icons/md";
import {
  FaUnderline,
  FaFont,
  FaRegImage,
  FaGoogleDrive,
} from "react-icons/fa";

import { useCompose } from "../../context/ComposeContext";

export default function ComposePopup({ index, popup }) {
  const { closeCompose, updateViewMode } = useCompose();

  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFileName, setAttachedFileName] = useState("");
  const [showFormattingToolbar, setShowFormattingToolbar] = useState(false);


  const messageRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleMinimize = () => {
    updateViewMode(
      popup.id,
      popup.viewMode === "minimized" ? "default" : "minimized"
    );
  };

  const handleMaximize = () => {
    updateViewMode(
      popup.id,
      popup.viewMode === "maximized" ? "default" : "maximized"
    );
  };

  const handleUnderline = () => {
    document.execCommand("underline");
  };

  const handleFontChange = (font) => {
    document.execCommand("fontName", false, font);
    setShowFontDropdown(false);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL:");
    if (url) document.execCommand("createLink", false, url);
  };

  const handleInsertEmoji = (emoji) => {
    document.execCommand("insertText", false, emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachFile = (e) => {
    const file = e.target.files[0];
    if (file) setAttachedFileName(file.name);
  };

  const handleInsertImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.execCommand("insertImage", false, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRightOffset = () => {
    const baseRight = 16;
    const offset = index * 360;
    const maxOffset = window.innerWidth - 520;
    return Math.min(baseRight + offset, maxOffset);
  };

  const containerClasses = () => {
    let sizeClass = "";
    if (popup.viewMode === "minimized") sizeClass = "w-[300px] h-[40px]";
    else if (popup.viewMode === "maximized") sizeClass = "w-[85vw] h-[80vh]";
    else sizeClass = "w-[500px] h-[500px]";

    let positionClass =
      popup.viewMode === "maximized"
        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        : "fixed bottom-4";

    return `${positionClass} ${sizeClass}`;
  };

  return (
    <div
      className={`${containerClasses()} flex flex-col rounded-t-[8px] bg-white shadow z-50`}
      style={{
        right:
          popup.viewMode === "maximized" ? "auto" : `${getRightOffset()}px`,
      }}
    >
      {/* Header */}
      <div className="w-full h-[40px] bg-[#424242] rounded-t-[8px] flex items-center justify-between px-4 text-white font-medium text-[14px]">
        <span>New Message</span>
        <div className="flex gap-2">
          <MdMinimize className="cursor-pointer" onClick={handleMinimize} />
          <MdOpenInFull className="cursor-pointer" onClick={handleMaximize} />
          <MdClose
            className="cursor-pointer"
            onClick={() => closeCompose(popup.id)}
          />
        </div>
      </div>

      {popup.viewMode !== "minimized" && (
        <>
          {/* Body */}
          <div className="bg-white flex-1 p-4 space-y-3 text-[14px] font-roboto text-[#0000008A] overflow-y-auto">
            {/* To / Cc / Bcc */}
            <div className="flex gap-2 items-start">
              <label className="w-[70px] pt-1">To</label>
              <input
                type="text"
                placeholder="To"
                className="flex-1 border-b border-gray-300 outline-none pb-1"
              />
              <div className="flex gap-2 ml-2 text-sm pt-1">
                <button
                  onClick={() => setShowCc(!showCc)}
                  className="hover:underline"
                >
                  Cc
                </button>
                <button
                  onClick={() => setShowBcc(!showBcc)}
                  className="hover:underline"
                >
                  Bcc
                </button>
              </div>
            </div>

            {showCc && (
              <div className="flex gap-2">
                <label className="w-[70px] pt-1">Cc</label>
                <input
                  type="text"
                  placeholder="Cc"
                  className="flex-1 border-b border-gray-300 outline-none pb-1"
                />
              </div>
            )}

            {showBcc && (
              <div className="flex gap-2">
                <label className="w-[70px] pt-1">Bcc</label>
                <input
                  type="text"
                  placeholder="Bcc"
                  className="flex-1 border-b border-gray-300 outline-none pb-1"
                />
              </div>
            )}

            {/* Subject */}
            <div className="flex gap-2">
              <label className="w-[70px] pt-1">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="flex-1 border-b border-gray-300 outline-none pb-1"
              />
            </div>

            {/* Editable Message Body */}
            <div
              ref={messageRef}
              contentEditable
              className="w-full h-[180px] p-2 border border-gray-200 overflow-y-auto text-black font-roboto outline-none"
              suppressContentEditableWarning={true}
            ></div>

            {attachedFileName && (
              <p className="text-sm text-green-600">Attached: {attachedFileName}</p>
            )}
          </div>

          {/* Footer */}
          {/* Footer */}
        <div className="px-4 pb-3 pt-1 border-t border-gray-300">
        {/* Formatting Toolbar */}
        {showFormattingToolbar && (
            <div className="flex gap-2 mb-2 items-center text-gray-700 text-sm">
            <button
                className="font-bold px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => document.execCommand("bold")}
            >
                B
            </button>
            <button
                className="italic px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => document.execCommand("italic")}
            >
                I
            </button>
            <button
                className="underline px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => document.execCommand("underline")}
            >
                U
            </button>
            <input
                type="color"
                onChange={(e) =>
                document.execCommand("foreColor", false, e.target.value)
                }
                className="w-8 h-8 p-0 border rounded cursor-pointer"
                title="Text Color"
            />
            <button
                className="px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => document.execCommand("insertUnorderedList")}
            >
                • Bullets
            </button>
            <button
                className="px-2 py-1 border rounded hover:bg-gray-100"
                onClick={() => document.execCommand("insertOrderedList")}
            >
                1. Numbers
            </button>
            </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-between items-center">
            {/* Send Button */}
            <div className="flex items-center">
            <button className="flex items-center justify-between bg-[#1A73E8] text-white px-4 h-[36px] rounded-[4px] text-sm font-medium hover:bg-[#1a63d8]">
                Send
                <span className="border-l border-white h-[16px] mx-2"></span>
                <MdArrowDropDown />
            </button>
            </div>

            {/* Icons */}
            <div className="relative flex items-center gap-4 text-gray-600 text-lg">
            {/* Toggle Text Formatting Toolbar */}
            <FaFont
                className="cursor-pointer"
                onClick={() => setShowFormattingToolbar(!showFormattingToolbar)}
                title="Toggle Formatting Toolbar"
            />

            {/* Attach File */}
            <>
                <MdAttachFile
                className="cursor-pointer"
                onClick={() => fileInputRef.current.click()}
                />
                <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAttachFile}
                />
            </>

            {/* Insert Link */}
            <MdInsertLink className="cursor-pointer" onClick={handleInsertLink} />

            {/* Emoji Picker */}
            <div className="relative">
                <MdInsertEmoticon
                className="cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                <div className="absolute top-6 left-0 bg-white shadow rounded text-sm z-10 flex flex-wrap w-[120px] p-1">
                    {["😀", "😎", "🎉", "❤️", "👍"].map((emoji) => (
                    <span
                        key={emoji}
                        className="p-1 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleInsertEmoji(emoji)}
                    >
                        {emoji}
                    </span>
                    ))}
                </div>
                )}
            </div>

            {/* Google Drive Placeholder */}
            <FaGoogleDrive
                className="cursor-pointer"
                onClick={() => alert("Google Drive integration coming soon!")}
            />

            {/* Insert Image */}
            <>
                <FaRegImage
                className="cursor-pointer"
                onClick={() => imageInputRef.current.click()}
                />
                <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                className="hidden"
                onChange={handleInsertImage}
                />
            </>

            {/* Delete */}
            <MdDelete
                onClick={() => closeCompose(popup.id)}
                className="cursor-pointer text-red-500"
            />
        </div>
  </div>
</div>

        </>
      )}
    </div>
  );
}

