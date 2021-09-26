import { useState, useContext } from "react";
import { useHistory } from "react-router";

import { PokemonContext } from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import s from "./style.module.css";
import { FirebaseContext } from "../../../../context/Firebase";
import cn from "classnames";

const FinishPage = () => {
  const firebase = useContext(FirebaseContext);
  const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();

const [pickedCard, setPickedCard] = useState([])

  const pokemons = pokemonsContext.pokemons;
  const player2 = pokemonsContext.pokemons2;
  const winner = pokemonsContext.winner;
 
  const handlerEndGameClick = () => {
    if (pickedCard && winner) {
      firebase.addPokemon(pickedCard[0], async () => {
      await firebase.getPokemonsOnce();
    }) }
    pokemonsContext.clear();
    history.replace("/game");
  };

  const handlerClick = (event) => {
    const pickedCardName = event.target.children[0].innerText.split("\n")[5];

    for (const element of player2) {
      element.selected = "false";
    }
 
    const picked = player2.filter(function (el) {
      return el.name === pickedCardName;
    });
    let objIndex = player2.findIndex((obj) => obj.name === pickedCardName);
    player2[objIndex].selected = true;
    setPickedCard(prevState => prevState = picked)
    
  };
  return (
    <>
      <div className={s.root}>
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
              />
            )
          )}
        </div>
        <div className={cn(s.buttonWrap)}>
          <button onClick={handlerEndGameClick}> End Game</button>
        </div>
        <div className={s.flex}>
          {Object.entries(player2).map(
            ([key, { name, id, img, type, values, selected }]) => (
              <div
                className={cn(s.cardWrap, { [s.picked]:false })}
                onClick={handlerClick}
              >
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
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default FinishPage;
