import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice.js";
import User from "./cards/user";

const Feed = () => {
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

  const handleSendRequest = async (userId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      loadFeed();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!feed.length) return <div>No user available</div>;

  const user = feed[0];

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      <User
        key={user._id}
        user={user}
        showButtons={true}
        namePrimary={"Interested"}
        primaryAction={() => handleSendRequest(user._id, "interested")}
        nameSeconday={"Ignore"}
        secondaryAction={() => handleSendRequest(user._id, "ignored")}
      />
    </div>
  );
};

export default Feed;
