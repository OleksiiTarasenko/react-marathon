import { useState } from "react";
import Menu from "../Menu/Menu.js";
import NavBar from "../Navbar/NavBar";

/* import style from "./style.module.css"; */

const MenuHeader = ({bgActive}) => {
  const [isOpen, setMenu] = useState(null);

  const handlerChangeMenu = () => {
    setMenu(prevState => !prevState);
  };

  return (
    <div>
      <Menu isOpen={isOpen} onChangeMenu={handlerChangeMenu} />
      <NavBar isOpen={isOpen} bgActive ={bgActive} onChangeMenu={handlerChangeMenu} />
    </div>
  );
};

export default MenuHeader;
