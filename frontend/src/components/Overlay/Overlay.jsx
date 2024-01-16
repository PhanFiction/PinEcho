const Overlay = ({ children }) => {
  return (
    <div 
      className="hidden overlay absolute inset-0
      group-hover:bg-black/60 duration-300 rounded-md 
      hover:cursor-pointer group-hover:flex justify-center items-center">
      { children }
    </div>
  )
}

export default Overlay;