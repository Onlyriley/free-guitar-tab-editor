import TabEditor from "./TabEditor"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TabView } from "./TabView"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/free-guitar-tab-editor" element={<TabEditor />}/>
        <Route path="/tabs/:id" element={<TabView/>}/>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;