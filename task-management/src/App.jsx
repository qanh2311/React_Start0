import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import AboutMe from "./components/pages/AboutMe";
import IDK from "./components/pages/IDK";
import FooterPage from "./components/layout/FooterPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/idk" element={<IDK />} />
      </Routes>
      <FooterPage/>
    </BrowserRouter>
  );
}

export default App;
