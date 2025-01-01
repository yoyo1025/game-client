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
  const [diceRoll, setDiceRoll] = useState(1);
  const user = useContext(UserContext);

  const fetchDiceResult = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/dice',{ 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": players[0].userId,
          "currentPlayerIndex": turn.currentPlayerIndex,
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from server:", errorData.error);
        return;
      }
  
      const data = await res.json();
      console.log("Dice roll result:", data.diceRoll);
      setDiceRoll(data.diceRoll);
      
    } catch (error) {
      console.error('Error fetching game data:', error);  
    }
  };

  const fetchGameStateEarliest = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/start-game', { method: 'GET' });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
  
      setPlayers(data.players || []);
      setTurn({
        maxTurn: data.turn.maxTurn || 0,
        currentTurn: data.turn.currentTurn || 0,
        currentPlayerIndex: data.turn.currentPlayerIndex || 0,
        maxPlayerIndex: data.turn.maxPlayerIndex || 0,
        maxTurnReached: data.turn.maxTurnReached || false,
      });
      setPlayerPositions(data.playerPositions || {});
  
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  const fetchGameStateLater = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/game-state', { method: 'GET' });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Game state fetched:", data);
  
      setPlayers(data.players || []);
      setTurn({
        maxTurn: data.turn.maxTurn || 0,
        currentTurn: data.turn.currentTurn || 0,
        currentPlayerIndex: data.turn.currentPlayerIndex || 0,
        maxPlayerIndex: data.turn.maxPlayerIndex || 0,
        maxTurnReached: data.turn.maxTurnReached || false,
      });
      setPlayerPositions(data.playerPositions || {});
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };  

  useEffect(() => {
    fetchGameStateEarliest();
    
    let stompClient = null;
    if (!stompClient) {
      // 初回接続先
      stompClient = Stomp.over(() => new SockJS("http://localhost:8080/app-websocket"));
      stompClient.connect({ userId: "myUserId" }, () => {
        console.log("Connected to WebSocket");

        // WebSocket購読部分
        stompClient.subscribe('/topic/game-state', (message) => {
          const gameState = JSON.parse(message.body);
          console.log("Game state received:", gameState);

          // 受け取ったgameStateからReactのStateを更新
          setPlayers(gameState.players || []);
          setTurn({
            maxTurn: gameState.turn.maxTurn || 0,
            currentTurn: gameState.turn.currentTurn || 0,
            currentPlayerIndex: gameState.turn.currentPlayerIndex || 0,
            maxPlayerIndex: gameState.turn.maxPlayerIndex || 0,
            maxTurnReached: gameState.turn.maxTurnReached || false,
          });
          setPlayerPositions(gameState.playerPositions || {});
        });

        // 切断通知を受け取る購読（オプション）
        stompClient.subscribe("/topic/user-disconnected", (msg) => {
          console.log("User disconnected message:", msg.body);
        });
      });
    }

    // return () => {
    //   if (stompClient) {
    //     stompClient.disconnect();
    //   }
    // };

    fetchGameStateLater();
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
        <Dice onDiceRoll={fetchDiceResult} diceRoll={diceRoll}/>
        <Event />
      </div>
      <Field playerPositions={playerPositions}/>
      <PlayerStatus players={players} turn={turn} userId={user.userId}/>
    </div>
  );
}