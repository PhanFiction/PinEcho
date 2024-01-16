import { useState, useEffect } from 'react';
import Label from '../../components/Label/Label';
import CircleBackground from '../../components/CircleBackground/CircleBackground';
import UserIcon from '../../components/UserIcon/UserIcon';
import DragAndDropImage from '../../components/DragDropImage/DragDropImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import { getUser } from '../../service/authService';

const imgName="https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005181/pins/m7y9ivov80vy6cskztqq.webp";
const Profile = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
    fetchUser();
  },[])

  const handleBackClick = () => {
    router.push('/');
  }

  return(
    <section className="flex justify-center items-center desktop-large:h-screen">
      <div className="flex flex-col 
        gap-4 border-0 rounded-lg shadow-lg relative bg-white outline-none p-4 w-11/12 relative top-8
        md:w-2/4 desktop-large:w-1/4"
      >
        {/*Title*/}
        <div className="flex items-center justify-center my-4">
          <FontAwesomeIcon className="hover:text-red hover:cursor-pointer text-2xl" icon={faArrowLeft} onClick={handleBackClick}/>
          <h3 className="text-indianred-100 text-lg font-semibold flex-1 text-center right-2 relative md:text-2xl">Edit Profile</h3>
        </div>

        {/* Profile Icon*/}
        <div className="flex items-center gap-4 flex-col my-4">
          <div className="relative">
            <CircleBackground sm={false} lg={true}>
              <UserIcon name={user.username ? user.username : ""} imgName={user.profileImage ? user.profileImage.path : ""}/>
            </CircleBackground>
            <span className="bottom-0 left-8 absolute bg-white">
              <DragAndDropImage>
                <CircleBackground>
                  <FontAwesomeIcon className="text-indianred-200 text-sm hover:text-firebrick-200 hover:cursor-pointer" icon={faPen} />
                </CircleBackground>
              </DragAndDropImage>
            </span>
          </div>
        </div>

        {/*Form*/}
        <form className="grid grid-cols-1 md:auto-cols-fr md:auto-rows-fr gap-4">
          <div className="col-span-2 md:col-span-1">
            <Label name={"username"} text={username} value={username} onChange={(e)=>{setUsername(e.target.value)}}>
              Username
            </Label>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label name={"email"} text={email} value={email} type="email" onChange={(e)=>{setEmail(e.target.value)}}>
              Email
            </Label>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label name={"first name"} text={firstName} value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}>
              First name
            </Label>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label name={"last name"} text={lastName} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}>
              Last name
            </Label>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label name={"password"} type={"password"} onChange={(e) => {setPassword(e.target.value)}}>
              Password
            </Label>
          </div>
          <div className="col-span-2 md:col-span-1 lg:col-span-2 mt-4 text-end">
            <button className="shadow-lg bg-red rounded-md p-2 w-full md:w-1/4 lg:w-1/6 hover:bg-firebrick-200">
              <span className="font-semibold text-white">
                Save
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
};

export default Profile;