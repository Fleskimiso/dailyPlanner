import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { userSlice } from "../store/slices/userSlice";
import { registerUserThunk } from "../store/thunks/RegisterUserThunk";

const SignupPage = () =>{
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    //password2 - retyped password
    const [password2,setpassword2] = useState("");
    const navigate = useNavigate();

    const dispatch = useAppDispatch();


    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(password !== password2){
            dispatch(userSlice.actions.setError("Password do not match"));
        }else {
            dispatch(registerUserThunk({
                username: username,
                password: password
            })).then(resp =>{
                navigate("/");
            }).catch(e =>{
                dispatch(userSlice.actions.setError(e.message));
            })
        }
    }

    return <div className="mt-5 d-flex flex-row justify-content-center">
        <div className="card col-sm-6 col-md-4 col-xl-3" >
            <div className="card-body">
                <h5 className="card-title text-center">Login Form</h5>
                <form>
                    <div className="form-group my-2">
                        <label className="mb-1" htmlFor="username">Username</label>
                        <input type="text"
                        onChange={(e) =>{setUsername(e.target.value)}}
                            value={username}
                            className="form-control"
                            id="username"
                            name="username"
                            aria-describedby="usernameHelp"
                            placeholder="Enter username" />
                        <small id="emailHelp" className="form-text text-muted">Provide your username</small>
                    </div>
                    <div className="form-group my-2">
                        <label className="mb-1" htmlFor="passwrod">Password</label>
                        <input
                        onChange={(e) =>{setpassword(e.target.value)}}
                            value={password}
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password" />
                    </div>
                    <div className="form-group my-2">
                        <label className="mb-1" htmlFor="passwrod2">Retype password</label>
                        <input
                        onChange={(e) =>{setpassword2(e.target.value)}}
                            value={password2}
                            type="password"
                            name="password2"
                            className="form-control"
                            id="passwrod"
                            placeholder="Password" />
                    </div>

                    <div className="d-flex flex-row justify-content-center">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}
export default SignupPage