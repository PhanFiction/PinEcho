

const Label = ({ name, type="text", text="", noBorderOutline=false, children }) => {
  return (
    <label className={noBorderOutline ? "remove-border-outline" : "label"}>
      { children }
      <input type={type} name={name} placeholder={text} />
    </label>
  )
}

export default Label;