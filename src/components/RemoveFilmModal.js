import React from "react";
import { Modal, Icon, Button, Header } from "semantic-ui-react";

const RemoveFilmModal = ({ deleteFilm, setOpen, open }) => {
  return (
    <Modal
      closeIcon
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="trash" content="Delete Film" />
      <Modal.Content>
        <p>Are you sure you want to delete this film?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={deleteFilm}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveFilmModal;
