/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/const";
import axios from "axios";
import { addUser } from "../utils/store/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) navigate("/login");
      console.error(err.message);
    }
  };

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) alert("For best experience please open as desktop site");
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 w-full  shadow-md z-50">
        <Header />
      </div>
      <div className="flex-1 overflow-auto mt-24 mb-20 px-52">
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full bg-white shadow-md z-50">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
