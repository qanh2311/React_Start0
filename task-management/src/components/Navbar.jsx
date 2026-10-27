import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Task Manager
        </NavLink>

        <div className="navbar-nav">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

          <NavLink className="nav-link" to="/about">
            About Me
          </NavLink>

          <NavLink className="nav-link" to="/idk">
            IDK
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
