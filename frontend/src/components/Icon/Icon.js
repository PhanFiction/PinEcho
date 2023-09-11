const Icon = ({ iconName, altName, width=64, height=64 }) => {
  return(
    <img style={{width: width, height: height}} className="logoIcon" src={iconName} alt={altName} />
  );
};

export default Icon;
