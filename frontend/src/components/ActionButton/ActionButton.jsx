const ActionButton = ({ handleClick, bgColor="red", disable=false, children }) => {
  return (
    <button
      type="button" 
      className={`w-full bg-${bgColor} text-white p-1 rounded-md shadow-lg hover:bg-firebrick-200 ease-in duration-300`}
      onClick={handleClick}
      disabled={disable}
    >
      { children }
    </button>
  );
};

export default ActionButton;