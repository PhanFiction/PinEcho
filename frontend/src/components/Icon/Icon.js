import Image from 'next/image'

const Icon = ({ iconName, altName, width=64, height=64 }) => {
  return(
    <Image
      src={iconName}
      alt={altName}
      width={width}
      height={height}
    />
  );
};

export default Icon;
