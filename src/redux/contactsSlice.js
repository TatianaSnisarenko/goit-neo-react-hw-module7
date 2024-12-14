import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  items: [],
};

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare: (name, number) => {
        const id = nanoid();
        return { payload: { id, name, number } };
      },
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, deleteContact } = slice.actions;
export default slice.reducer;
