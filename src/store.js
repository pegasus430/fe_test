import { configureStore } from '@reduxjs/toolkit'
import filmSlice from "./slices/filmSlice";
import themeSlice from "./slices/themeSlice";

const store = configureStore({
    reducer: {
        films: filmSlice,
        theme: themeSlice
    }
});

export default store;
