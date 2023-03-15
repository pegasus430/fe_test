import React, { useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Card, Button, Image } from "semantic-ui-react";
import RemoveFilmModal from "./RemoveFilmModal";
import FormFilmModal from "./FormFilmModal";
import { removeFilm } from "../slices/filmSlice";
import { useParams, useNavigate } from "react-router-dom";

const Film = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useSelector(state => state.films.value[id]);
  const {
    Poster,
    Title,
    Year,
    Runtime,
    Genre,
    Director,
    imdbID,
  } = data;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const deleteFilm = () => {
    dispatch(removeFilm(imdbID));
    setShowDeleteModal(false);
    navigate('/')
  };

  return (
    <Card fluid centered style={{width: '80%'}}>
        <Card.Content style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Go Back</Card.Content>
      <Image src={Poster} centered alt={Title} wrapped />
      <Card.Content>
        <Card.Header>{Title}</Card.Header>
        <Card.Description>
          <p>Director: {Director}</p>
          <p>Year: {Year}</p>
          <p>Genre: {Genre}</p>
          <p>Runtime: {Runtime}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic onClick={() => setShowDeleteModal(true)} color="red">
            <i className="fas fa-trash" />
          </Button>
          <Button basic onClick={() => setShowEditModal(true)} color="green">
            <i className="fas fa-pencil-alt"></i>
          </Button>
        </div>
      </Card.Content>
      <FormFilmModal
        deleteFilm={deleteFilm}
        setOpen={setShowEditModal}
        open={showEditModal}
        Poster={Poster}
        Title={Title}
        Year={Year}
        Runtime={Runtime}
        Genre={Genre}
        Director={Director}
        imdbID={imdbID}
      />
      <RemoveFilmModal
        deleteFilm={deleteFilm}
        setOpen={setShowDeleteModal}
        open={showDeleteModal}
      />
    </Card>
  );
};

export default Film;
