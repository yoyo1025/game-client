import Field from "./Field";
import Dice from "./Dice";
import Event from "./Event";
import PlayerStatus from "./PlayerStatus";

export default function Battle() {
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