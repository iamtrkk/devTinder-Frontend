import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/store/connectionSlice";
import User from "./cards/user";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log(connections);

  const loadConnctions = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadConnctions();
  }, []);

  return (
    <div className="flex flex-wrap gap-5">
      {connections?.map((user) => (
        <User key={user._id} user={user} showButtons={false} />
      ))}
    </div>
  );
};

export default Connections;
