import { useAppSelector } from "../store/hooks";

const Navbar = () => {

    const isLoggedIn = useAppSelector(state => state.user.isLogged);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-flex flex-row">
                <a className="navbar-brand" href="#">Planner</a>

                <div className="" id="navbarNavDropdown">
                    <ul className="navbar-nav d-flex flex-row ">
                        {!isLoggedIn && <li className="nav-item mx-2">
                            <a className="nav-link" aria-current="page" href="/login">Login</a>
                        </li>}
                        {!isLoggedIn &&
                            <li className="nav-item mx-2">
                                <a className="nav-link" href="/signup">SignUp</a>
                            </li>}
                        {
                            isLoggedIn && <li className="nav-item mx-2">
                                <a className="nav-link" href="/plan">Create Plan</a>
                            </li>
                        }
                        {
                            isLoggedIn && <li className="nav-item mx-2">
                                {/* should logout on click */}
                                <a className="nav-link" href="/logout">Logout</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;