import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [UserID, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigation = useNavigate();


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
        console.error("Error: Passwords do not match.");
        return;
    }

    axios
      .post("http://127.0.0.1:8000/accounts/register", {
        UserID: UserID,
        email: email,
        name: name,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((response) => {
        console.log(response.data);
        navigation("./login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User ID"
        value={UserID}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password Confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;