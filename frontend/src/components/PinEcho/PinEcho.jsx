import { useState } from 'react';
import UserIcon from '../UserIcon/UserIcon';
import ToggleArrow from '../ToggleArrow/ToggleArrow';
import Comment from '../Comment/Comment';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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

const img1 = 'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp';
const PinEcho = () => {
  const [show, showComment] = useState('true');

  const toggleComments = (e) => {
    showComment(!show);
  }

  return(
    <section className="w-full flex flex-col">
      <div className="m-8 flex rounded-md">
        <div className="mr-4">
          <Image
            src={img1}
            alt="img"
            width={500}
            height={500}
            style={{objectFit:"cover"}}
          />
        </div>
        <div className="flex flex-col">
          <button className="w-1/4 p-2 rounded-lg bg-red text-white">Save</button>
          <a href="/" className="text-red">pinterest.ca</a>
          <h2 className="font-semibold">Pin on kirby moodboard</h2>
          <p id="detail">Jul 8, 2021 - This Pin was discovered by BANANA 🍌. Discover (and save!) your own Pins on Pinterest</p>

          <div className="flex gap-4">
            <UserIcon name={'H'} />
            <div className="flex flex-col">
              <p>Henry</p>
              <p>536 Followers</p>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <h3 className="font-semibold">{fakeData.length} Comment</h3>
            <ToggleArrow toggle={show} handleToggle={toggleComments} />
          </div>
          {
            show ?
            <div className="flex flex-col gap-8 p-1 w-full h-64 overflow-scroll no-scrollbar">
              {
                fakeData.map((item, index) =>
                  <Comment key={index} name={item.username} comment={item.comment} likes={item.likes} timeStamp={'3y'}>
                    <div className="mt-2">
                      <UserIcon name={item.username} />
                    </div>
                  </Comment>
                )
              }
            </div>
          :
          <></>
          }
          <div className="flex bg-red">
            <UserIcon name={'H'} iconSize={'md'}/>
            <div className="flex items-center bg-black text-white rounded-md ml-4 w-1/4">
              <span className="font-semibold">Add a comment</span>
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