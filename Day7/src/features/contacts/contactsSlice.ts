import {createAsyncThunk,createSlice,} from "@reduxjs/toolkit";
import type {Contact,ContactsState,} from "../../types";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts",
    async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.status}`);
    }
      const data = await response.json();
      return data as Contact[];
    }
  );

const initialState: ContactsState ={
    contacts: [],
    status: "idle",
    error: null,
  };

const contactsSlice =createSlice({
    name: "contacts",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder.addCase(
          fetchContacts.pending,
          (state) => {
            state.status = "loading";
            state.error = null;
          }
        )

        .addCase(
          fetchContacts.fulfilled,
          (
            state,
            action
          ) => {
            state.status = "succeeded";
            state.contacts =
              action.payload;
          }
        )

        .addCase(
          fetchContacts.rejected,
          (
            state,
            action
          ) => {
            state.status = "failed";
            state.error =
              action.error.message ??
              "Failed to fetch contacts";
          }
        );
    },
  });

export default contactsSlice.reducer;