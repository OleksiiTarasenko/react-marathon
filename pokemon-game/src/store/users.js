import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    data: {},
  },
  reducers: {
    fetchUser: () => ({
      isloading: true,
    }),
    updateUser: (state, action) => ({
      isLoading: false,
      data: action.payload,
    }),
    removeUser: () => ({
      isLoading: false,
      data: {},
    }),
  },
});

export const { fetchUser, updateUser, removeUser } = slice.actions;

export const selectUserLoading = (state) => state.user.isLoading;
export const selectUser = (state) => state.user.data;
export const selectLocalId = (state) => state.user.data?.localId;
export const selectEmail = (state) => state.user.data?.email;
export const selectCreated = (state) => state.user.data?.createdAt;
export const getUserUpdateAsync = () => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");
  if (idToken) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        idToken,
      }),
    };
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAViB2abs2aUyOch7caO2Uc7aZ0hCal6vo",
      requestOptions
    ).then((res) => res.json());
    console.log("user response: ", response);
    if (response.hasOwnProperty("error")) {
      localStorage.removeItem("idToken");
      dispatch(removeUser());
    } else {
      dispatch(updateUser(response.users[0]));
      console.log(response.users[0]);
    }
  } else {
    dispatch(removeUser());
  }
};

export const getUserAsync = () => (dispatch) => {
  dispatch(fetchUser());
  dispatch(getUserUpdateAsync());
};

export default slice.reducer;
