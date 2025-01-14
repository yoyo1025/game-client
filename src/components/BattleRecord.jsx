import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function BattleRecord() {
  const navigate = useNavigate();

  const [battleResults, setBattleResults] = useState([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [victories, setVictories] = useState(0);
  const [capturedAll, setCapturedAll] = useState(0);

  useEffect(() => {

    // ローカルストレージからJWTトークンを取得
    const token = localStorage.getItem("jwt");

    if (!token) {
      alert("ログインが必要です。");
      navigate("/login");
      return;
    }

    const fetchBattleResults = async () => {
      const url = "http://localhost:8080/battlerecord/{id}"; 
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWTトークンをAuthorizationヘッダーに設定
        },
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          // エラーレスポンスの場合
          const errorData = await response.json();
          console.error("エラー:", errorData);
          alert("戦績の取得に失敗しました。");
          return;
        }

        const data = await response.json();
        setBattleResults(data.battles);
        setTotalMatches(data.totalMatches);
        setVictories(data.totalWins);
        setCapturedAll(data.demonWins);
      } catch (error) {
        console.error("エラーが発生しました:", error);
        alert("戦績の取得中にエラーが発生しました。");
      }
    };

    fetchBattleResults();
  }, [navigate]);





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
        <p><strong>勝利回数:</strong> {victories} 回</p>
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
              <td>{result.playDate}</td>
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
