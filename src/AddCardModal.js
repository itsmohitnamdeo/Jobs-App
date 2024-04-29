import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCardModal = ({ show, handleClose, handleAddCard, handleEdit, handleDeleteCard, cardData }) => {
  const [title, setTitle] = useState(cardData ? cardData.title : '');
  const [description, setDescription] = useState(cardData ? cardData.description : '');
  const [selectedColumn, setSelectedColumn] = useState(cardData ? cardData.column : 'To Do');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(cardData ? cardData.title : '');
    setDescription(cardData ? cardData.description : '');
    setSelectedColumn(cardData ? cardData.column : 'To Do');
    setError('');
  }, [cardData]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
      setTitle(value);
      setError('');
    } else {
      setError('Title should contain only alphabets.');
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value.length >= 25) {
      setError('');
    } else {
      setError('Description should be at least 25 characters.');
    }
  };

  const handleSubmit = () => {
    if (title.trim() === '' || description.trim() === '') {
      setError('Title and description are required.');
      return;
    }
    if (cardData) {
      // Edit existing card
      handleEdit({ id: cardData.id, title, description, column: selectedColumn });
    } else {
      // Add new card
      handleAddCard({ title, description, column: selectedColumn });
    }
    setTitle('');
    setDescription('');
    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      handleDeleteCard(cardData.id);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{cardData ? 'Edit Card' : 'Add Card'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
          </Form.Group>
          <Form.Group controlId="column">
            <Form.Label>Column</Form.Label>
            <Form.Control as="select" value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </Form.Control>
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {cardData && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>{cardData ? 'Save Changes' : 'Add Card'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCardModal;
