import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";

export default function RoomStandby() {
  const location = useLocation();
  const roomId = location.state?.roomId; // 前の画面から roomId を受け取る
  console.log("roomId: " + roomId);
  return(
    <>
      <div>スタンバイ画面です</div>
      <div>部屋ID: {roomId}</div>
    </>
  )
}
