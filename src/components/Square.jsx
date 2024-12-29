import "../Game.css";

export default function Square({ 
  x, 
  y, 
  occupant,
  isRed, 
  isYellow, 
  isGreen, 
  isBlue, 
  isMovable 
}) {
  const displayPoint = () => {
    console.log(`Clicked square at (${x}, ${y})`);
    if (occupant) {
      console.log(`Occupied by: ${occupant.id}`);
    }
  };

  return (
    <button
      className={`
        square
        ${isRed ? "square-red" : ""} 
        ${isYellow ? "square-yellow" : ""} 
        ${isGreen ? "square-green" : ""} 
        ${isBlue ? "square-blue" : ""} 
        ${isMovable ? "square-movable" : ""}
      `}
      title={`(${x}, ${y})`}
      onClick={displayPoint}
    >
      {occupant && <img src={occupant.icon} alt={occupant.id} />}
    </button>
  );
}
