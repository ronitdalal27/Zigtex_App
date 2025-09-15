// src/layout/AppLayout.jsx
import React, { useEffect, useRef, useState } from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "./AppHeader";
import EmailHeader from "../pages/Email/EmailHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useCompose } from "../context/ComposeContext";
import ComposePopup from "../pages/Email/ComposePopup";

const LayoutContent = () => {
  const { isExpanded, isHovered, setIsHovered, setIsExpanded, isMobileOpen } = useSidebar();
  const { composePopups, closeCompose } = useCompose();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [openedByClick, setOpenedByClick] = useState(false);

  const isEmailRoute = location.pathname.startsWith("/email");

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (openedByClick) {
          setIsExpanded(false);
          setIsHovered(false);
          setOpenedByClick(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openedByClick, setIsHovered, setIsExpanded]);

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar sidebarRef={sidebarRef} setOpenedByClick={setOpenedByClick} />
        <Backdrop />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        {isEmailRoute ? <EmailHeader /> : <AppHeader />}
        <div className="p-4 mx-auto max-w-[1536px] md:p-6">
          <Outlet />
        </div>
      </div>

      {/* ✅ Render multiple compose windows */}
      {composePopups.map((popup, index) => (
        <ComposePopup key={popup.id} index={index} popup={popup} />
      ))}
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;

