import style from "./style.module.css";
const GamePage = ({ onChangePage }) => {
  const handlerClickButton = () => {
    onChangePage && onChangePage("app");
  };
  return (
    <div className={style.root}>
      <h1 className={style.title}>This is the game page!</h1>
      <button onClick={handlerClickButton}> Return to Homepage </button>
    </div>
  );
};

export default GamePage;
