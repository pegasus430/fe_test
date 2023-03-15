import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilmList from "./components/FilmList";
import Header from "./components/Header";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Film from "./components/Film";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { fetchFilms } from "./slices/filmSlice";

const App = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  
  useEffect(() => {
    dispatch(fetchFilms())
  }, [dispatch]);

  return (
    <div className={darkMode ? "App inverse" : "App"}>
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path='/' element={<FilmList />} />
      <Route path='/movie/:id'
      element={
        <ProtectedRoute >
          <Film />
        </ProtectedRoute>
      }
      />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
