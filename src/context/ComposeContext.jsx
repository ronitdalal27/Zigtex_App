


// // src/context/ComposeContext.jsx
// import { createContext, useContext, useState } from "react";

// const ComposeContext = createContext();

// export const ComposeProvider = ({ children }) => {
//   const [composeWindows, setComposeWindows] = useState([]); // array of windows

//   // Open a new compose window
//   const openCompose = () => {
//     const id = Date.now(); // unique id for each window
//     setComposeWindows((prev) => [...prev, { id }]);
//   };

//   // Close a compose window
//     const closeCompose = (id) => {
//     setComposeWindows((prev) => prev.filter((_, index) => index !== id));
//     };


//   return (
//     <ComposeContext.Provider value={{ composeWindows, openCompose, closeCompose }}>
//       {children}
//     </ComposeContext.Provider>
//   );
// };

// // Hook to use context
// export const useCompose = () => useContext(ComposeContext);


// src/context/ComposeContext.jsx
import { createContext, useContext, useState } from "react";

const ComposeContext = createContext();

export const ComposeProvider = ({ children }) => {
  const [composePopups, setComposePopups] = useState([]);

  const openCompose = () => {
    // Check if last popup is minimized and open a new one
    const last = composePopups[composePopups.length - 1];
    const newId = Date.now(); // simple unique id
    setComposePopups([...composePopups, { id: newId, viewMode: "default" }]);
  };

  const closeCompose = (id) => {
    setComposePopups(composePopups.filter((popup) => popup.id !== id));
  };

  const updateViewMode = (id, mode) => {
    setComposePopups((prev) =>
      prev.map((popup) => (popup.id === id ? { ...popup, viewMode: mode } : popup))
    );
  };

  return (
    <ComposeContext.Provider
      value={{ composePopups, openCompose, closeCompose, updateViewMode }}
    >
      {children}
    </ComposeContext.Provider>
  );
};

export const useCompose = () => useContext(ComposeContext);
