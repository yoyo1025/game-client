import Field from "./Field";
import Dice from "./Dice";
import Event from "./Event";
import PlayerStatus from "./PlayerStatus";
import { useContext, useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { UserContext } from "./Home";
import { useLocation, useNavigate } from "react-router-dom";


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
  const [diceRoll, setDiceRoll] = useState(1);
  const [movableSquares, setMovableSquares] = useState([]);
  const [movable, setMovable] = useState(false);
  const [event1, setEvent1] = useState(false);
  const [event2, setEvent2] = useState(false);
  const [event3, setEvent3] = useState(false);
  const [prepareEvent, setPrepareEvent] = useState(false);
  const user = useContext(UserContext);
  const location = useLocation();
  const roomId = location.state?.roomId;
  const navigate = useNavigate();
  

  const fetchDiceResult = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/dice',{ 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": user.userId,
          "currentPlayerIndex": turn.currentPlayerIndex,
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from server:", errorData.error);
        alert(errorData.error)
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
      const res = await fetch('http://localhost:8000/api/start-game', { method: 'GET' });
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
      const res = await fetch('http://localhost:8000/api/game-state', { method: 'GET' });
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
      stompClient = Stomp.over(() => new SockJS("http://localhost:8000/app-websocket"));
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

        // WebSocket購読部分
        stompClient.subscribe('/topic/dice', (message) => {
          console.log("Dice購読");
          const parseMessage = JSON.parse(message.body);
          const diceRoll = parseMessage.diceRoll;
          const movableSquares = parseMessage.movableSquares;
          console.log(diceRoll);
          console.log(movableSquares);
          setDiceRoll(diceRoll);
          setMovableSquares(movableSquares);
          setMovable(movable => !movable);
        });

        stompClient.subscribe('/topic/newPosition', (message) => {
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
          
          setMovableSquares([]);
        });

        stompClient.subscribe('/topic/get-point', (message) => {
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

        stompClient.subscribe('/topic/change-position', (message) => {
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

        stompClient.subscribe('/topic/skip-turn', (message) => {
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

        stompClient.subscribe('/topic/end-game', (message) => {
          console.log("ゲーム結果！！！！");
          console.log(message.body);
          // JSONデータをパース
          const data = JSON.parse(message.body);

          // 受け取った結果をローカルストレージなどに保存
          localStorage.setItem("battleResult", JSON.stringify(data));


          alert("ゲームが終了しました！結果画面へ遷移します！！");
          navigate("/result");
        });

        // 切断通知を受け取る購読（オプション）
        stompClient.subscribe("/topic/user-disconnected", (msg) => {
          console.log("User disconnected message:", msg.body);
        });
      });
    }

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
        <Dice 
          onDiceRoll={fetchDiceResult} 
          diceRoll={diceRoll}
        />
        <Event 
          prepareEvent={prepareEvent}
          setPrepareEvent={setPrepareEvent}
          event1={event1}
          event2={event2}
          event3={event3}
          setEvent1={setEvent1}
          setEvent2={setEvent2}
          setEvent3={setEvent3}
          players={players}
          userId={user.userId}
          currentPlayerIndex={turn.currentPlayerIndex}
          playerPositions={playerPositions}
        />
      </div>
      <Field 
        playerPositions={playerPositions} 
        movableSquares={movableSquares} 
        movable={movable} 
        setMovable={setMovable}
        userId={user.userId} 
        currentPlayerIndex={turn.currentPlayerIndex}
        setPlayerPositions={setPlayerPositions}
        setMovableSquares={setMovableSquares}
        setPlayers={setPlayers}
        setTurn={setTurn}
        playersStatus={players}
        setPrepareEvent={setPrepareEvent}
      />
      <PlayerStatus 
        players={players} 
        turn={turn} 
        userId={user.userId}
      />
    </div>
  );
}