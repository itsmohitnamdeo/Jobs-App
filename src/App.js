import React, { useState, useEffect } from 'react';
import Card from './Card';
import AddCardModal from './AddCardModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem('cards')) || [
      { id: 1, title: 'Card 1', description: 'Description for Card 1', column: 'To Do' },
      { id: 2, title: 'Card 2', description: 'Description for Card 2', column: 'Doing' },
      { id: 3, title: 'Card 3', description: 'Description for Card 3', column: 'Done' }
    ]
  );
  const [showModal, setShowModal] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [editData, setEditData] = useState(null); 
  
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleCardClick = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  const handleAddCard = (newCard) => {
    setCards([...cards, { id: Date.now(), ...newCard }]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleEdit = (editedCard) => {
    const updatedCards = cards.map(card => (card.id === editedCard.id ? editedCard : card));
    setCards(updatedCards);
    setShowModal(false);
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const updatedCards = cards.map(card => {
      if (card.id === parseInt(cardId)) {
        return { ...card, column: columnId };
      }
      return card;
    });
    setCards(updatedCards);
    setDragOverColumn(null);
  };

  const handleDelete = (cardId) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
  };

  return (
    <div className="container-fluid mt-5">
      <h2 className="text-center fw-bold">Cards App</h2>
      <button className="btn btn-primary mb-3 mx-auto d-block" onClick={() => setShowModal(true)}>
        Add Card <i className="fa fa-plus-circle"></i>
      </button>
      <div className="row justify-content-around">
        {['To Do', 'Doing', 'Done'].map((columnId) => (
          <div key={columnId} className={`col-md-3 column ${dragOverColumn === columnId ? 'drop-target' : 'non-drop-target'}`} 
               onDrop={(e) => handleDrop(e, columnId)} 
               onDragOver={(e) => handleDragOver(e, columnId)}>
            <h3 className="text-left fw-bold">{columnId}</h3>
            {cards.filter(card => card.column === columnId).map((card, index) => (
              <Card key={card.id} {...card} handleCardClick={handleCardClick} handleDragStart={handleDragStart} handleDelete={handleDelete} />
            ))}
          </div>
        ))}
      </div>
      <AddCardModal show={showModal} handleClose={handleCloseModal} handleAddCard={handleAddCard} handleEdit={handleEdit} handleDeleteCard={handleDelete} cardData={editData} />
    </div>
  );
};

export default App;
