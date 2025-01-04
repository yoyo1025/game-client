import "../Game.css";

export default function ExchangeEventModal({
  setEvent,
  userId,
  currentPlayerIndex,
  targetPosition,
  setPrepareEvent,
  playerPositions,
  players
}) {
  const playerIcons = [
    "player1-status-icon.svg",
    "player2-status-icon.svg",
    "player3-status-icon.svg",
    "demon-status-icon.svg",
  ];

  const handleExchangePlayerPosition = async (index) => {
    try {
      console.log("x: " + playerPositions[index + 1].x);
      console.log("y: " + playerPositions[index + 1].y);
      
      const res = await fetch("http://localhost:8080/api/ChangeUserPosition", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": userId,
          "currentPlayerIndex": currentPlayerIndex,
          "targetPosition": { "x": playerPositions[index + 1].x, "y": playerPositions[index + 1].y }
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from server:", errorData.error);
        alert(errorData.error);
        return;
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
    setEvent(false);
    setPrepareEvent(false)
  };

  return (
    <div className="modal-overlay-exchage-position">
      <div className="modal-content-exchage-position">
        <h2>誰と位置を入れ替えますか？</h2>
        <div className="player-select-in-modal">
          {playerIcons.map((icon, index) => (
            <button key={index} onClick={() => handleExchangePlayerPosition(index)} style={{padding: "10px", margin:"5px"}}>
              <img className="status-icon" src={icon} alt={`プレイヤー${index + 1}アイコン`} />
              <div className="player-name">
                {players.length > index ? players[index].name : "Loading..."}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
