import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";

export default function RoomStandby() {
  const location = useLocation();
  const roomId = location.state?.roomId; // 前の画面から roomId を受け取る
  console.log("roomId: " + roomId);

  useEffect(() => {
    let lobbyStompClient = null;
    if (!lobbyStompClient) {
      // 初回接続先
      lobbyStompClient = Stomp.over(() => new SockJS("http://localhost:8080/lobby-websocket"));
      lobbyStompClient.connect({ 
        userId: "myUserId",
        roomId: roomId
      }, () => {
        console.log("Connected to WebSocket");

        lobbyStompClient.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message.body);
        })
      })
    }
  }, [])

  return(
    <>
      <div>スタンバイ画面です</div>
      <div>部屋ID: {roomId}</div>
    </>
  )
}
