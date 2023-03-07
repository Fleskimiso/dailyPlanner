import { useAppSelector } from "../store/hooks";
import {Link} from "react-router-dom"
const Navbar = () => {

    const isLoggedIn = useAppSelector(state => state.user.isLogged);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" 
        style={{marginLeft: "-10px",marginRight: "-10px" }} >
            <div className="container-fluid d-flex flex-row">
                <a className="navbar-brand" href="#">Planner</a>

                <div className="" id="navbarNavDropdown">
                    <ul className="navbar-nav d-flex flex-row ">
                        {!isLoggedIn && <li className="nav-item mx-2">
                            <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                        </li>}
                        {!isLoggedIn &&
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/signup">SignUp</Link>
                            </li>}
                        {
                            isLoggedIn && <li className="nav-item mx-2">
                                <Link className="nav-link" to="/plan">Create Plan</Link>
                            </li>
                        }
                        {
                            isLoggedIn && <li className="nav-item mx-2">
                                {/* should logout on click */}
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;