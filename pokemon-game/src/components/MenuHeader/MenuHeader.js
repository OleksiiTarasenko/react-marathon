import { useState } from "react";
import {NotificationManager} from 'react-notifications'
import Menu from "../Menu/Menu.js";
import NavBar from "../Navbar/NavBar";
import Modal from "../Modal/index.js";
import LoginForm from "../LoginForm/index.js";
import SignUpForm from "../SignUp/index.js";
import style from "./style.module.css";

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setMenu] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isLogIn, setLogIn] = useState(false);
  const handlerChangeMenu = () => {
    setMenu((prevState) => !prevState);
  };
  const handlerClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handlerSubmitSignUpForm = async ({email, password}) => {
   
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }) 
    }
    const response = await fetch(' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[key]', requestOptions).then(res=>res.json())
    console.log('responce%%%:  ', response)
    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Error!')
    } else {
      localStorage.setItem('idToken', response.idToken )
      NotificationManager.success('Sign Up Successfull!!!')
    }
    
  }

  const handlerSubmitLoginForm = async ({email, password}) => {
   
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }) 
    }
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key==[key]', requestOptions).then(res=>res.json())
    console.log('responce%%%:  ', response)
    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Error!')
    } else {
      localStorage.setItem('idToken', response.idToken )
      NotificationManager.success('Sign Up Successfull!!!')
    }
    
  }

 const handlerLogInSwitch = () => {
   setLogIn(prevState => !prevState)
 }

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
          title={!isLogIn ? 'Register': 'Log In'}
          isOpen={isOpenModal}
          onCloseModal={handlerClickLogin}
        >
          {isLogIn ?<LoginForm onSubmit = {handlerSubmitLoginForm}/> :<SignUpForm onSubmit = {handlerSubmitSignUpForm}/>}
         <button className={style.switch} onClick={handlerLogInSwitch}>{isLogIn ? 'Register': 'Log In'}</button>      

        </Modal>
   
    </div>
  );
};

export default MenuHeader;
