import React, { useState } from "react";

function TabEditor() {
  const [tabText, setTabText] = useState("");
  const [previewFontSize, setPreviewFontSize] = useState(16); // Default font size

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

  // Download tab as a text file
  const downloadTab = () => {
    const blob = new Blob([tabText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = "guitar_tab.txt"; // The default filename
    a.click();

    // Revoke the object URL to free memory
    URL.revokeObjectURL(url);
  };

  // Increase font size
  const increaseFontSize = () => setPreviewFontSize((prevSize) => prevSize + 2);

  // Decrease font size (minimum of 10px for readability)
  const decreaseFontSize = () =>
    setPreviewFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Tabby - Guitar Tab Editor</h1>
      <div className="w-full max-w-screen-lg">
        {/* Tab Editor */}
        <textarea
          className="w-full h-72 p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-lg"
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
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            onClick={downloadTab}
          >
            Download
          </button>
        </div>
      </div>
      {/* Tab Preview */}
      <div className="mt-8 w-full max-w-screen-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">Tab Preview</h2>
          <div className="flex space-x-2">
            <button
              className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              onClick={increaseFontSize}
            >
              +
            </button>
            <button
              className="px-2 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg"
              onClick={decreaseFontSize}
            >
              -
            </button>
          </div>
        </div>
        <pre
          className="w-full bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-auto font-mono"
          style={{
            whiteSpace: "pre",
            wordWrap: "normal",
            maxHeight: "4000px",
            fontSize: `${previewFontSize}px`,
          }}
        >
          {tabText}
        </pre>
      </div>
      <footer className="mt-8 text-sm text-gray-500">
        Created by Riley Simmons.
      </footer>
    </div>
  );
}

export default TabEditor;
