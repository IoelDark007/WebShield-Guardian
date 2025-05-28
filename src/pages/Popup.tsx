import React, { useEffect, useState } from "react";
import saeftyIcon from "../assets/images/safety-icon-128.png";

const Popup: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [totalWebCount, setTotalWebCount] = useState(0);
  const [flaggedWebCount, setFlaggedWebCount] = useState(0);

  useEffect(() => {
    if (chrome.runtime?.sendMessage) {
      // Get initial state
      chrome.runtime.sendMessage({ action: "getState" }, (response) => {
        if (!chrome.runtime.lastError && response?.isActive !== undefined) {
          setIsActive(response.isActive);
        }
      });

      // Set up count updates
      const intervalId = setInterval(() => {
        chrome.runtime.sendMessage({ action: "getCounts" }, (response) => {
          if (response?.total !== undefined && response?.flagged !== undefined) {
            setTotalWebCount(response.total);
            setFlaggedWebCount(response.flagged);
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const toggleExtension = () => {
    chrome.runtime?.sendMessage({ action: isActive ? "deactivate" : "activate" }, () => {
      setIsActive(!isActive);
    });
  };

  return (
    <div className="relative flex flex-col items-center bg-gradient-to-b from-dark-green to-green-900 text-neon-green w-[400px] p-5">
      {/* Header with glowing icon */}
      <div className="flex flex-col items-center w-full mb-5">
        <div className="relative mb-3">
          <img 
            src={saeftyIcon} 
            alt="Shield Logo" 
            className={`h-14 w-14 transition-all duration-300 ${isActive ? "filter drop-shadow-glow" : "opacity-90"}`}
          />
          {isActive && (
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          )}
        </div>
        <h1 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-100">
          WebShield Guardian
        </h1>
        <p className="text-xs text-green-400 text-center mt-1.5">
          Real-time phishing protection
        </p>
      </div>

      {/* Status toggle with better visual feedback */}
      <button
        onClick={toggleExtension}
        className={`w-full py-2.5 mb-5 rounded-lg font-medium text-white transition-all duration-200 ${
          isActive 
            ? "bg-gradient-to-r from-green-600 to-green-700 shadow-md shadow-green-900/50 hover:shadow-green-900/70" 
            : "bg-gradient-to-r from-dark-green to-green-900 border-2 border-red-500/60 hover:border-red-400/80"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {isActive ? (
            <>
              <span className="text-lg">🛡️</span>
              <span>Active Protection</span>
            </>
          ) : (
            <>
              <span className="text-lg">⚠️</span>
              <span>Click to Activate</span>
            </>
          )}
        </div>
      </button>

      {/* Stats with animated numbers */}
      <div className="w-full bg-green-900/40 rounded-xl p-4 mb-5 border border-green-800/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-green-800/30">
          <span className="text-sm font-medium text-green-300">Sites Scanned</span>
          <span className="font-mono font-bold text-green-100">
            {totalWebCount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-red-300">Threats Blocked</span>
          <span className="font-mono font-bold text-red-300 animate-pulse">
            {flaggedWebCount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer with version */}
      <div className="text-[0.65rem] text-green-600 text-center mt-auto pt-3">
        <div>© {new Date().getFullYear()} James Nii Kotei-Sass & Ioel Nii Amu Darkoh</div>
        <div className="text-green-700 mt-0.5">v1.0.0</div>
      </div>
    </div>
  );
};

export default Popup;