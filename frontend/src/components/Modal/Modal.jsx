import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Modal({ title, handlePinLike, pinLiked, children }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <FontAwesomeIcon className="text-2xl hover:cursor-pointer" icon={faComment} onClick={() => setShowModal(true)}/>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden 
            overflow-y-auto fixed bottom-0 left-0 right-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-0 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="w-full flex gap-4 items-center">
                    <FontAwesomeIcon icon={faXmark} className="text-2xl" onClick={() => setShowModal(false)}/>
                    <h4 className="text-lg font-semibold">
                      {title} Comments
                    </h4>
                    <FontAwesomeIcon
                      className={`cursor-pointer ease-in duration-300 ml-auto text-2xl ${pinLiked ? 'text-red': 'text-black'}`}
                      icon={faHeart}
                      onClick={handlePinLike}
                    />
                  </div>
                </div>
                {/*Body and Commenting button */}
                <div className="mt-4">
                  { children }
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}