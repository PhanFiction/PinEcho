import React, { useEffect, useState } from "react";
import PinEcho from "../../components/PinEcho/PinEcho";
import { useParams } from 'next/navigation';
import { getSinglePin, savePin, updateCommentLike, updatePinLike, createComment } from "../../service/pinService";
import { fetchUserCredentials } from "../../utils/auth";
import { getUser } from "../../service/authService";
import { findItem } from "../../utils/auth";

const PinEchoPage = () => {
  const params = useParams();
  const [pinData, setPinData] = useState([]);
  const [message, setMessage] = useState('Cool Picture');
  const [user, setUserCredential] = useState([]);

  useEffect(() => {
    /*
     1. Refix user authentication
     2. Cookie is not updated as it is stored and unaltered,.
     */
    const fetchSinglePin = async () => {
      if(params) {
        const req = await getSinglePin(params.id);
        const userData = await getUser();
        setUserCredential(userData);
        const pinSaved = findItem(userData.saves, req._id);
        const pinLiked = findItem(userData.pinLikes, req._id);
        const commentLiked = req.comments.map(item => {
          const isLiked = userData.commentLikes.includes(item._id);
          return { ...item, isLiked };
        })
        const updatedPinData = { ...req, pinSaved, pinLiked, comments: [...commentLiked]};
        setPinData(updatedPinData);
      }
    }
    fetchSinglePin();
  }, [params]);

  const handleSavePin = async (e) => {
    e.preventDefault();
    const req = await savePin(params.id);
    console.log(req);
  
    // Update the pinData with the new pinSaved value
    const updatedPinData = { ...pinData, pinSaved: !pinData.pinSaved };
    setPinData(updatedPinData);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    console.log('submit comment');
    if(message.length < 1) return;
    const req = await createComment(params.id, {comment: message});
    console.log(req);
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCommentLike = async (e, commentId) => {
    e.preventDefault();
    const req = await updateCommentLike(commentId);
    console.log(req);
    const { isLiked } = req;

    // Update the comment state
    const updatedComments = pinData.comments.map(comment => {
      if (comment._id === commentId) {
        return { ...comment, isLiked: !comment.isLiked };
      }
      return comment;
    });
    console.log(updatedComments);
    setPinData({...pinData, comments: [...updatedComments]});
  }

  const handlePinLike = async (e) => {
    e.preventDefault();
    await updatePinLike(params.id);
  
    // Update the pinData with the new pinSaved value
    const updatedPinData = { ...pinData, pinLiked: !pinData.pinLiked };
    setPinData(updatedPinData);
  }

  const { _id, creator, comments, title, altText, description, imgPath, link, pinSaved, pinLiked } = pinData;

  return (
    <PinEcho 
      pinId={_id}
      pinCreator={creator}
      comments={comments}
      title= {title}
      altText={altText ? altText : ""}
      link={link}
      description={description}
      imgPath={imgPath}
      handleSavePin={handleSavePin}
      handleSubmitComment={handleSubmitComment}
      message={message}
      handleMessageChange={handleMessageChange}
      user={user}
      handleCommentLike={handleCommentLike}
      pinSaved={pinSaved}
      pinLiked={pinLiked}
      handlePinLike={handlePinLike}
    />
  )
};

export default PinEchoPage;