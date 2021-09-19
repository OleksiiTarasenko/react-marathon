import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import cn from "classnames";
import { database } from "../../services/firebase";

import Layout from "../../components/Layout/Layout";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

import style from "./style.module.css";

const GamePage = () => {
  const history = useHistory();
  useEffect(() => {
    database.ref("pokemons").once(
      "value",
      (snapshot) => {
        setPokemons(snapshot.val());
      },
      []
    );
  });
  const [pokemons, setPokemons] = useState({});

  const handlerClickButton = () => {
    history.push("/");
  };

  const handlerCardFlip = (id, active, objID) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          pokemon.active = true;
        }

        acc[item[0]] = pokemon;

        return acc;
      }, {});
    });
    database.ref("pokemons/" + objID).set({
      ...pokemons[objID],
      active: !active,
    });
  };

  const handlerAddPokemon = () => {
    const data = {
      abilities: ["keen-eye", "tangled-feet", "big-pecks"],
      stats: {
        hp: 63,
        attack: 60,
        defense: 55,
        "special-attack": 50,
        "special-defense": 50,
        speed: 71,
      },
      type: "flying",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
      name: "pidgeotto",
      base_experience: 122,
      height: 11,
      id: 170,
      values: {
        top: "A",
        right: 2,
        bottom: 7,
        left: 5,
      },
    };
    const newKey = database.ref().child("pokemons").push().key;
    database.ref("pokemons/" + newKey).set(data);
  };

  return (
    <>
      <Layout title="This is the game page!" colorBg="limegreen">
        <div className={cn(style.flex, style.buttonSet)}>
          <button onClick={handlerClickButton}> Return to Homepage </button>
          <button onClick={handlerAddPokemon}> Add Pokemon </button>
        </div>
      </Layout>
      <div className={style.root}>
        <Layout title="Cards" colorBg="silver">
          <div className={style.flex}>
            {Object.entries(pokemons).map(
              ([key, { name, id, img, type, values, active }]) => (
                <PokemonCard
                  key={id}
                  objID={key}
                  name={name}
                  img={img}
                  id={id}
                  type={type}
                  values={values}
                  active={active}
                  onCardFlip={handlerCardFlip}
                />
              )
            )}
          </div>
        </Layout>
      </div>
    </>
  );
};

export default GamePage;
