import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";
import User from "./cards/user";

const Feed = ({ user }) => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const loadFeed = async () => {
    try {
      const respone = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(respone.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="flex flex-wrap gap-5">
      {feed?.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Feed;
