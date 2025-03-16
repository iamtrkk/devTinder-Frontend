import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/store/userSlice";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [emailId, setEmailId] = useState("trk@trk.com");
  const [password, setPassword] = useState("Admin@#1234");
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
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-300 card-md shadow-xl">
        <div className="card-body">
          <fieldset className="fieldset">
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
              type="text"
              className="input"
            />
          </fieldset>
          <div className="justify-center card-actions">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
