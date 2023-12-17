import React from 'react';
import '../../styles/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ name, comment, likes, timeStamp, children }) => {
  return(
    <article className="flex gap-4">
      <div>
        {children}
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <p className="font-semibold mr-2">{name}</p>
          <p>{comment}</p>
        </div>
        <ul className="flex items-center">
          <li className="">
            <span>{timeStamp}</span>
          </li>
          <li className="flex items-center ml-8">
            <FontAwesomeIcon className="mt-1 cursor-pointer hover:text-red" icon={faHeart}/>
            <span className="ml-2 mt-0.5">{likes}</span>
          </li>
        </ul>
      </div>
    </article>
  )
};

export default Comment;