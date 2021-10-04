import { useState, useEffect } from "react";

import Input from "../Input";
const LoginForm = ({ onSubmit, isResetField, isLogIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isResetField]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    onSubmit &&
      onSubmit({ type: isLogIn ? "login" : "signup", email, password });

    setPassword("");
    setEmail("");
  };
  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <Input
          label="Email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          value={password}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>{isLogIn ? "Login" : "SignUp"}</button>
    </form>
  );
};

export default LoginForm;
