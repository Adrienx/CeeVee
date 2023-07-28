import { NavLink } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/GenerateDocument"> Generate Documents</NavLink>
        </li>
        <li>
          <NavLink to="/Documents"> Documents </NavLink>
        </li>
        <li>
          <NavLink to="/UserProfile"> User Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
