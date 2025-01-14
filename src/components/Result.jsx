import React, { useState, useEffect } from "react";
import "../Result.css";

export default function Result() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // ローカルストレージから結果を取り出す
    const storedData = localStorage.getItem("battleResult");
    if (storedData) {
      setRecords(JSON.parse(storedData));
    }
  }, []);

  if (!records || records.length === 0) {
    return <div>結果データがありません。</div>;
  }

  // 4番目のオブジェクト(=鬼) の is_win で勝者を判断する例
  // 実際には "Demon" レコードを探して is_win を見る方法が分かりやすい
  const demonRecord = records.find((r) => r.role === "Demon");
  const isDemonWin = demonRecord?.is_win ?? false;
  const winnerMessage = isDemonWin ? "鬼の勝利" : "村人の勝利";

  // ログアウト時の処理
  const handleLogout = () => {
    localStorage.removeItem("battleResult"); // 結果データを削除
    localStorage.removeItem("jwt"); // JWTを削除
    localStorage.removeItem("userId"); // ユーザーIDを削除
    window.location.href = "http://localhost:3000/login"; // ログインページへ遷移
  };

  // ホーム画面へ戻る処理
  const handleGoHome = () => {
    localStorage.removeItem("battleResult"); // 結果データのみ削除
    window.location.href = "http://localhost:3000"; // ホーム画面へ遷移
  };

  return (
    <div className="result-screen">
      <div className="result-container">
        <h1 className="title">ゲーム結果</h1>
          <h2 className="winner-message">{winnerMessage}</h2>

          <table className="table_design09">
            <thead>
              <tr>
                <th>名前</th>
                <th>役割</th>
                <th>結果</th>
                <th>ポイント</th>
                <th>順位</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, idx) => (
                <tr key={idx}>
                  <th>{record.user_name}</th>
                  <td data-label="役割">{record.role}</td>
                  <td data-label="結果">{record.is_win ? "勝ち" : "負け"}</td>
                  <td data-label="ポイント">{record.point}</td>
                  <td data-label="順位">{record.ranking}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="result-button" onClick={handleLogout}>ログアウト</button>
            <button className="result-button" onClick={handleGoHome}>ホームへ</button>
          </div>
      </div>
    </div>
  );
}
