import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/store/connectionSlice";
import User from "./cards/User";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();

  const loadConnctions = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadConnctions();
  }, []);

  return (
    <div>
      {connections?.length ? (
        <div className="flex flex-wrap gap-5">
          {connections.map((user) => (
            <User key={user._id} user={user} showButtons={false} />
          ))}
        </div>
      ) : (
        <div>No Connections</div>
      )}
    </div>
  );
};

export default Connections;
