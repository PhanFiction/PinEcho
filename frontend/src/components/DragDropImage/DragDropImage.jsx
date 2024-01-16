import { useState, createRef } from 'react';

const DragAndDropImage = ({ image, setImage, removeImage, setFileSizeOverLimit, children }) => {
  const [dragging, setDragging] = useState(false);

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
  
  const handleImageDrop = (files) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const file_size = e.target.files[0].size;
    console.log(file_size);
    if (file_size > 50 * 1024 * 1024) { // 50 MB in bytes
      setFileSizeOverLimit(true);
    } else {
      setFileSizeOverLimit(false);
    }
    
    handleImageDrop(files);
  };

  const inputRef = createRef();

  return (
    <div
      className='text-center cursor-pointer'
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {image ? (
        <img src={image} alt="Dropped" className="max-w-full max-h-96 mx-auto" onClick={removeImage}/>
      ) : (
        <>
          <div onClick={handleImageClick}>
            { children }
          </div>
          <input
            type="file"
            accept="image/jpeg, image/png"
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
