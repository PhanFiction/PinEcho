import React from 'react';
import Label from '../../components/Label/Label';
import './Profile.css';

const Profile = () => {
  return(
    <section className="profile-section">
      <div className="profile-container">
        <h3>Edit Profile</h3>
        <form className="profile-update-form">
          <Label name={"username"} text={"JohnDoe"}>
            Username
          </Label>
          <Label name={"first name"} text={"John"}>
            First name
          </Label>
          <Label name={"last name"} text={"Doe"}>
            Last name
          </Label>
          <Label name={"email"} text={"JohnDoe@gmail.com"}>
            Email
          </Label>
          <Label name={"username"} type={"password"}>
            Password
          </Label>
          <button className="submit-btn">Save</button>
        </form>
      </div>
    </section>
  )
};

export default Profile;