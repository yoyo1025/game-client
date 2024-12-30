import Field from "./Field";
import Dice from "./Dice";
import Event from "./Event";
import PlayerStatus from "./PlayerStatus";
import { useEffect } from "react";

export default function Battle() {

  const fetchGameState = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/start-game', {
        method: 'GET',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  useEffect(() => {
    fetchGameState();
  }, []);

  return(
    <div className="battle-screen">
      <div className="dice-event">
        <Dice/>
        <Event />
      </div>
      <Field/>
      <PlayerStatus/>
    </div>
  );
}