import { useState } from 'react';
import Label from '../../../components/Label/Label';
import Layout from '../../../components/Layout';
import DragAndDropImage from '../../../components/DragDropImage/DragDropImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../../../components/ActionButton/ActionButton';
import { createPin } from '../../../service/pinService';

const PinCreationPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [isFileSizeOverLimit, setFileSizeOverLimit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      title,
      description,
      altText,
      link,
      image,
    }
    await createPin(newPin);
    setFileSizeOverLimit(false);
  }

  const removeImage = () => {
    setImage(null);
  }

  return(
    <Layout>
      <section className="w-full lg:h-screen flex flex-col justify-center items-center font-[var(--font-open-sans)]">
        <h1 className="mt-16 font-semibold text-2xl border-b-2">Create Pin</h1>
        <div 
          className="max-w-screen-lg rounded-2xl
          shadow-md flex justify-evenly flex-col 
          items-center sm:flex-row gap-8 p-8 desktop-large:mt-0"
        >
          <div className="bg-lightgray rounded-lg p-8 md:h-96 flex items-center flex-col justify-center">
            <DragAndDropImage image={image} setImage={setImage} removeImage={removeImage} setFileSizeOverLimit={setFileSizeOverLimit}>
              <FontAwesomeIcon icon={faCircleArrowUp} className="text-2xl hover:text-indianred-100 ease-in" onClick={removeImage}/>
              <p>Drag & Drop an image here or click to select</p>
            </DragAndDropImage>
          </div>
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full md:gap-4 md:w-2/4 lg:w-3/5 font-open-sans text-sm lg:gap-4">
            <div className="col-span-2">
              <Label name={"title"} text={"Add a title"} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <div className="col-span-2">
              <Label name={"description"} text={"Add a description"} onChange={(e) => {setDescription(e.target.value)}}/>
            </div>
            <div className="col-span-2">
              <Label name={"alt-description"} text={"Add an alt description"} onChange={(e) => {setAltText(e.target.value)}}/>
            </div>
            <div className="col-span-2">
              <Label name={"url"} text={"Add a link"} onChange={(e)=>{setLink(e.target.value)}}/>
            </div>
            <div className="col-span-2 mt-2">
              <ActionButton handleClick={handleSubmit} disable={isFileSizeOverLimit}>
                {isFileSizeOverLimit ? "File is to big" : "Create"}
              </ActionButton>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
};

export default PinCreationPage;