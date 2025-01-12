import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function BattleResult() {
  const navigate = useNavigate();
  // 戦績データの例（実際はバックエンドやローカルストレージから取得）
  const [battleResults] = useState([
    { date: "2025-01-01 14:00", role: "村人", result: "勝ち" },
    { date: "2025-01-02 15:00", role: "鬼", result: "負け" },
    { date: "2025-01-03 16:00", role: "村人", result: "負け" },
    { date: "2025-01-04 17:00", role: "鬼", result: "勝ち" },
    { date: "2025-01-04 20:00", role: "村人", result: "勝ち" },

  ]);
  const totalMatches = battleResults.length;
  const victories = battleResults.filter(result => result.result === "勝ち").length;
  const capturedAll = battleResults.filter(result => result.role === "鬼" && result.result === "勝ち").length;

  const handleBack = () => {
    navigate("/"); // トップページに戻る
  };


  return (
    <div className="battle-result">
      <div className="result-title">
      <h2>これまでの戦績</h2>
      </div>

      <p><strong>総試合数:</strong> {totalMatches} 回</p>
      
      <div className="result-summary">
        <img src="./championshipcup.png" alt="優勝カップ" width={150}/>
        <p><strong>優勝回数:</strong> {victories} 回</p>
        <img src="./kanabou.png" alt="鬼の金棒" width={200}/>
        <p><strong>全員捕まえた回数:</strong> {capturedAll} 回</p>
      </div>

      <div className="result-table-wrapper">
      <table className="result-table">
        <thead>
          <tr>
            <th>プレイ日時</th>
            <th>役職</th>
            <th>勝敗</th>
          </tr>
        </thead>
        <tbody>
          {battleResults.map((result, index) => (
            <tr key={index}>
              <td>{result.date}</td>
              <td>{result.role}</td>
              <td>{result.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button
          className="back-button"
          onClick={(handleBack)}
        >
          トップ画面に戻る
        </button>
    </div>
  );
}
