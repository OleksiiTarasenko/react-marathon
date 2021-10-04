import { useState } from "react";
import s from "./style.module.css";
const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ email, password });

    setPassword("");
    setEmail("");
  };
  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <input
          value={email}
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
