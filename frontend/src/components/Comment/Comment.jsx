import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { formatTimestampToDate } from '../../utils/timeService';

const Comment = ({ username, comment, likes, timeStamp, handleCommentLike, isLiked, commentId, children }) => {
  const modifiedTimeStamp = formatTimestampToDate(timeStamp);
  return(
    <div className="flex items-center mt-2 mb-8 mx-2 gap-4 lg:mb-0">
      <div>{children}</div>
      <div className="flex flex-col">
        <p><span className="font-semibold">{username} </span>{comment}</p>
        <ul className="flex items-center mt-1">
          <li className="text-gray">
            <span>{modifiedTimeStamp}</span>
          </li>
          <li className="flex items-center ml-8">
            {
              isLiked ? 
              <FontAwesomeIcon className="mt-1 hover:cursor-pointer text-red" icon={faHeart} onClick={(e) => handleCommentLike(e, commentId)}/>
              : 
              <FontAwesomeIcon className="mt-1 hover:cursor-pointer text-black hover:text-red" icon={faHeart} onClick={(e) => handleCommentLike(e, commentId)}/>
            }
            <span className="ml-2">{likes}</span>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Comment;