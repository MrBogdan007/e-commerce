import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { User, UserReducer } from "../../types/users";

const initialState: UserReducer = {
  users: [],
  currentUser: undefined,
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const response = await axios.get("users");
  return response.data;
});

export const authenticate = createAsyncThunk(
  "authenticate",
  async (token: string) => {
    if (token) {
      try {
        const response = await axios.get("auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = undefined;
      localStorage.clear();
    },
  },
  extraReducers: (build) => {
    build
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.users = action.payload;
        }
      )
      .addCase(authenticate.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
      });
  },
});
const userReducer = userSlice.reducer;

export const { logOut } = userSlice.actions;
export default userReducer;
