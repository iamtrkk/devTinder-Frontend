import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/const";
import { addRequests } from "../utils/store/requestSlice";
import User from "./cards/User";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const navigate = useNavigate();

  const loadRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleRequestReview = async (reqId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${reqId}`,
        {},
        { withCredentials: true }
      );
      loadRequests();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      {requests?.length ? (
        <div className="flex flex-wrap gap-5">
          {requests?.map((user) => (
            <User
              key={user._id}
              user={user.fromUserId}
              showButtons={true}
              namePrimary={"Accept"}
              primaryAction={() => handleRequestReview(user._id, "accepted")}
              nameSeconday={"Ignore"}
              secondaryAction={() => handleRequestReview(user._id, "rejected")}
            />
          ))}
        </div>
      ) : (
        <div>No Requests</div>
      )}
    </div>
  );
};

export default Requests;
