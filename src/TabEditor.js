import React, { useState } from "react";

function TabEditor() {
  const [tabText, setTabText] = useState("");

  const handleClear = () => setTabText("");

  // Save the tab to local storage
  const saveTab = () => {
    localStorage.setItem("savedTab", tabText);
    alert("Tab saved!");
  };

  // Load the saved tab from local storage
  const loadTab = () => {
    const savedTab = localStorage.getItem("savedTab");
    if (savedTab) {
      setTabText(savedTab);
      alert("Tab loaded!");
    } else {
      alert("No saved tab found.");
    }
  };

  // Insert a template with longer measures
  const insertTemplate = () => {
    const template = `e|--------------------|--------------------|--------------------|--------------------|
B|--------------------|--------------------|--------------------|--------------------|
G|--------------------|--------------------|--------------------|--------------------|
D|--------------------|--------------------|--------------------|--------------------|
A|--------------------|--------------------|--------------------|--------------------|
E|--------------------|--------------------|--------------------|--------------------|`;
    setTabText((prevTab) => prevTab + "\n" + template + "\n");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Tabby - Guitar Tab Editor</h1>
      <textarea
        className="w-full max-w-2xl h-96 p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Type your guitar tab here..."
        value={tabText}
        onChange={(e) => setTabText(e.target.value)}
      />
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          onClick={saveTab}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          onClick={loadTab}
        >
          Load
        </button>
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
          onClick={insertTemplate}
        >
          Insert Template
        </button>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Tab Preview</h2>
        <pre
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-auto"
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
      <p>
        Created by Riley Simmons.
      </p>
    </div>
  );
}

export default TabEditor;
