import cn from "classnames";

import style from "./style.module.css";
import { ReactComponent as LoginSVG } from "../../assets/login.svg";
import { ReactComponent as UserSVG } from "../../assets/user.svg";
import { useSelector } from "react-redux";
import {
  getUserUpdateAsync,
  selectLocalId,
  selectUserLoading,
} from "../../store/users";
import { Link } from "react-router-dom";

const NavBar = ({ isOpen, bgActive = false, onChangeMenu, onClickLogin }) => {
  const isLoadingUser = useSelector(selectUserLoading);
  const localId = useSelector(selectLocalId);
  const onLogOut = async () => {
    localStorage.removeItem("idToken");
    await getUserUpdateAsync();
  };

  return (
    <nav className={cn(style.root, { [style.bgActive]: bgActive })}>
      <div className={style.navWrapper}>
        <p className={style.brand}>LOGO</p>

        <div className={style.loginAndMenu}>
          {!localStorage.getItem("idToken") && (
            /* (!isLoadingUser && !localId )&& */ <div
              className={style.loginWrap}
              onClick={onClickLogin}
            >
              <LoginSVG />
            </div>
          )}

          {localStorage.getItem("idToken") && !isLoadingUser && localId && (
            <>
              <Link className={style.loginWrap} to="/user">
                <UserSVG />
              </Link>
              <Link to="/home">
                <span onClick={onLogOut} className={style.logout}>
                  {" "}
                  log out
                </span>
              </Link>
            </>
          )}
          <div
            onClick={onChangeMenu}
            className={cn(style.menuButton, { [style.active]: isOpen })}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
