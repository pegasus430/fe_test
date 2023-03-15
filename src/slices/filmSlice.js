import _ from "lodash";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiKey, baseUrl } from "../config";
import axios from "axios";

const initialState = { value: {}}

export const fetchFilms = createAsyncThunk(
  "films/fetchFilms", async (_, thunkAPI) => {
     try {
        const filmTitle = "war";
        const response = (
          await axios(`${baseUrl}/?s=${filmTitle}&apikey=${apiKey}`)
        ).data.Search;
        const promisesArray = response.map((film) =>
          axios(`${baseUrl}/?t=${film.Title}&apikey=${apiKey}`)
        );
        const values = (await Promise.all(promisesArray)).map(
          (value) => value.data
        );
        return values
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});

export const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    removeFilm: (state, {payload}) => {
      state.value = _.omit(state.value, payload)
    },
    editFilm: (state, {payload}) => {
      state.value[payload.imdbID] = payload
    },
    addFilm: (state, {payload}) => {
      state.value[payload.imdbID] = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchFilms.fulfilled, (state, { payload }) => {
         state.value = {..._.mapKeys(payload, "imdbID")};
   });
  }
})

// Action creators are generated for each case reducer function
export const { editFilm, removeFilm, addFilm } = filmSlice.actions

export default filmSlice.reducer

// export default function (state = {}, action) {
//   const { payload, type } = action;
//   switch (type) {
//     case FETCH_FILMS: {
//       return { ...state, ..._.mapKeys(payload, "imdbID") };
//     }
//     case REMOVE_FILM: {
//       return _.omit(state, payload);
//     }
//     case EDIT_FILM: {
//       return { ...state, [payload.imdbID]: payload };
//     }
//     case ADD_FILM: {
//       return { ...state, [payload.imdbID]: payload };
//     }
//     default:
//       return state;
//   }
// }
