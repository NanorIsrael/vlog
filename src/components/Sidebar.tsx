import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className="text-6xl text-white hover:text-gray-200">Feed</NavLink>
        </li>
        <li>
          <NavLink to="/explore">Explore</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}
