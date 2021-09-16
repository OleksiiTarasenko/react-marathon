import cn from "classnames";

import style from "./style.module.css";

const NavBar = ({ isOpen, bgActive = false, onChangeMenu }) => {
 

  return (
    <nav className={cn(style.root, {[style.bgActive]:bgActive})}>
      <div className={style.navWrapper}>
        <p className={style.brand}>LOGO</p>
        <div
                   
                    onClick={onChangeMenu}
                    className={cn(style.menuButton, { [style.active]:isOpen})}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
