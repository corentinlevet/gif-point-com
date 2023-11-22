import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import expressServer from '../../api/express-server';

import './Generate.css';

function displayImageToGIFModal({ isImageToGIFModalOpen, toggleImageToGIFModal, myImages, handleImageSelection }) {
  return (
    <Modal show={isImageToGIFModalOpen} onHide={toggleImageToGIFModal}>
      <Modal.Header closeButton>
        <Modal.Title>Convertir plusieurs images en GIF</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {myImages.map((image, index) => (
          <div key={index} className='image-container'>
            <img src={image.base64} alt={`Image ${index}`} onClick={() => handleImageSelection(index)} />
            {image.isSelected && (
              <div className='select-circle' />
            )}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleImageToGIFModal}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Generate() {
  const [isImageToGIFModalOpen, setIsImageToGIFModalOpen] = useState(false);
  const [myImages, setMyImages] = useState([]);

  useEffect(() => {
    expressServer.getMyImages(1).then((images) => {
      const imagesWithSelection = images.data.map(image => ({ ...image, isSelected: false }));
      setMyImages(imagesWithSelection);
    });
  }, []);

  const toggleImageToGIFModal = () => {
    setIsImageToGIFModalOpen(!isImageToGIFModalOpen);
    const updatedImages = [...myImages];
    updatedImages.forEach(image => image.isSelected = false);
    setMyImages(updatedImages);
  }

  const handleImageSelection = (index) => {
    const updatedImages = [...myImages];
    updatedImages[index].isSelected = !updatedImages[index].isSelected;
    setMyImages(updatedImages);
  }

  return (
    <div>
      <Button onClick={toggleImageToGIFModal}>Ouvrir la modal</Button>

      {isImageToGIFModalOpen && (
        displayImageToGIFModal({ isImageToGIFModalOpen, toggleImageToGIFModal, myImages, handleImageSelection })
      )}
    </div>
  );
}
export default Generate;
