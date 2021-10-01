/* import { useDispatch, useSelector } from "react-redux"; */
import { useHistory } from "react-router";
/* import { plusAction, selectCount } from "../../store/counter"; */
import style from "./style.module.css";

const Header = ({ title, descr, onClickButton }) => {
   const history = useHistory();
 /*  const count = useSelector(selectCount);
  const dispatch = useDispatch(); */

 /*  console.log("count header", count); */
  const handlerClick = () => {
    history.push('/game')
/*     dispatch(plusAction(1)); */
  };
  return (
    <header className={style.root}>
      <div className={style.forest}></div>
      <div className={style.silhouette}></div>
      <div className={style.moon}></div>
      <div className={style.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={handlerClick}> Start the Game! </button>
      </div>
    </header>
  );
};

export default Header;
