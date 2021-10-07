import { useSelector } from "react-redux";

import { selectLocalId, selectEmail, selectCreated } from "../../store/users";

import s from "./style.module.css";
const User = () => {
  const userEmail = useSelector(selectEmail);
  const userId = useSelector(selectLocalId);
  const userCreated = useSelector(selectCreated);

  return (
    <div className={s.root}>
      <h1> User info </h1>
      <p>User ID: {userId}</p>
      <p>Email: {userEmail}</p>
      <p>Created at: {Date(userCreated)}</p>
    </div>
  );
};

export default User;
