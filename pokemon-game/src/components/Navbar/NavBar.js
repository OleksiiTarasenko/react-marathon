import cn from "classnames";

import style from "./style.module.css";

const NavBar = ({ state, onChangeMenu }) => {
  const handlerClick = () => {
    onChangeMenu && onChangeMenu();
  };

  return (
    <nav className={style.root}>
      <div className={style.navWrapper}>
        <p className={style.brand}>LOGO</p>
        <a
          className={cn(style.menuButton, { [style.active]: state })}
          onClick={handlerClick}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
