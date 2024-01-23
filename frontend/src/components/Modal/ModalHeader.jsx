import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';

const ModalHeader = ({ title, pinLiked, handlePinLike, setShowModal, showDeleteModal, toggleDeleteModal, isCreator, children }) => {
  return (
    <>
    {
      showDeleteModal ? 
      <></>
    : (
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <div className="w-full flex gap-4 items-center">
              <FontAwesomeIcon icon={faXmark} className="text-2xl cursor-pointer" onClick={() => setShowModal(false)}/>
              <h4 className="text-lg font-semibold">
                {title} Comments
              </h4>
              <div className="flex ml-auto gap-4">
                {
                  isCreator ? 
                  (
                    <FontAwesomeIcon
                      className={`cursor-pointer ease-in duration-300 text-2xl hover:text-red text-black`}
                      icon={faTrash}
                      onClick={toggleDeleteModal}
                    />
                  ): null
                }
                <FontAwesomeIcon
                  className={`cursor-pointer ease-in duration-300 text-2xl ${pinLiked ? 'text-red': 'text-black'}`}
                  icon={faHeart}
                  onClick={handlePinLike}
                />
              </div>
            </div>
          </div>
          {/*Body and Commenting button */}
          <div className="mt-4">
            { children }
          </div>
        </div> 
      )
    }
    </>
  )
}

export default ModalHeader;