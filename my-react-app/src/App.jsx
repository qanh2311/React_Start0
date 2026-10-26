import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { UserContext } from "./context/UserContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";

function App() {
  const [user, setUser] = useState({
    name: "Quynh Anh",
    role: "Frontend Developer",
  });

  const changeUser = () => {
    setUser({
      name: "Min",
      role: "Backend Developer",
    });
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />

        <button onClick={changeUser}>Change User</button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
