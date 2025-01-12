import "../Game.css";

export default function SkipTurnModal({
  setEvent,
  setPrepareEvent,
  players
}) {
  const playerIcons = [
    "player1-status-icon.svg",
    "player2-status-icon.svg",
    "player3-status-icon.svg",
    "demon-status-icon.svg",
  ];

  const handleSkipTurn = async (index) => {
    try {
      
      const res = await fetch("http://localhost:8080/api/skip-turn", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": players[index].userId,
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
        <h2>誰を一回休みにしますか？</h2>
        <div className="player-select-in-modal">
          {playerIcons.map((icon, index) => (
            <button key={index} onClick={() => handleSkipTurn(index)} style={{padding: "10px", margin:"5px"}}>
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
