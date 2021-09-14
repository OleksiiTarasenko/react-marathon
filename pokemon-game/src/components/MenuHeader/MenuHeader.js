import { useState } from "react";
import Menu from "../Menu/Menu.js";
import NavBar from "../Navbar/NavBar";

/* import style from "./style.module.css"; */

const MenuHeader = () => {
  const [isActive, setMenu] = useState(false);

  const handlerChangeMenu = () => {
    setMenu(!isActive);
  };

  return (
    <div>
      <Menu state={isActive} />
      <NavBar state={isActive} onChangeMenu={handlerChangeMenu} />
    </div>
  );
};

export default MenuHeader;
