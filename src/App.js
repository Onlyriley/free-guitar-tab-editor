import TabEditor from "./TabEditor"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TabView } from "./TabView"
import TabsList from "./TabsList"
import Header from "./Header"


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/free-guitar-tab-editor" element={<TabEditor />}/>
        <Route path="/free-guitar-tab-editor/tabs/:id" element={<TabView/>}/>
        <Route path="/free-guitar-tab-editor/tabs" element={<TabsList />}/>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;