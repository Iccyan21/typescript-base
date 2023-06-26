import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";

const Login = () => {
  const [UserID, setuserid] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios

      .post("http://127.0.0.1:8000/accounts/login", {
        UserID: UserID,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        navigation("./timeline");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="userid"
        placeholder="userid"
        value={UserID}
        onChange={(e) => setuserid(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;