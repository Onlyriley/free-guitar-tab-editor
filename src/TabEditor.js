import React, { useState } from "react";

function TabEditor() {
  const [tabText, setTabText] = useState("");
  const [previewFontSize, setPreviewFontSize] = useState(16); // Default font size
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const [tuning, setTuning] = useState(["e", "B", "G", "D", "A", "E"]); // Default tuning

  const handleClear = () => setTabText("");

  const saveTab = () => {
    localStorage.setItem("savedTab", tabText);
    alert("Tab saved!");
  };

  const loadTab = () => {
    const savedTab = localStorage.getItem("savedTab");
    if (savedTab) {
      setTabText(savedTab);
      alert("Tab loaded!");
    } else {
      alert("No saved tab found.");
    }
  };

  const insertTemplate = () => {
    const template = tuning
      .map((string) => `${string}|--------------------|--------------------|--------------------|--------------------|`)
      .join("\n");
    setTabText((prevTab) => prevTab + "\n" + template + "\n");
  };

  const downloadTab = () => {
    const blob = new Blob([tabText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "guitar_tab.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const increaseFontSize = () => setPreviewFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () =>
    setPreviewFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));

  const openTuningModal = () => setIsTuningModalOpen(true);
  const closeTuningModal = () => setIsTuningModalOpen(false);

  const updateTuning = (newTuning) => {
    setTuning(newTuning);
    closeTuningModal();
    alert("Tuning updated!");
  };

  const buyCoffee = () => {
    window.open("https://buymeacoffee.com/onlyriley", "_blank", "noopener,noreferrer");
  };


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
          <button
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            onClick={openTuningModal}
          >
            Change Tuning
          </button>
          <button
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            onClick={buyCoffee}
          >
            Buy Me a Coffee ☕
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

      {/* Tuning Modal */}
      {isTuningModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Change Tuning</h3>
            {tuning.map((string, index) => (
              <div key={index} className="flex items-center mb-2">
                <label className="mr-4">{`String ${6 - index}:`}</label>
                <input
                  type="text"
                  value={string}
                  maxLength={2}
                  className="w-16 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
                  onChange={(e) => {
                    const updatedTuning = [...tuning];
                    updatedTuning[index] = e.target.value;
                    setTuning(updatedTuning);
                  }}
                />
              </div>
            ))}
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                onClick={closeTuningModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                onClick={() => updateTuning(tuning)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 text-sm text-gray-500 text-center">
        Created by Riley Simmons. <br />
        <a href="https://github.com/Onlyriley/free-guitar-tab-editor">Github (contibutions, issues)</a>
      </footer>
    </div>
  );
}

export default TabEditor;
