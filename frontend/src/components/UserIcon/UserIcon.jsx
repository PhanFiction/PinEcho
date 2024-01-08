import React from "react";
import Image from 'next/image';
import '../../styles/globals.css';

const UserIcon = ({ name="", imgName="", textSize="md", children }) => {
  const firstLetter = name.slice(0, 1).toUpperCase(); // Use slice to get the first letter

  return (
    <>
      {
        imgName !== "" ? (
          <Image
            className="rounded-full"
            fill={true}
            src={imgName}
            alt={imgName}
            placeholder="blur"
            blurDataURL={imgName}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <span className={`font-semibold text-${textSize}`}> {firstLetter} {children} </span>
        )
      }
      {children}
    </>
  );
};

export default UserIcon;
