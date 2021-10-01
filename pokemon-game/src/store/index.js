import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './counter'
import pokemonsReducer from './pokemons'
import player2Reducer from './player2'

export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer,
        player2: player2Reducer,
    }
})