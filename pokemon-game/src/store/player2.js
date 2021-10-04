import { createSlice } from "@reduxjs/toolkit";


export const slice = createSlice({
  name: "player2",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    selectedPlayer2: {}
  },
  reducers: {
    fetchPlayer2: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPlayer2Resolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPlayer2Reject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    handlerSelectedPlayer2: (state, action) => ({
      ...state,
      
        }),
   
 /*    getPlayer2: (state, action) => ({
      ...state,
      data: action.payload,
    }),  */
  },
});

export const {
  getPlayer2,
  fetchPlayer2,
  fetchPlayer2Resolve,
  fetchPlayer2Reject,
} = slice.actions;

export const selectPlayer2Loading = (state) => state.player2.isLoading;
export const selectPlayer2Data = (state) => state.player2.data;



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
 
}; */

export const getPlayer2Async = (state) => async (dispatch) => {
  dispatch(fetchPlayer2());
  const player2Response = await fetch(
    "https://reactmarathon-api.netlify.app/api/create-player"
  );
  const player2Request = await player2Response.json();
  dispatch(fetchPlayer2Resolve(player2Request))
}

export default slice.reducer;