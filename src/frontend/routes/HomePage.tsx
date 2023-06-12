import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks"

const HomePage = () => {


    const isLoggedIn = useAppSelector(state => state.user.isLogged);

    return <div className="container d-flex flex-md-row flex-column justify-content-evenly">
        {isLoggedIn === true ? <div className="text-center mt-2">
            <div className="text-bold h5">Your plan for today</div>
        </div> : ""
        }
        {isLoggedIn === true ? <div className="mt-md-2 mt-4 text-center" >
            <div className="text-bold h5">
                Your goals for today
            </div>
        </div> : ""}

        {isLoggedIn === false ? <div className="mt-md-2 mt-4 text-center">
            <div className="text-bold h5" > Login to use the app  </div>
            <div>
                <Link  to={"/login"}>Login</Link>
            </div>
        </div> : ""}

    </div>
}
export default HomePage