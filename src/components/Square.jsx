import "../Game.css";

export default function Square({ 
  x, 
  y, 
  occupant,
  icon,
  isRed, 
  isYellow, 
  isGreen, 
  isBlue, 
  isMovable,
  isAlive,
  isDemon,
  onClickMove 
}) {
  const handleClick = () => {
    console.log(`Clicked square at (${x}, ${y})`);
    if (occupant) {
      console.log(`Occupied by: ${occupant.id}`);
    }
    if (isMovable) {
      onClickMove(x, y);
    } else {
      console.log(`Square at (${x}, ${y}) is not movable.`);
    }
  }

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
      onClick={handleClick}
    >
      {(occupant || (isAlive || isDemon )) && <img src={icon} alt={icon} />}
    </button>
  );
}
