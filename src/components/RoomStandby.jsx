import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";

export default function RoomStandby() {
  const location = useLocation();
  const roomId = location.state?.roomId; // 前の画面から roomId を受け取る
  const token = localStorage.getItem("jwt"); // ログインで取得したトークン

  // プレイヤー情報を格納するためのstate
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let lobbyStompClient = null;
    if (!lobbyStompClient) {
      // 初回接続先
      lobbyStompClient = Stomp.over(() => new SockJS("http://localhost:8080/lobby-websocket"));
      lobbyStompClient.connect({ 
        Authorization: `Bearer ${token}`,
        roomId: roomId
      }, () => {
        console.log("Connected to WebSocket");

        lobbyStompClient.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message.body);
          const playerData = JSON.parse(message.body);
          setPlayers(playerData);
        })
      })
    }
  }, [roomId, token])

  return(
    <>
      <div>スタンバイ画面です</div>
      <div>部屋ID: {roomId}</div>
      <div>プレイヤーリスト:</div>
      <ul>
        {players.map((player) => (
          <li key={player.sessionId}>
            <strong>名前:</strong> {player.userName} | <strong>ID:</strong> {player.userId}
          </li>
        ))}
      </ul>
    </>
  )
}
