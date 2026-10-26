import { useContext } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../context/UserContext";

function Navbar() {
  // Lấy dữ liệu từ Context
  const user = useContext(UserContext);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#38bdf8" : "white",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
  });

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "16px",
        backgroundColor: "#242424",
        alignItems: "center",
      }}
    >
      <NavLink to="/" end style={linkStyle}>
        Home
      </NavLink>

      <NavLink to="/users" style={linkStyle}>
        Users
      </NavLink>

      <NavLink to="/about" style={linkStyle}>
        About
      </NavLink>

      <span style={{ color: "white", marginLeft: "auto" }}>
        Hello, {user.name}
      </span>
    </nav>
  );
}

export default Navbar;
