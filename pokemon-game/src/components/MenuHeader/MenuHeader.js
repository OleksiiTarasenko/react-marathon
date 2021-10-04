import { useState } from "react";
import { NotificationManager } from "react-notifications";
import Menu from "../Menu/Menu.js";
import NavBar from "../Navbar/NavBar";
import Modal from "../Modal/index.js";
import LoginForm from "../LoginForm/index.js";

import style from "./style.module.css";
import { useDispatch } from "react-redux";
import { getUserAsync, getUserUpdateAsync } from "../../store/users.js";

const loginSignupUser = async ({ email, password, type }) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  };
  switch (type) {
    case "signup":
      return await fetch(
        " https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAViB2abs2aUyOch7caO2Uc7aZ0hCal6vo",
        requestOptions
      ).then((res) => res.json());
    case "login":
      return await fetch(
        " https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key==AIzaSyAViB2abs2aUyOch7caO2Uc7aZ0hCal6vo",
        requestOptions
      ).then((res) => res.json());
    default:
      return "Can not login!!!";
  }
};

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setMenu] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
const dispatch  = useDispatch();

  const [isLogIn, setLogIn] = useState(false);
  const handlerChangeMenu = () => {
    setMenu((prevState) => !prevState);
  };
  const handlerClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handlerSubmitForm = async (props) => {

    const response = await loginSignupUser(props);
console.log('response', response)
    if (response.hasOwnProperty("error")) {
      NotificationManager.error(response.error.message, "Error!");
    } else {

      if (props.type === "signup") {
        const pokemonStart = await fetch(
          "https://reactmarathon-api.herokuapp.com/api/pokemons/starter"
        ).then((res) => res.json());
      

        for (const item of pokemonStart.data) {
          await fetch(`https://pokemon-game-1222d-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json?=auth${response.idToken}`, {
            method: 'POST',
          body: JSON.stringify(item)
          })
        }
      }

      localStorage.setItem("idToken", response.idToken);
      NotificationManager.success("Successfull!!!");
      dispatch(getUserUpdateAsync())
      handlerClickLogin();
    }
  };

  const handlerLogInSwitch = () => {
    setLogIn((prevState) => !prevState);
  };

  return (
    <div>
      <Menu isOpen={isOpen} onChangeMenu={handlerChangeMenu} />
      <NavBar
        isOpen={isOpen}
        bgActive={bgActive}
        onChangeMenu={handlerChangeMenu}
        onClickLogin={handlerClickLogin}
      />

      <Modal
        title={!isLogIn ? "Register" : "Log In"}
        isOpen={isOpenModal}
        onCloseModal={handlerClickLogin}
      >
        <LoginForm
          isLogIn={isLogIn}
          isResetField={!isOpenModal}
          onSubmit={handlerSubmitForm}
        />
        <button className={style.switch} onClick={handlerLogInSwitch}>
          {isLogIn ? "Register" : "Log In"}
        </button>
      </Modal>
    </div>
  );
};

export default MenuHeader;
