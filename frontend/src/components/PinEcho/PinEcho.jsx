import { useState } from 'react';
import UserIcon from '../UserIcon/UserIcon';
import CircleBackground from '../CircleBackground/CircleBackground';
import ToggleArrow from '../ToggleArrow/ToggleArrow';
import Comment from '../Comment/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faHeart, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import ModalComment from '../Modal/ModalComment';
import ModalHeader from '../Modal/ModalHeader';
import Image from 'next/image';
import ActionButton from '../ActionButton/ActionButton';

const PinEcho = ({ 
    pinId, pinCreator, title, altText, description, 
    imgPath, comments, link, handleSavePin, 
    message, handleMessageChange, handleSubmitComment, 
    user, handleCommentLike, pinSaved, pinLiked, handlePinLike, handleDeletePin, isCreator }) => {
  const [show, setShowComment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleComments = () => setShowComment(!show);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  if(!(pinId || title || description || comments)) return (<></>);

  return (
    <>
      <Modal showModal={showDeleteModal}>
        <div className="flex justify-center p-5 text-2xl">
          <h3 className="font-semibold">Delete this Pin</h3>
        </div>
        <div className="p-5 text-md">
          <p>Are you sure you want to delete the pin</p>
        </div>
        <div className="flex flex-col p-5 gap-4">
          <ActionButton bgColor="lightgray" hoverColor="darkgray" textColor="text-black" handleClick={toggleDeleteModal}>
            Cancel
          </ActionButton>
          <ActionButton handleClick={handleDeletePin}>
            Confirm
          </ActionButton>
        </div>
      </Modal>

      <section className="flex items-center justify-center h-full p-4 mt-24 lg:mt-8">
        <div className="w-11/12 lg:w-8/12 flex flex-col rounded-md gap-4 m-0 sm:m-2 lg:m-12 lg:flex-row shadow-md">
          <div className="w-full lg:w-8/12 overflow-hidden relative">
            <Image
              src={imgPath.path}
              alt={title}
              className="sm:rounded-md w-full h-full object-cover"
              width={100}
              height={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              layout="responsive"
            />
          </div>
          {/*Content */}
          <div className="flex w-full lg:w-6/12 flex-col gap-4 p-4">
            <div className="hidden desktop-large:flex items-center justify-between w-full">
              <div className="w-28">
                {
                  pinSaved ?
                  <ActionButton bgColor="firebrick" handleClick={handleSavePin}>
                    <span className="font-semibold text-white">
                      Saved
                    </span>
                  </ActionButton>
                  :
                  <ActionButton handleClick={handleSavePin}>
                    <span className="font-semibold text-white">
                      Save
                    </span>
                  </ActionButton>
                }
              </div>
              <div className="flex gap-4">
                {
                  isCreator ? 
                  (
                    <FontAwesomeIcon
                      className={`cursor-pointer ease-in duration-300 ml-auto text-2xl hover:text-red text-black`}
                      icon={faTrash}
                      onClick={toggleDeleteModal}
                    />
                  ): <></>
                }
                <FontAwesomeIcon
                  className={`cursor-pointer ease-in duration-300 ml-auto text-2xl hover:text-red text-black ${pinLiked ? 'text-red': 'text-black'}`}
                  icon={faHeart}
                  onClick={handlePinLike}
                />
              </div>
            </div>
            <a href={link} target="href" className="text-red text-lg underline truncate">{link}</a>
            <h2 className="font-semibold text-xl">{title}</h2>
            <p className="font-opensans">{description}</p>
            <p className="font-opensans">{altText}</p>
            <div className="flex gap-4 items-center">
              <CircleBackground md>
                <UserIcon name={pinCreator.username} imgName={pinCreator.profileImage ? pinCreator.profileImage.path : ""}/>
              </CircleBackground>
              <div className="flex flex-col">
                <p className="font-semibold text-lg">{pinCreator.username}</p>
                <p>{pinCreator.followers} Followers</p>
              </div>
            </div>
            {/*Mobile and Tablet view for comments*/}
            <div className="flex items-center justify-between gap-8 mt-4 desktop-large:hidden">
              <div className="w-28 rounded-lg bg-red text-white">
                {
                  pinSaved ?
                  <ActionButton bgColor="firebrick" handleClick={handleSavePin}>
                    <span className="font-semibold text-white">
                      Saved
                    </span>
                  </ActionButton>
                  :
                  <ActionButton handleClick={handleSavePin}>
                    <span className="font-semibold text-white">
                      Save
                    </span>
                  </ActionButton>
                }
              </div>
              <div>
                <FontAwesomeIcon className="text-2xl hover:cursor-pointer" icon={faComment} onClick={() => setShowModal(true)}/>
              </div>
              <Modal showModal={showModal}>
                <ModalHeader
                  title={comments.length} 
                  handlePinLike={handlePinLike} 
                  pinLiked={pinLiked}
                  setShowModal={setShowModal}
                  toggleDeleteModal={toggleDeleteModal}
                  isCreator={isCreator}
                  showDeleteModal={showDeleteModal}
                >
                  <div className="flex flex-col gap-4 w-full h-96">
                  {
                    comments.length < 1 ? (
                      <div className="mt-auto bg-black">
                        <ModalComment
                          username={user.username}
                          profileImg={user.profileImage ? user.profileImage.path : ""}
                          message={message}
                          handleChange={handleMessageChange}
                          handleSubmit={handleSubmitComment}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="overflow-scroll no-scrollbar">
                          {comments.map((item, index) => (
                            <Comment key={index} 
                              username={item.creator.username} 
                              comment={item.comment} 
                              likes={item.likes.length} 
                              timeStamp={item.date}
                              handleCommentLike={handleCommentLike}
                              commentId={item._id}
                              isLiked={item.isLiked}
                            >
                              <CircleBackground md={true}>
                                <UserIcon name={item.username} imgName={item.creator.profileImage ? item.creator.profileImage.path : ""}/>
                              </CircleBackground>
                            </Comment>
                          ))}
                        </div>
                        <div className="mt-auto bg-black">
                          <ModalComment
                            username={user.username}
                            profileImg={user.profileImage ? user.profileImage.path : ""}
                            message={message}
                            handleChange={handleMessageChange}
                            handleSubmit={handleSubmitComment}
                          />
                        </div>
                      </>
                    )
                  }
                  </div>
                </ModalHeader>
              </Modal>
            </div>

            {/*Comment and Save button section for desktop*/}
            {
              comments.length > 0 ?
              <>
                <div className="justify-between mt-8 w-full hidden desktop-large:flex">
                  <h3 className="font-semibold">{comments.length} Comment</h3>
                  <ToggleArrow toggle={show} handleToggle={toggleComments} />
                </div>
                <div className="w-full">
                  {
                    show ?
                      <div className="flex-col gap-8 p-1 w-full h-64 overflow-scroll no-scrollbar desktop-large:flex">
                        {
                          comments.map((item, index) =>
                            <Comment key={index} 
                              username={item.creator.username} 
                              comment={item.comment} 
                              likes={item.likes.length} 
                              timeStamp={item.date}
                              handleCommentLike={handleCommentLike}
                              commentId={item._id}
                              isLiked={item.isLiked}
                            >
                              <div className="mt-2 text-black">
                                <CircleBackground md={true}>
                                  <UserIcon name={item.creator.username} imgName={item.creator.profileImage ? item.creator.profileImage.path : ""}/>
                                </CircleBackground>
                              </div>
                            </Comment>
                          )
                        }
                      </div>
                    :
                    <></>
                  }
                  {/*Comment and Save button section for Desktop */}
                </div>
              </>
              : 
              <h3 className="font-semibold mt-4">{comments.length} Comments</h3>
            }
            <div className="border-t-2 my-4 w-full desktop-large:block"></div>
            <div className="gap-4 p-2 items-center hidden desktop-large:flex">
              <span>
                <CircleBackground md={true}>
                  <UserIcon name={user.username} imgName={user.profileImage ? user.profileImage.path : ""}/>
                </CircleBackground>
              </span>
              <div className="flex w-full gap-4">
                <label className="p-1 flex items-center text-left w-full border rounded-lg">
                  <input
                    type="text"
                    value={message}
                    placeholder="Add a comment"
                    className="outline-0 w-full text-md"
                    onChange={handleMessageChange}
                  />
                  <FontAwesomeIcon className="cursor-pointer ease-in duration-300 hover:text-red ml-auto text-2xl" icon={faCaretRight} onClick={handleSubmitComment}/>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default PinEcho;