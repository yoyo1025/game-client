import Field from "./Field";
import Dice from "./Dice";
import Event from "./Event";
import PlayerStatus from "./PlayerStatus";
import { useEffect, useState } from "react";

export default function Battle() {
  const [players, setPlayers] = useState([]); // プレイヤー情報
  const [turn, setTurn] = useState({ maxTurn: 0, currentTurn: 0, maxTurnReached: false }); // ターン情報
  const [playerPositions, setPlayerPositions] = useState({}); // プレイヤー位置情報

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
        maxTurnReached: data.turn.maxTurnReached || false,
      });
      setPlayerPositions(data.playerPositions || {}); // デフォルト値で空オブジェクトを設定
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  useEffect(() => {
    fetchGameState();
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
      <PlayerStatus players={players}/>
    </div>
  );
}