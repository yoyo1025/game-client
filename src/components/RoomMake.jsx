import "../Room.css";
import React, { useState, useEffect } from "react";

export default function RoomMake() {
  const initialValues = { roomname: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErros, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    if (Object.keys(formErros).length === 0 && isSubmit) {
      console.log("ルーム作成データ", formValues);
    }
  }, [formErros]);

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
          <p className="errorMsg">{formErros.roomname}</p>
          <button type="submit" className="submitButton">
            登録
          </button>
          {Object.keys(formErros).length === 0 && isSubmit && (
            <div className="msgOk">ルーム作成に成功しました</div>
          )}
        </div>
      </form>
    </div>
  );
}
