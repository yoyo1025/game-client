import "../Room.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomMake() {
  const initialValues = { roomname: "" };
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
        const response = await fetch("http://localhost:8080/make-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ roomName: formValues.roomname }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "ルーム作成に失敗しました");
        }

        const data = await response.json();
        console.log("API Response:", data);

        // 成功時に RoomPassword 画面に遷移し、パスワードを渡す
        navigate("/room-password", { state: { password: data.message } });
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
    if (!values.roomname) {
      errors.roomname = "ルーム名を入力してください。";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>ルーム作成</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>ルーム名</label>
            <input
              type="text"
              name="roomname"
              placeholder="ルーム名"
              value={formValues.roomname}
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
            登録
          </button>
        </div>
      </form>
    </div>
  );
}