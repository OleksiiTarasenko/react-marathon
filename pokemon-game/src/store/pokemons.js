import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../services/firebase";

export const slice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    selectedPokemons: [],
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    selectPokemon: (state, action) => ({
      ...state,
      selectedPokemons: {
        ...state.selectedPokemons,
        /* [action.payload.id]: {...action.payload, selected: !action.payload.id.selected} */
        [action.payload.id]: action.payload,
      },
    }),
    deletePokemon: (state, action) => ({
      ...state,
      selectedPokemons: state.selectedPokemons.filter((item, index) => !action.payload ),
      
    }),


    /*    getPokemons: (state, action) => ({
      ...state,
      data: action.payload,
    }),  */
  },
});

export const {
  getPokemons,
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
  selectPokemon,
  deletePokemon,
} = slice.actions;

export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
export const selectPokemonsData = (state) => state.pokemons.data;
export const selectSelectedData = (state) => state.pokemons.selectedPokemons;
export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons());
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data));
};
/* export const selectPokemon = (state, action) => {
  return {
    ...state,
    [action.payload]:action.payload
 }
} */
/* export const setSelected = (state,action) => {

  if (state.data.selected[action.payload.key]) {
    const copyState = {...state.date.selected }
    delete copyState[action.payload.key];
    return {
      ...state,
      data: copyState
    };

  }
  return {
     ...state,
   [action.payload.key]:action.payload.pokemon
  }
 
};
 */
/* export const getPlayer2 = (state) => async (dispatch) => {
  dispatch(fetchPokemons());
  const player2Response = await fetch(
    "https://reactmarathon-api.netlify.app/api/create-player"
  );
  const player2Request = await player2Response.json();
  dispatch(fetchPokemonsResolve(player2Request))
} */

export default slice.reducer;
