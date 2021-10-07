import { useState, useContext } from "react";
import { useHistory } from "react-router";

import { PokemonContext } from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import s from "./style.module.css";
import { FirebaseContext } from "../../../../context/Firebase";
import cn from "classnames";
import { useSelector } from "react-redux";
import { selectLocalId } from "../../../../store/users";

const FinishPage = () => {
  const firebase = useContext(FirebaseContext);
  console.log(firebase)
  const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();
  const localId = useSelector(selectLocalId);

const [pickedCard, setPickedCard] = useState([])

  const pokemons = pokemonsContext.pokemons;
  const player2 = pokemonsContext.pokemons2;
  const winner = pokemonsContext.winner;
  
  const [isSelected, setSelected] = useState(null)

  const handlerEndGameClick = async () => {
    if (pickedCard && winner) {

     /*  firebase.addPokemon(pickedCard[0], async () => {
      await firebase.getPokemonsOnce(); */
   
     await fetch( `https://pokemon-game-1222d-default-rtdb.europe-west1.firebasedatabase.app/${localId}/pokemons.json?auth=${localStorage.getItem('idToken')}`, {
      method: 'POST',
    body: JSON.stringify(pickedCard[0])
    })}
    pokemonsContext.clear();
    history.replace("/game");
  };

  const handlerClick = (event, id) => {
    const pickedCardName = event.target.children[0].innerText.split("\n")[5];
    setSelected(pickedCardName)
     
  
 
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
          <button onClick={handlerEndGameClick}  disabled={pickedCard.length<1 && winner}> End Game</button>
        </div>
        <div className={s.flex}>
          {Object.entries(player2).map(
            ([key, { name, id, img, type, values, selected }]) => (
              <div
                className={cn(s.cardWrap, { [s.picked]:isSelected === name })}
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
