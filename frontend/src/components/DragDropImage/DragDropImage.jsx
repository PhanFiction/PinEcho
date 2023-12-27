import React, { useState } from 'react';
import '../../styles/globals.css';

const DragAndDropImage = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleImageDrop(e.dataTransfer.files);
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleImageDrop(files);
  };

  const handleImageDrop = (files) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const inputRef = React.createRef();

  return (
    <div
      className='text-center cursor-pointer'
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleImageClick}
    >
      {image ? (
        <img src={image} alt="Dropped" className="max-w-full max-h-96 mx-auto" />
      ) : (
        <>
          { children }
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};


export default DragAndDropImage;
