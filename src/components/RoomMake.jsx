import "../Room.css";
import React, { useState, useEffect } from "react";

export default function RoomMake() {
  const initialValues = { roomname: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setStatusMessage({ type: "success", text: "ルーム作成に成功しました！" });
      setTimeout(() => setStatusMessage(null), 1500); // 3秒後に非表示
    } else if (isSubmit) {
      setStatusMessage({ type: "error", text: "ルーム作成に失敗しました！" });
      setTimeout(() => setStatusMessage(null), 1500); // 3秒後に非表示
    }
  }, [formErrors]);

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
