import { useParams, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import app from "./firebase";

const db = getFirestore(app);
const colRef = collection(db, "tabs");

function TabView() {
    const [currentTab, setCurrentTab] = useState(null);
    const { id } = useParams();

    const increaseFontSize = () => setPreviewFontSize((prevSize) => prevSize + 2);
    const decreaseFontSize = () =>
    setPreviewFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));
    const [previewFontSize, setPreviewFontSize] = useState(16); // Default font size
    useEffect(() => {
        const fetchTabById = async () => {
            try {
                const tabDocRef = doc(colRef, id);
                const tabSnap = await getDoc(tabDocRef);
                if (tabSnap.exists()) {
                    const tabData = { ...tabSnap.data(), id: tabSnap.id };
                    setCurrentTab(tabData);
                } else {
                    console.log("No such document!");
                    setCurrentTab(null);
                }
            } catch (error) {
                console.error("Error fetching tab:", error);
                setCurrentTab(null);
            }
        };

        fetchTabById();
    }, [id, colRef]);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
            <Link to="/" className="text-4xl font-bold mb-8">Tabby - Guitar Tab Editor</Link>
            {currentTab ? (
                <div>
                    <h2 className="text-2xl font-bold mb-8">{currentTab.title} by {currentTab.artist}</h2>
                    <div className="flex-row">
                        <p className="text-1xl font-normal mb-8">{currentTab.description}</p>
                        <p className="text-1xl font-normal mb-8">By: {currentTab.username}</p>
                    </div>
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
                    <div className="w-full max-w-screen-lg">
                                  <div className="flex space-x-2">
                </div>
                    <pre
                        className="w-full bg-gray-800 p-4 resize-x rounded-lg border border-gray-700 overflow-auto font-mono"
                        style={{
                            whiteSpace: "pre",
                            wordWrap: "normal",
                            maxHeight: "4000px",
                            fontSize: `${previewFontSize}px`,
                        }}
                    >
                    {currentTab.content}
                    </pre>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Loading...</p>
                    {currentTab === null && <p>No such document!</p>}
                </div>
            )}
        </div>
    );
}

export { TabView };