import "../Game.css";

export default function Square({ x, y, isRed, isYellow, isGreen, isBlue }) {
  const displayPoint = () => {
    console.log(`Clicked square at (${x}, ${y})`);
  };
  return (
    <button
      className={`
        square 
        ${isRed ? "square-red" : ""} 
        ${isYellow ? "square-yellow" : ""} 
        ${isGreen ? "square-green" : ""} 
        ${isBlue ? "square-blue" : ""}
      `}
      title={`(${x}, ${y})`} 
      onClick={displayPoint}
    >
    </button>
  );
}
