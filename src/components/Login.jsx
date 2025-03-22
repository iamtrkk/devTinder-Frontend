import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/store/userSlice";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [emailId, setEmailId] = useState("trk@trk.com");
  const [password, setPassword] = useState("Admin@#1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true } // required to store cookies and send back in other API calls, also set in backend in cors config
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      console.error(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const respone = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(respone.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-300 card-md shadow-xl">
        <div className="card-body">
          <fieldset className="fieldset">
            {!isLogin && (
              <>
                <legend className="fieldset-legend">First Name</legend>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input"
                />
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="input"
                />
              </>
            )}
            <legend className="fieldset-legend">Email</legend>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              type="text"
              className="input"
            />
            <legend className="fieldset-legend">Password</legend>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="input"
            />
            <p className="text-red-500">{error}</p>
          </fieldset>
          <div className="justify-center card-actions">
            <button
              onClick={isLogin ? handleLogin : handleSignUp}
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
          <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
            {!isLogin ? "Existing User? Login Here" : "New User? Sign up here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
