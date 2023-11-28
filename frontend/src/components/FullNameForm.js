import { useMemo } from "react";

const FullNameForm = ({ userInfo, fullName, propTop }) => {
  const fullNameStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div className="full-name" style={fullNameStyle}>
      <div className="full-name-child" />
      <div className="full-name1">{userInfo}</div>
      <div className="john-doe">{fullName}</div>
    </div>
  );
};

export default FullNameForm;
