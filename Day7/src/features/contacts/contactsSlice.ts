import {createAsyncThunk,createSlice,} from "@reduxjs/toolkit";
import type {Contact,ContactsState,} from "../../types";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts",
    async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      return data as Contact[];
    }
  );

const initialState: ContactsState ={
    contacts: [],
    loading: false,
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
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchContacts.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;
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
            state.loading = false;
            state.error =
              action.error.message ??
              "Failed to fetch contacts";
          }
        );
    },
  });

export default contactsSlice.reducer;