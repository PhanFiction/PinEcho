
const ToggleArrow = ({ toggle, handleToggle }) => {
  return (
    <>
    {
      toggle ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" onClick={handleToggle}>
        <circle cx="16" cy="16" r="16" transform="matrix(1 0 0 -1 0 32)" fill="#D9D9D9"/>
        <path d="M6 9L16 25" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 25L26 9" stroke="black" stroke-width="2" stroke-linecap="round"/>
      </svg>
      :
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" onClick={handleToggle}>
        <circle cx="16" cy="16" r="16" transform="matrix(-1 0 0 1 32 0)" fill="#D9D9D9"/>
        <path d="M26 23L16 7" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 7L6 23" stroke="black" stroke-width="2" stroke-linecap="round"/>
      </svg>
    }
    </>
  )
}

export default ToggleArrow;