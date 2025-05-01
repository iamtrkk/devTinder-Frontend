import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/const";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const loggedInUser = user?._id;

  //as soon as page loads the socket connection is made and join chat event is emitted
  useEffect(() => {
    if (!targetUserId) return;

    const socket = createSocketConnection();
    //crating event and passing logged in user id and friends user id to chat with
    // backend will listen to this event and will call the join chat handler
    socket.emit("joinChat", {
      loggedInUser,
      targetUserId,
      firstName: user?.firstName,
    });

    // Now we will listen to the messageReceived event from backend to get the message sent from users
    socket.on("messageReceived", ({ firstName, text, loggedInUser }) => {
      console.log(loggedInUser, firstName + " : " + text);
      const msg = {
        senderId: {
          _id: loggedInUser,
          firstName: firstName,
        },
        text,
      };
      setMessages((prev) => [...prev, msg]);
    });

    //closing socket on unmount
    return () => {
      socket.disconnect();
    };
  }, [targetUserId, loggedInUser]);

  useEffect(() => {
    loadMessages();
  }, []);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      //emitting send message event to catch at backend display it to other user in room
      //We can isten to the same event at backend and pass call back function to perform action on this event
      //and we can receive same object there we are sending from here
      firstName: user.firstName,
      targetUserId,
      loggedInUser,
      text: newMessage,
    });
    setNewMessage("");
  };

  const loadMessages = async () => {
    const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    setMessages(res.data.messages);
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-scroll p-5">
        {messages?.map((msg, i) => {
          return (
            <div
              key={i}
              className={
                targetUserId === msg.senderId._id
                  ? "chat chat-start"
                  : "chat chat-end"
              }
            >
              <div className="chat-header">
                {msg.senderId.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="'flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
