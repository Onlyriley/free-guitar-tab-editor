import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TabView() {
  const { tabId } = useParams(); // Get the unique ID from the URL
  const [tabText, setTabText] = useState("");

  useEffect(() => {
    // Fetch the tab text from localStorage (or from an API if you're using one)
    const savedTab = localStorage.getItem(tabId);
    if (savedTab) {
      setTabText(savedTab);
    } else {
      alert("Tab not found!");
    }
  }, [tabId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Tab Preview</h1>
      <pre
        className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg border border-gray-700"
        style={{
          whiteSpace: "pre",
          wordWrap: "normal",
          maxHeight: "400px", // Adjusted for larger preview area
          fontSize: "14px", // Adjust the font size to fit better
        }}
      >
        {tabText}
      </pre>
    </div>
  );
}

export default TabView;
