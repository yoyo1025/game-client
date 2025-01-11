import "../Room.css";
import React, { useState, useEffect } from "react";

export default function RoomMake() {
  const initialValues = { roomname: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    // バリデーションエラーがなければAPI送信
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/make-room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName: formValues.roomname }),
        });

        if (!response.ok) {
          throw new Error("ルーム作成に失敗しました");
        }

        const data = await response.json();
        console.log("API Response:", data);
        setStatusMessage({ type: "success", text: "ルーム作成に成功しました！" });
      } catch (error) {
        console.error("エラー:", error);
        setStatusMessage({ type: "error", text: "ルーム作成に失敗しました！" });
      } finally {
        setTimeout(() => setStatusMessage(null), 1500); // 1.5秒後に非表示
      }
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
          <button type="submit" className="submitButton">
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
