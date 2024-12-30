import Square from './Square';
import "../Game.css";

const playerIcons = [
  { id: 1, icon: "player1.svg" },
  { id: 2, icon: "player2.svg" },
  { id: 3, icon: "player3.svg" },
  { id: 4, icon: "gooey-demon.svg" },
];

// const movableData = {
//   "movableSquares": [
//     { "x": 1, "y":  2},
//     { "x": 3, "y":  2},
//     { "x": 2, "y":  3},
//     { "x": 2, "y":  1},
//   ]
// };

export default function Field({playerPositions = {}}) {
  const gridSize = 9; // 9×9 のマス目サイズ
  
  // playerPositionsを配列に変換
  const players = Object.entries(playerPositions).map(([id, position]) => ({
    id: parseInt(id, 10),
    x: position.x,
    y: position.y,
  }));
  
  // const movableSquares = movableData.movableSquares; 


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

          // (x, y) にいるプレイヤーを検索
          const occupant = players.find(player => player.x === x && player.y === y);

          // プレイヤーのアイコンを取得
          const occupantIcon = occupant ? playerIcons.find(icon => icon.id === occupant.id)?.icon : null;
          
          // JSONの中に (x, y) が存在すれば移動可能マス
          // const isMovable = movableSquares.some(square => square.x === x && square.y === y);

          return (
            <Square
              key={`${x},${y}`}
              x={x}
              y={y}
              isGreen={isGreen}
              isBlue={isBlue}
              isRed={isRed}
              isYellow={isYellow}
              occupant={occupant} // 該当のプレイヤー情報をそのまま渡す
              icon={occupantIcon}
              // isMovable={isMovable}
            />
          );
        })
      )}
    </div>
  );
}
