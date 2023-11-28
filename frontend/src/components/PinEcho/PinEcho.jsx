
import { useState } from 'react';
import UserIcon from '../UserIcon/UserIcon';
import ToggleArrow from '../ToggleArrow/ToggleArrow';
import Comment from '../Comment/Comment';

const fakeData = [
  {
    username: 'Bob',
    comment: 'I could only find 6 stories on ao3 why isn’t anyone writing this ship',
    likes: '0',
    timeStamp: '3d'
  }, 
  {
    username: 'T',
    comment: 'why do only the cullens have yellow eyes like is it an std carlisle had and passed it down to the rest of his family',
    likes: '3',
    timeStamp: '3d'
  },
  {
    username: 'Bob',
    comment: 'It means they only drink animal blood lmao😭',
    likes: '4',
    timeStamp: '3d'
  },
  {
    username: 'Eli',
    comment: 'even their ship name is cute :0',
    likes: '0',
    timeStamp: '4d'
  },
  {
    username: 'BD',
    comment: 'yes but with charlie and billy (lets be realistic here lol)',
    likes: '0',
    timeStamp: '5d'
  },
  {
    username: 'Neave',
    comment: 'Dayum I scrolled too far bye',
    likes: '0',
    timeStamp: '6d'
  },
  {
    username: 'Alec',
    comment: 'are we all forgetting their ship name is canonically carlie, I mean technically its little revenges middle name but still.',
    likes: '0',
    timeStamp: '6d'
  },
  {
    username: 'Bunny',
    comment: 'star crossed lovers',
    likes: '0',
    timeStamp: '6d'
  },
  {
    username: 'Bob',
    comment: 'I ship chilly',
    likes: '0',
    timeStamp: '6d'
  },
  {
    username: 'Milz',
    comment: 'We are on the same side here girl',
    likes: '0',
    timeStamp: '6d'
  },
]

const img1 = 'https://i.pinimg.com/564x/d7/3b/b1/d73bb189870fcb29aa4ca426534f7242.jpg';
const img2 = 'https://i.pinimg.com/564x/cd/f9/75/cdf9751684e8cb0147ab0b156aef0855.jpg';
const PinEcho = () => {
  const [show, showComment] = useState('true');

  const toggleComments = (e) => {
    showComment(!show);
  }

  return(
    <section className="pin-section">
      <img src={img2} alt="img" />
      <div className="pin-item-container">
        <button className="btn save_btn">Save</button>
        <a href="/">pinterest.ca</a>
        <h2>Pin on kirby moodboard</h2>
        <p id="detail">Jul 8, 2021 - This Pin was discovered by BANANA 🍌. Discover (and save!) your own Pins on Pinterest</p>
        <div className="profile">
          <UserIcon name={'H'} />
          <div className="creator">
            <p>Henry</p>
            <p>536 Followers</p>
          </div>
        </div>
        <div className='like-section'>
          <h3>{fakeData.length} Comment</h3>
          <ToggleArrow toggle={show} handleToggle={toggleComments} />
        </div>
        {
          show ? 
          <div className="comment-container">
          {
            fakeData.map((item, index) => 
              <Comment key={index} name={item.username} comment={item.comment} likes={item.likes} timeStamp={'3y'}>
                <UserIcon name={item.username} />
              </Comment>
            )
          }
        </div>
        : 
        <></>
        }
        <div className="create-comment-section">
          <UserIcon name={'H'} iconSize={'md'}/>
          <div className="comment-button">
            <div className="frame">
              <div className="text-wrapper">Add a comment</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M1.00001 21L17 11" stroke="black" stroke-width="2" stroke-linecap="round"/>
                <path d="M17 11L1 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default PinEcho;