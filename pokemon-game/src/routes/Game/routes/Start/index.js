import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
/* import cn from "classnames"; */

/* import { FirebaseContext } from "../../../../context/Firebase"; */
/* import Layout from "../../../../components/Layout/Layout"; */
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";

import style from "./style.module.css";
import { PokemonContext } from "../../../../context/pokemonContext";
import { useDispatch, useSelector } from "react-redux";
import {
  /*  getPokemons, */
  getPokemonsAsync,
  selectPokemonsData,
  selectPokemon,
  selectSelectedData,
  deletePokemon,
 
  /* selectPokemonsLoading, */
} from "../../../../store/pokemons";

const StartPage = () => {
  /*  const firebase = useContext(FirebaseContext); */
  const pokemonsContext = useContext(PokemonContext);
  /*   const isLoading = useSelector(selectPokemonsLoading); */
  const pokemonsRedux = useSelector(selectPokemonsData);
  const pokemonsSelectedRedux = useSelector(selectSelectedData);
  const dispatch = useDispatch();

 /*  console.log("###: PokemonsREDUX", pokemonsRedux); */
  console.log("###: SelectedREDUX", pokemonsSelectedRedux);
  const history = useHistory();

  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    dispatch(getPokemonsAsync());
    /*   firebase.getPokemonSocket((pokemons) => {
      setPokemons(pokemons);
    }); */

    /* return () => firebase.offPokemonSocket(); */
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const handlerChangeSelected = (key) => {
    const pokemon = { ...pokemons[key] };
    console.log("%%%% selected", pokemon);
    console.log("###: SelectedREDUX", pokemonsSelectedRedux);
   /*  const arr = [...pokemonsSelectedRedux]
    const index =arr.indexOf(pokemon)
    console.log('key: ', pokemon.id, 'index:', index) */
    dispatch(selectPokemon(pokemon))
    /* if (pokemon.id in pokemonsSelectedRedux) {
      
      dispatch(deletePokemon(index)) 
    } else {
      dispatch(selectPokemon(pokemon))
    }
    ; */

   

    pokemonsContext.onSelectedPokemons(key, pokemon);

    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handlerStartGameClick = () => {
    history.push("game/board");
  };

  return (
    <>
      <div className={style.buttonWrap}>
        <button
          onClick={handlerStartGameClick}
          disabled={Object.keys(pokemonsContext.pokemons).length < 5}
        >
          {" "}
          Start Game{" "}
        </button>
      </div>

      <div className={style.root}>
        <div className={style.flex}>
          {Object.entries(pokemons).map(
            ([key, { name, id, img, type, values, selected }]) => (
              <PokemonCard
                className={style.card}
                key={id}
                objID={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                active={true}
                isSelected={selected}
                onCardFlip={() => {
                  if (
                    Object.keys(pokemonsContext.pokemons).length < 5 ||
                    selected
                  ) {
                    handlerChangeSelected(key);
                  }
                }}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default StartPage;
