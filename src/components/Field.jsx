import Square from './Square';
import "../Game.css";

export default function Field() {
  const gridSize = 9; // 9×9 のマス目サイズ

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

          return (
            <Square
              key={`${x},${y}`}
              x={x}
              y={y}
              isGreen={isGreen}
              isBlue={isBlue}
              isRed={isRed}
              isYellow={isYellow}
            />
          );
        })
      )}
    </div>
  );
}
