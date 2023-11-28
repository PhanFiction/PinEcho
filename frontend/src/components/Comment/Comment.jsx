

const Comment = ({ name, comment, likes, timeStamp, children }) => {
  return(
    <article className="comment-section">
      <div>
        {children}
      </div>
      <div className="comment-items">
        <div className="comment">
          <p>{name}</p>
          <p>{comment}</p>
        </div>
        <ul>
          <li>
            {timeStamp}
          </li>
          <li>
            <img src={require('../../assets/heart.png')} alt="heart" />
            {likes}
          </li>
        </ul>
      </div>
    </article>
  )
};

export default Comment;