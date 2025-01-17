import '../../css/login.css';
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
// import checkGuest from "./checkguest";
import { useSelector } from "react-redux";

function Login() {
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
  
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/api/login', {
            username: username,
            password: password
        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response=>{
            setErrorMessage('')
            var user = {
                username: username,
                token: response.data.token
            }
            dispatch(setUser(user));
            navigate("/listcriminals");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            } else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mb-4 text-center mt-5">Login</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="username">username:</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={(event)=>setUsername(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary btn-block" onClick={attemptLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
