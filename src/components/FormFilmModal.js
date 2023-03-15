import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Modal, Header, Form, Button } from "semantic-ui-react";
import { addFilm, editFilm } from "../slices/filmSlice";
import { formProperties } from "../helpers/formProperties";
import { v4 as uuidv4 } from 'uuid';

const FormFilmModal = ({
  Title,
  Director,
  Year,
  Runtime,
  Genre,
  Poster,
  imdbID,
  setOpen,
  open,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    Title,
    Director,
    Year,
    Runtime,
    Genre,
    Poster,
    imdbID,
  });
  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = () => {
    const formValues = state;
    const errorsObject = validate(formValues);
    const isFormValid = _.isEmpty(errorsObject);
    if (isFormValid) {
      if (!imdbID) {
        dispatch(addFilm({ ...formValues, imdbID: uuidv4() }));
        setState({ Poster });
      } else {
        dispatch(editFilm(formValues));
      }
      setOpen(false);
    }
    setErrors(validate(formValues));
  };

  const films = useSelector((state) => state.films.value);

  const isDateValid = (val) => {
    const date = Date.parse(val);
    return !isNaN(date);
  };

  const doesTitleExist = (val) => {
    const filmsExcludingCurrentFilm = _.filter(
      films,
      (film) => film.imdbID !== imdbID
    );
    return _.some(
      filmsExcludingCurrentFilm,
      (film) => _.toLower(film.Title) === _.toLower(val)
    );
  };

  const validate = (formValues) => {
    const errors = {};
    const { Title, Director, Year, Genre, Runtime } = formValues;
    if (!Title) {
      errors.Title = "Title cannot be empty";
    }
    if (doesTitleExist(Title)) {
      errors.Title = "Title already exists";
    }
    if (!Director) {
      errors.Director = `Must specify a director"s name`;
    }
    if (!Year || Year.length !== 4 || !isDateValid(Year)) {
      errors.Year = "Year must be entered with four digits, e.g. 1976";
    }
    if (!Genre) {
      errors.Genre = "Must specify a genre";
    }
    if (!Runtime) {
      errors.Runtime = "Must specify a runtime";
    }
    return errors;
  };

  return (
    <Modal
      closeIcon
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header
        icon={imdbID ? "pencil" : "add"}
        content={imdbID ? "Edit Film" : "Add Film"}
      />
      <Modal.Content>
        <Form onSubmit={submit}>
          {_.map(formProperties, (field, i) => {
            const { label, name } = field;
            return (
              <Form.Field
                key={i}
                control="input"
                label={label}
                name={name}
                value={state[name]}
                onChange={onInputChange}
                error={errors[name]}
              />
            );
          })}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={submit}>
          {imdbID ? "Save Changes" : "Add Film"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FormFilmModal;
