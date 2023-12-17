import React from "react";

const Label = ({ name, type = "text", text = "", value, noBorderOutline = false, onChange, children }) => {
  const inputClasses = "border-radius-sm p-2 w-95 mt-2 font-open-sans";

  return (
    <label className={`flex flex-col text-left`}>
      {children}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={text}
        onChange={onChange}
        className={`${inputClasses} ${noBorderOutline ? "border-0" : "border"} rounded-md`}
      />
    </label>
  );
};

export default Label;
