import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {signIn, auth, handleLogout } from "./firebase"

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        user ? setIsSignedIn(true) : setIsSignedIn(false);
        });
        
        return unsubscribe;
    }, []);

    return (
        <>
            <div className="bg-gray-900 text-white flex flex-col items-center p-8 space-y-4">
                <h1 className="text-4xl font-bold mb-8">Tabby - Guitar Tab Editor</h1>
                    <div className="flex space-x-2">
                        <Link to="/free-guitar-tab-editor" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Editor</Link>
                        <Link to="/free-guitar-tab-editor/tabs" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Tabs</Link>
                        {!isSignedIn && <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg" onClick={signIn}>Sign In!</button>}
                        {isSignedIn && 
                            <div className="flex space-x-4">
                            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg" onClick={handleLogout}>Sign Out!</button>
                            <p>Signed in as: {auth.currentUser.email}</p>
                            </div>}
                    </div>
            </div>
        </>
    )
}

export default Header;