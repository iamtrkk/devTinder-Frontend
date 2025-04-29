import io from "socket.io-client";
import { BASE_URL } from "./const";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") return io(BASE_URL);
  //Bcz socket opens default on path /socket.io and our backend is deployed on path /api
  // so we need to provide path to open socket which backend can listen
  else return io("/", { path: "/api/socket.io" });
};
