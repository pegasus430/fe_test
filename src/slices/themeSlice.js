import _ from "lodash";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: false
};

export const themeSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = themeSlice.actions

export default themeSlice.reducer

