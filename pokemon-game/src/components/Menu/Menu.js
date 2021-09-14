import cn from "classnames";

import style from "./style.module.css";

const Menu = (state) => {
  return (
    <div
      className={cn(style.menuContainer, {
        [style.active]: Object.values(state)[0],
        [style.deactive]: !Object.values(state)[0],
      })}
    >
      <div className={style.overlay} />
      <div className={style.menuItems}>
        <ul>
          <li>
            <a href="#welcome">HOME</a>
          </li>
          <li>
            <a href="#game">GAME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
