import Field from "./Field";
import Dice from "./Dice";
import Event from "./Event";
import PlayerStatus from "./PlayerStatus";
import { useContext, useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { UserContext } from "./Home";


export default function Battle() {
  const [players, setPlayers] = useState([]); // プレイヤー情報
  const [turn, setTurn] = useState({ 
    maxTurn: 0, 
    currentTurn: 0, 
    currentPlayerIndex: 1, 
    maxPlayerIndex: 4, 
    maxTurnReached: false
  }); // ターン情報
  const [playerPositions, setPlayerPositions] = useState({}); // プレイヤー位置情報
  const [message, setMessage] = useState(""); // メッセージ内容
  const user = useContext(UserContext);

  const fetchGameState = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/start-game', {
        method: 'GET',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      setPlayers(data.players || []); // デフォルト値で空配列を設定
      setTurn({
        maxTurn: data.turn.maxTurn || 0,
        currentTurn: data.turn.currentTurn || 0,
        currentPlayerIndex: data.turn.currentPlayerIndex || 0,
        maxPlayerIndex: data.turn.maxPlayerIndex || 0,
        maxTurnReached: data.turn.maxTurnReached || false,
      });
      setPlayerPositions(data.playerPositions || {}); // デフォルト値で空オブジェクトを設定
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  useEffect(() => {
    let stompClient = null;
    if (!stompClient) {
      // 初回接続先
      stompClient = Stomp.over(() => new SockJS("http://localhost:8080/app-websocket"));
      stompClient.connect({ userId: "myUserId" }, () => {
        console.log("Connected to WebSocket");

        // /topic/greetingsからのメッセージを購読
        stompClient.subscribe("/topic/greeting", (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          setMessage((prev) => [...prev, receivedMessage.content]);
        });

        // 切断通知を受け取る購読（オプション）
        stompClient.subscribe("/topic/user-disconnected", (msg) => {
          console.log("User disconnected message:", msg.body);
        });
      });
    }

    fetchGameState();

    // return () => {
    //   if (stompClient) {
    //     stompClient.disconnect();
    //   }
    // };
  }, []);

  // 状態の変更を監視してコンソールに出力
  useEffect(() => {
    console.log("Players:", players);
  }, [players]);

  useEffect(() => {
    console.log("Turn:", turn);
  }, [turn]);

  useEffect(() => {
    console.log("Player Positions:", playerPositions);
  }, [playerPositions]);

  return(
    <div className="battle-screen">
      <div className="dice-event">
        <Dice/>
        <Event />
      </div>
      <Field playerPositions={playerPositions}/>
      <PlayerStatus players={players} turn={turn} userId={user.userId}/>
    </div>
  );
}