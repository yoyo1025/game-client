import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import "../Room.css";

export default function RoomStandby() {
  const location = useLocation();
  const roomId = location.state?.roomId; // 前の画面から roomId を受け取る
  const token = localStorage.getItem("jwt"); // ログインで取得したトークン
  const navigate = useNavigate();

  // プレイヤー情報を格納するためのstate
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let lobbyStompClient = null;
    if (!lobbyStompClient) {
      // 初回接続先
      lobbyStompClient = Stomp.over(() => new SockJS("http://172.31.110.75:8080/lobby-websocket"));
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

        lobbyStompClient.subscribe(`/topic/room/${roomId}/completed`, (message) => {
          console.log(message.body); // "Game Start!" など
          alert("全員が準備完了しました。バトル画面に遷移します！");
          navigate("/battle", { state: { roomId: roomId } }); // バトル画面に遷移
        });

      })
    }
  }, [roomId, token])

  return (
    <div className="room-screen">
      <div className="room-container">
        <h1>参加者が集まるまでお待ちください</h1>
        <hr />
        <h2 className="room-id">
          部屋ID: {roomId}　現在のプレイヤー数: {players.length} / 4
        </h2>
        <ul className="player-list">
          {players.map((player) => (
            <li key={player.sessionId} className="player-item">
              <span>
                <strong>プレイヤー名:</strong> {player.userName}
              </span>
            </li>
          ))}
        </ul>

        <div className="button-container">
          <button className="room-button" onClick={() => navigate("/")}>
            ホームへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
