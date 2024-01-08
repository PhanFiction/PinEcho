import React from 'react';
import '../../../styles/globals.css';
import Label from '../../../components/Label/Label';
import Layout from '../../../components/Layout';
import DragAndDropImage from '../../../components/DragDropImage/DragDropImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../../../components/ActionButton/ActionButton';

const PinCreationPage = () => {
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
            <DragAndDropImage>
              <FontAwesomeIcon icon={faCircleArrowUp} className="text-2xl hover:text-indianred-100 ease-in" />
              <p>Drag & Drop an image here or click to select</p>
            </DragAndDropImage>
          </div>
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full md:gap-4 md:w-2/4 lg:w-3/5 font-open-sans text-sm lg:gap-4">
            <div className="col-span-2">
              <Label name={"title"} text={"Add a title"} />
            </div>
            <div className="col-span-2">
              <Label name={"description"} text={"Add a description"} />
            </div>
            <div className="col-span-2">
              <Label name={"alt-description"} text={"Add an alt description"} />
            </div>
            <div className="col-span-2">
              <Label name={"url"} text={"Add a link"} />
            </div>
            <div className="col-span-2">
              <ActionButton>
                Save
              </ActionButton>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
};

export default PinCreationPage;