import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const FilmCard = ({
  Poster,
  Title,
  imdbID,
}) => {
  const navigate = useNavigate();

  return (
    <Card  onClick={() => navigate(`/movie/${imdbID}`)}>
      <Image src={Poster} alt={Title} wrapped  />
      <Card.Content >
        <Card.Header className="cardHeader" >{Title}</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default FilmCard;
