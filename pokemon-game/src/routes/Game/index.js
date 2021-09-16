import { useState } from "react";
import { useHistory } from "react-router";
import Layout from "../../components/Layout/Layout";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

import { POKEMONS } from "../../assets/pokemonSquad";

import style from "./style.module.css";

/* const pokemonsMutable = POKEMONS.map((item) =>
  Object.defineProperty(item, "active", {
    value: true,
    writable: true,
    enumerable: true,
    configurable: true,
  })
); */

const GamePage = () => {
  const history = useHistory();

  const [pokemons, setPokemons] = useState([...POKEMONS]);

  const handlerClickButton = () => {
    history.push("/");
  };

  const handlerCardFlip = (id) => {
    setPokemons(
      pokemons.map((item) => {
        if (item.id === id) {
          item.active = !item.active;
        }

        return item;
      })
    );
  };

  return (
    <>
      <div className={style.root}>
        <h1 className={style.title}>This is the game page!</h1>
        <button onClick={handlerClickButton}> Return to Homepage </button>

        <Layout title="Cards" colorBg="silver">
          <div className={style.flex}>
            {pokemons.map((item) => (
              <PokemonCard
                key={item.id}
                name={item.name}
                img={item.img}
                id={item.id}
                type={item.type}
                values={item.values}
                active={item.active}
                onCardFlip={handlerCardFlip}
              />
            ))}
          </div>
        </Layout>
      </div>
    </>
  );
};

export default GamePage;
