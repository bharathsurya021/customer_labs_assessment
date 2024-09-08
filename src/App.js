import React, { useEffect, useState, useRef } from "react";
import SidebarForm from "./components/SidebarForm";
import ToastNotifications from "./components/ToastNotification";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  //       setIsSidebarOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isSidebarOpen]);

  return (
    <div className="h-screen flex justify-center items-center relative">
      <button
        className="bg-slate-500 text-white px-4 py-2 rounded"
        onClick={toggleSidebar}
      >
        Save segment
      </button>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"></div>
      )}

      <SidebarForm
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      // sidebarRef={sidebarRef}
      />
      <ToastNotifications />
    </div>
  );
}

export default App;
