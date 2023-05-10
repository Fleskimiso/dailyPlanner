import { useAppDispatch, useAppSelector } from "../store/hooks";
import {Link, useNavigate} from "react-router-dom"
import { logoutUserThunk } from "../store/thunks/LogoutUserThunk";
const Navbar = () => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.user.isLogged);

    const logout = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.preventDefault();
        dispatch(logoutUserThunk()).then((resp) =>{
            if(resp.payload === "Ok"){
                navigate("/");
            }
        });
    }

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
                                <div className="nav-link" onClick={logout} >Logout</div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;