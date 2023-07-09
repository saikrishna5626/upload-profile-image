import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Avatar from 'react-avatar-edit';
import avator from './avator.jpg';

const Home = () => {
  const [im, setIm] = useState(null);
  const [pim, setPim] = useState(null);
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '0',
      scroll: 'none'
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onCrop = (i) => {
    setIm(i);
  };

  const onClose = () => {
    closeModal();
    setPim(im);
  };

  const fileUploadHandler = () => {
    // Perform the upload logic here
    // You can use the pim state to get the cropped image data
    //console.log('Uploading image:', pim.data);
    if (pim) {
      fetch(pim)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'cropped-image.png', { type: blob.type });
          // Perform the upload logic using the 'file' object
          console.log('Uploading cropped image:', file);
          const formData = new FormData();
          formData.append('image', file);
          axios.post('http://127.0.0.1:8000/imgup/', formData).
            then(res => {
              alert("Image uploaded Succesfully");
              openModal();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('Error converting data URL to file:', error);
        });
    }
  };

  return (
    <>
      <div className='home'>
        <div className='main' onClick={openModal}>
          <div>
            <h1 style={{ color: 'darkblue' }}>Upload Profile Image</h1>
          </div>
          <div>
            <img src={im ? im : avator} alt='Avatar' />
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <div>
            <h1 style={{ color: 'darkblue' }}>Select file to upload</h1>
          </div>
          <Avatar width={390} height={295} onCrop={onCrop} onClose={onClose} />
        </Modal>
      </div>
      <button onClick={fileUploadHandler} style={{ backgroundColor: 'gold', color: 'black' ,width: '60px', fontWeight: 'bold'}}>Upload</button>
    </>
  );
};

export default Home;
