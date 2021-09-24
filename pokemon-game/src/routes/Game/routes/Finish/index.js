import { useContext } from "react";
import { useHistory } from "react-router";
import { PokemonContext } from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import s from "./style.module.css";

const FinishPage = () => {
  const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();
  console.log("context", pokemonsContext);
  const pokemons = pokemonsContext.pokemons;
  const player2 = pokemonsContext.pokemons2;
  const handlerEndGameClick = () => {
       history.replace("/game");
  };

  return (
    <>
      <div className={s.finish}>
        <h1 className={s.title}>Finish page</h1>
        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([key, { name, id, img, type, values, selected }]) => (
              <PokemonCard
                className={s.card}
                key={id}
                objID={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                active={true}
                isSelected={selected}
              />
            )
          )}
        </div>
        <button onClick={handlerEndGameClick}> End Game</button>
        <div className={s.flex}>
          {Object.entries(player2).map(
            ([key, { name, id, img, type, values, selected }]) => (
              <PokemonCard
                className={s.card}
                key={id}
                objID={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                active={true}
                
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default FinishPage;
