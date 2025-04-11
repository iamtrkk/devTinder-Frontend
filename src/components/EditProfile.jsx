import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import User from "./cards/User";

const EditProfile = ({ user }) => {
  const [userData, setUserData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?.age,
    gender: user?.gender,
    about: user?.about,
    photoUrl: user?.photoUrl,
    skills: user?.skills,
  });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      setError("");
      const res = await axios.patch(`${BASE_URL}/user/${user._id}`, userData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-10">
        <div className="flex justify-center my-10">
          <div className="card w-96 bg-base-300 card-md shadow-xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  type="text"
                  className="input"
                />
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  type="text"
                  className="input"
                />
                <legend className="fieldset-legend">Photo URL:</legend>
                <input
                  value={userData.photoUrl}
                  onChange={(e) =>
                    setUserData({ ...userData, photoUrl: e.target.value })
                  }
                  type="text"
                  className="input"
                />
                <legend className="fieldset-legend">Age:</legend>
                <input
                  value={userData.age}
                  onChange={(e) =>
                    setUserData({ ...userData, age: e.target.value })
                  }
                  type="text"
                  className="input"
                />
                <legend className="fieldset-legend">Gender: male | female</legend>
                <input
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  type="text"
                  className="input"
                />
                <legend className="fieldset-legend">About:</legend>
                <input
                  value={userData.about}
                  onChange={(e) =>
                    setUserData({ ...userData, about: e.target.value })
                  }
                  type="text"
                  className="input"
                />

                <p className="text-red-500">{error}</p>
              </fieldset>
              <div className="justify-center card-actions">
                <button onClick={handleSave} className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <User user={userData} />
        </div>
      </div>
      <div hidden={!showToast} className="toast toast-top toast-center">
        <div className="alert alert-info">
          <span>New mail arrived.</span>
        </div>
        <div className="alert alert-success">
          <span>Details Saved Successfully</span>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
