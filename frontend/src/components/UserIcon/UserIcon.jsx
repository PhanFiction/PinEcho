

const UserIcon = ({ name, iconSize='sm', children }) => {
  const firstLetter = name.split('')[0];
  return (
    <div className={`user-icon ${iconSize}`}>
      <span> {firstLetter} {children} </span>
    </div>
  )
};

export default UserIcon;