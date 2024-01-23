const ActionButton = ({ 
  handleClick, bgColor="red", buttonType="button", 
  disable=false, textColor="textWhite",
  children }) => {
    const colorVariants = {
      "darkgray": "bg-darkgray hover:bg-gray",
      "lightgray": "bg-lightgray hover:bg-darkgray",
      "red": "bg-red hover:bg-firebrick",
      "firebrick": "bg-firebrick hover:bg-red",
      "white": "bg-white",
      "textWhite": "text-white"
    }
  return (
    <button
      type={buttonType} 
      className={
        `w-full hover:text-white
        ${colorVariants[bgColor]} ${colorVariants[textColor]} p-2 rounded-md 
        shadow-lg ease-in duration-300`
      }
      onClick={handleClick}
      disabled={disable}
    >
      { children }
    </button>
  );
};

export default ActionButton;