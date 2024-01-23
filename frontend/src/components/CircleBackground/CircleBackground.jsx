const CircleBackground = ({ sm = false, md = false, lg = false, children }) => {
  let size = null;

  const sizes = {
    "sm": "w-6 h-6",
    "md": "w-8 h-8",
    "lg": "w-12 h-12",
  }

  if (md) {
    size = "md";
  } else if (lg) {
    size = "lg";
  } else {
    size = "sm";
  }

  return (
    <div 
      className={
        `flex flex-col items-center justify-center 
        text-center rounded-full ring-1 ring-black relative
        ${sizes[size]}`
        }
      >
      {children}
    </div>
  );
};

export default CircleBackground;
