import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import expressServer from '../../api/express-server';

import './Generate.css';

function displayImageToGIFModal({ isImageToGIFModalOpen, toggleImageToGIFModal, myImages, handleImageSelection }) {
  const convertToGIF = () => {
    const selectedImages = myImages.filter(image => image.isSelected);
    const imagesToConvert = selectedImages.map(image => image.base64);
    expressServer.convertToGIF(1, imagesToConvert).then((response) => {
      if (response.status === 201) {
        toggleImageToGIFModal();
      } else {
        console.log('Error converting images to GIF: ', response);
      }
    }).catch((error) => {
      console.log('Error converting images to GIF: ', error);
    });
  }

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
        <Button onClick={convertToGIF}>Convertir</Button>
        <Button onClick={toggleImageToGIFModal}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function displayGIFToImageModal({ isGIFToImageModalOpen, toggleGIFToImageModal, myGIFs, handleGIFSelection }) {
  const convertToImage = () => {
    const selectedGIF = myGIFs.filter(gif => gif.isSelected);
    const gifToConvert = selectedGIF.map(gif => gif.base64);
    expressServer.convertToImage(1, gifToConvert).then((response) => {
      if (response.status === 201) {
        toggleGIFToImageModal();
      } else {
        console.log('Error converting GIFs to images: ', response);
      }
    }).catch((error) => {
      console.log('Error converting GIFs to images: ', error);
    });
  }

  return (
    <Modal show={isGIFToImageModalOpen} onHide={toggleGIFToImageModal}>
      <Modal.Header closeButton>
        <Modal.Title>Convertir plusieurs GIF en images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {myGIFs.map((gif, index) => (
          <div key={index} className='image-container'>
            <img src={gif.base64} alt={`GIF ${index}`} onClick={() => handleGIFSelection(index)} />
            {gif.isSelected && (
              <div className='select-circle' />
            )}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={convertToImage}>Convertir</Button>
        <Button onClick={toggleGIFToImageModal}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Generate() {
  const [isImageToGIFModalOpen, setIsImageToGIFModalOpen] = useState(false);
  const [myImages, setMyImages] = useState([]);
  const [isGIFToImageModalOpen, setIsGIFToImageModalOpen] = useState(false);
  const [myGIFs, setMyGIFs] = useState([]);

  useEffect(() => {
    expressServer.getMyImages(1).then((images) => {
      const imagesWithSelection = images.data.map(image => ({ ...image, isSelected: false }));
      setMyImages(imagesWithSelection);
    });

    expressServer.getMyGIFs(1).then((gifs) => {
      const gifsWithSelection = gifs.data.map(gif => ({ ...gif, isSelected: false }));
      setMyGIFs(gifsWithSelection);
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

  const toggleGIFToImageModal = () => {
    setIsGIFToImageModalOpen(!isGIFToImageModalOpen);
    const updatedGIFs = [...myGIFs];
    updatedGIFs.forEach(gif => gif.isSelected = false);
    setMyGIFs(updatedGIFs);
  }

  const handleGIFSelection = (index) => {
    const updatedGIFs = [...myGIFs];
    updatedGIFs.forEach(gif => gif.isSelected = false);
    updatedGIFs[index].isSelected = !updatedGIFs[index].isSelected;
    setMyGIFs(updatedGIFs);
  }

  return (
    <div>
      <Button onClick={toggleImageToGIFModal}>Image to GIF</Button>
      <Button onClick={toggleGIFToImageModal}>GIF to Image</Button>

      {isImageToGIFModalOpen && displayImageToGIFModal({ isImageToGIFModalOpen, toggleImageToGIFModal, myImages, handleImageSelection })}
      {isGIFToImageModalOpen && displayGIFToImageModal({ isGIFToImageModalOpen, toggleGIFToImageModal, myGIFs, handleGIFSelection })}
    </div>
  );
}
export default Generate;
