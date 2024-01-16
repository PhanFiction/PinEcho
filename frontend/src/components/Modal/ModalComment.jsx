import CircleBackground from '../CircleBackground/CircleBackground';
import UserIcon from '../UserIcon/UserIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const ModalComment = ({ username, profileImg, message, handleChange, handleSubmit }) => {
  return (
    <div className="w-full bg-white border-t border-gray-300">
      <div className="flex gap-4 p-2 items-center desktop-large:flex">
        <span>
          <CircleBackground md={true}>
            <UserIcon name={username} imgName={profileImg}/>
          </CircleBackground>
        </span>
        <label className="p-1 flex items-center text-left w-full border rounded-lg">
          <input
            type="text"
            value={message}
            placeholder="Add a comment"
            className="outline-0 w-full text-lg"
            onChange={handleChange}
          />
          <FontAwesomeIcon className="text-3xl hover:cursor-pointer" icon={faCaretRight} onClick={handleSubmit}/>
        </label>
      </div>
    </div>
  )
}

export default ModalComment;