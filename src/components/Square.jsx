import "../Game.css"

export default function Square({ isRed, isYellow, isGreen, isBlue }) {

  return(
      <button 
        className={`
          square 
          ${isRed ? "square-red" : ""} 
          ${isYellow ? "square-yellow" : ""}
          ${isGreen ? "square-green" : ""}
          ${isBlue ? "square-blue" : ""}
        `}
      />
  );
}