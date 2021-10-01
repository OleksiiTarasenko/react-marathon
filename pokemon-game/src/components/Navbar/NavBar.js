import cn from "classnames";

import style from "./style.module.css";
import {ReactComponent as LoginSVG}  from "../../assets/login.svg"
const NavBar = ({ isOpen, bgActive = false, onChangeMenu, onClickLogin }) => {
 

  return (
    <nav className={cn(style.root, {[style.bgActive]:bgActive})}>
      <div className={style.navWrapper}>
        <p className={style.brand}>LOGO</p>
     
        <div  className = {style.loginAndMenu}>
          <div className = {style.loginWrap}
          onClick ={onClickLogin}>
            <LoginSVG/>
          </div>
          <div
                   
                   onClick={onChangeMenu}
                   className={cn(style.menuButton, { [style.active]:isOpen})}
       >
         <span />
       </div> 
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
