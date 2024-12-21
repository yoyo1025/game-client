import Field from "./Field";
import Dice from "./Dice";
import Event from "./Event";

export default function Battle() {
  return(
    <div className="battle-screen">
      <div>
        <Dice/>
        <Event />
      </div>
      <Field/>
    </div>
  );
}