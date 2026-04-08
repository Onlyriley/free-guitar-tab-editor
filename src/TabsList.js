import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import app, { signIn, auth, handleLogout } from "./firebase";

const db = getFirestore(app);
const colRef = collection(db, "tabs");

function TabsList() {
    const [publicTabs, setPublicTabs] = useState([]);
    const [likedTabs, setLikedTabs] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
            setPublicTabs([]);
            setLikedTabs([]);
        }
        });
        
        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                // Fetch all tabs
                const querySnapshot = await getDocs(colRef);
                const tabData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                    likesCount: doc.data().likes?.length - 1 || 0,
                }));
                tabData.sort((a, b) => b.likesCount - a.likesCount);
                setPublicTabs(tabData);

                // Fetch liked tabs
                const likedDocRefs = auth.currentUser ? query(colRef, where("likes", "array-contains", auth.currentUser.uid)) : [];
                const likedQuerySnapshot = await getDocs(likedDocRefs);
                const likedTabData = likedQuerySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                    likesCount: doc.data().likes?.length - 1 || 0,
                }));
                setLikedTabs(likedTabData);
            } catch (error) {
                console.error("Error fetching tabs:", error);
                setPublicTabs([]);
                setLikedTabs([]);
            }
        };
        if (isSignedIn) fetchTabs();
    }, [isSignedIn]);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8 space-y-4">
            {!isSignedIn && <h2 className="text-4xl font-bold mb-8 text-red-600">Sign in to view tabs</h2>}
            <h1 className="text-4xl font-bold mb-8">Liked Tabs</h1>
            <div className="mt-8 w-full max-w-screen-lg space-x-4 flex">
                <table className="table-auto w-full border-collapse border border-gray-600 border-spacing-y-4">
                    <thead className="space-y-4">
                        <tr>
                            <th className="border border-slate-300 p-2 text-left">Title</th>
                            <th className="border border-slate-300 p-2 text-left">Artist</th>
                            <th className="border border-slate-300 p-2 text-left">Creator</th>
                            <th className="border border-slate-300 p-2 text-left">Likes</th>
                        </tr>
                    </thead>

                    <tbody className="border-spacing-y-4">

                    {likedTabs.map(item => (
                        <tr className="space-y-4 p-2" key={item.id}>
                            <td><Link to={`/free-guitar-tab-editor/tabs/${item.id}`}>{item.title}</Link></td>
                            <td><Link to={`/free-guitar-tab-editor/tabs/${item.id}`}>{item.artist}</Link></td>
                            <td><Link to={`/free-guitar-tab-editor/tabs/${item.id}`}>{item.username}</Link></td>
                            <td>{item.likesCount}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <h1 className="text-4xl font-bold mb-8">User Uploaded Tabs</h1>
            <div className="mt-8 w-full max-w-screen-lg space-x-4 flex">

                <table className="table-auto w-full border-collapse border border-gray-600 border-spacing-y-4">

                    <thead className="space-y-4">
                        <tr>
                            <th className="border border-slate-300 p-2 text-left">Title</th>
                            <th className="border border-slate-300 p-2 text-left">Artist</th>
                            <th className="border border-slate-300 p-2 text-left">Creator</th>
                            <th className="border border-slate-300 p-2 text-left">Likes</th>
                        </tr>
                    </thead>

                    <tbody className="border-spacing-y-4">

                    {publicTabs.map(item => (
                        <tr className="space-y-4 p-2" key={item.id}>
                            <td><Link to={`/free-guitar-tab-editor/tabs/${item.id}`}>{item.title}</Link></td>
                            <td><Link to={`/free-guitar-tab-editor/tabs/${item.id}`}>{item.artist}</Link></td>
                            <td><Link to={`/free-guitar-tab-editor/tabs/${item.id}`}>{item.username}</Link></td>
                            <td>{item.likesCount}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TabsList;