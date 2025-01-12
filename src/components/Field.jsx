import Square from './Square';
import "../Game.css";

const playerIcons = [
  { id: 1, icon: "player1.svg" },
  { id: 2, icon: "player2.svg" },
  { id: 3, icon: "player3.svg" },
  { id: 4, icon: "gooey-demon.svg" },
];

export default function Field({
  playerPositions = {}, 
  movableSquares, 
  userId, 
  currentPlayerIndex,
  playersStatus,
  setPlayers,
  setTurn,
  setPlayerPositions,
  setPrepareEvent
}) {
  const gridSize = 9; // 9×9 のマス目サイズ

  // 取得した playerPositions を配列化する際に、村人の isAlive が false の場合は除外する
  const players = Object.entries(playerPositions).map(([id, position]) => {
    const numericId = parseInt(id, 10);
    return {
      id: numericId,
      x: position.x,
      y: position.y,
      isAlive: playersStatus[numericId - 1]?.isAlive, 
    };
  }).filter(player => {
    const aliveFlag = playersStatus[player.id - 1]?.isAlive;
    return aliveFlag !== false; // false のときは表示しない
  });


  const handleMove = async (x, y) => {
    console.log(`Moving to (${x}, ${y})`);
    try {
      const res = await fetch("http://localhost:8000/api/move", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userId": userId,
          "currentPlayerIndex": currentPlayerIndex,
          "targetPosition": { "x": x, "y": y }
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from server:", errorData.error);
        alert(errorData.error);
        return;
      }
    } catch (error) {
      console.error('Error sending move data:', error);
    }
  };

  return (
    <div className="field-container">
      {Array.from({ length: gridSize }).map((_, rowIndex) =>
        Array.from({ length: gridSize }).map((_, colIndex) => {
          // 座標は左下のマスを原点としx. y >= 0
          const x = colIndex; // x座標
          const y = gridSize - rowIndex - 1; // y座標

          const isGreen = x === 1 && y === 1; // (1, 1) イベントマス緑
          const isBlue = x === 7 && y === 1; // (7, 1) イベントマス青
          const isRed = x === 1 && y === 7; // (1, 7) イベントマス赤
          const isYellow = x === 7 && y === 7; // (7, 7) イベントマス黄

          const isEventSquare = isGreen || isBlue || isRed || isYellow;

          // (x, y) にいるプレイヤーを検索
          const occupant = players.find(player => player.x === x && player.y === y);

          // プレイヤーのアイコンを取得
          const occupantIcon = occupant ? playerIcons.find(icon => icon.id === occupant.id)?.icon : null;
          
          // JSONの中に (x, y) が存在すれば移動可能マス
          const isMovable = movableSquares.length > 0 && movableSquares.some(square => square.x === x && square.y === y);

          const isAlive = occupant ? playersStatus[occupant.id - 1]?.isAlive : false;
          const isDemon = occupant ? playersStatus[occupant.id - 1]?.id === 4 : false;

          return (
            <Square
              key={`${x},${y}`}
              x={x}
              y={y}
              isGreen={isGreen}
              isBlue={isBlue}
              isRed={isRed}
              isYellow={isYellow}
              isEventSquare={isEventSquare}
              occupant={occupant}
              icon={occupantIcon}
              isMovable={isMovable}
              isAlive={isAlive}
              isDemon={isDemon}
              onClickMove={handleMove}
              currentPlayerIndex={currentPlayerIndex}
              setPlayers={setPlayers}
              setTurn={setTurn}
              setPlayerPositions={setPlayerPositions}
              setPrepareEvent={setPrepareEvent}
            />
          );
        })
      )}
    </div>
  );
}
