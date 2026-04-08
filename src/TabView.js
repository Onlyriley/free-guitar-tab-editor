import { useParams, Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import app, { auth } from "./firebase";

const db = getFirestore(app);
const colRef = collection(db, "tabs");

function TabView() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [previewFontSize, setPreviewFontSize] = useState(16);

  const increaseFontSize = () => setPreviewFontSize((prev) => prev + 2);
  const decreaseFontSize = () =>
    setPreviewFontSize((prev) => (prev > 10 ? prev - 2 : prev));
  
  useEffect(() => {
    const fetchTabById = async () => {
      try {
        const tabDocRef = doc(colRef, id);
        const tabSnap = await getDoc(tabDocRef);

        if (tabSnap.exists()) {
          const tabData = { ...tabSnap.data(), id: tabSnap.id };
          setCurrentTab(tabData);

          // Check if user liked tab and update state
          const liked = await checkIfUserLikedTab(tabData.id);
          setIsLiked(liked);
        } else {
          console.log("No such document!");
          setCurrentTab(null);
        }
      } catch (error) {
        console.error("Error fetching tab:", error);
        setCurrentTab(null);
      }
    };

    if (id) {
      fetchTabById();
    }
  }, [id]);

  const checkIfUserLikedTab = async (tabId) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const tabRef = doc(db, "tabs", tabId);
      const tabDoc = await getDoc(tabRef);

      if (tabDoc.exists()) {
        const likes = tabDoc.data().likes || [];
        return likes.includes(user.uid);
      }
      return false;
    } catch (error) {
      console.error("Error checking like status:", error);
      return false;
    }
  };

  const toggleLike = async (tabId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn("No authenticated user");
        return;
      }

      if (typeof user.uid !== "string") {
        console.error("Invalid user.uid type", user.uid);
        return;
      }

      const tabRef = doc(db, "tabs", tabId);
      const tabDoc = await getDoc(tabRef);
      if (!tabDoc.exists()) {
        console.error("Tab does not exist");
        return;
      }

      const currentLikes = tabDoc.data().likes || [];
      const liked = currentLikes.includes(user.uid);

      if (liked) {
        await updateDoc(tabRef, {
          likes: arrayRemove(user.uid),
        });
        setIsLiked(false);
      } else {
        await updateDoc(tabRef, {
          likes: arrayUnion(user.uid),
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8 space-y-8">
      {currentTab ? (
        <div className="w-full">
          <div>
            <h2 className="text-2xl font-bold mb-8">
              {currentTab.title} by {currentTab.artist}
            </h2>

            <div className="flex-row">
              <p className="text-1xl font-normal mb-8">{currentTab.description}</p>
              <p className="text-1xl font-normal mb-8">By: {currentTab.username}</p>
            </div>

            <button
              className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg mr-2"
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

            <div className="w-full max-w-screen-lg mt-4">
              <div className="flex space-x-2 mb-4">
                <button
                  className={`px-4 py-2 text-white rounded-lg ${
                    isLiked ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => toggleLike(currentTab.id)}
                >
                  {isLiked ? "Unlike" : "Like"}
                </button>
              </div>
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
