import "../Room.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomJoin() {
  const initialValues = { password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate(); // ページ遷移用
  // ローカルストレージからJWTトークンを取得
  const token = localStorage.getItem("jwt");
  if (!token) {
    alert("ログインが必要です。");
    navigate("/login");
    return;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://172.31.110.75:8080/room-join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: formValues.password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "パスワード送信に失敗しました");
        }

        const data = await response.json();
        console.log("API Response:", data);

        navigate("/room-standby", { state: { roomId: data.roomId } })
      } catch (error) {
        console.error("エラー:", error);
        setStatusMessage({ type: "error", text: error.message || "エラーが発生しました。" });
      }
    } else {
      setStatusMessage({ type: "error", text: "入力内容を確認してください。" });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "パスワードを入力してください。";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>ルーム参加</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>パスワード</label>
            <input
              type="text"
              name="password"
              placeholder="パスワード"
              value={formValues.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {statusMessage && (
            <div
              className={`statusMessage ${
                statusMessage.type === "success" ? "success" : "error"
              }`}
            >
              {statusMessage.text}
            </div>
          )}
          <button type="submit" className="room-button">
            参加
          </button>
        </div>
      </form>
    </div>
  );
}