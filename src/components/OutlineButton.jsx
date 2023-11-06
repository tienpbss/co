function OutlineButton({ children, outlineType, clickButton, style }) {
  const styleOutlineButton = {
    height: "30px",
    fontSize: "15px",
    lineHeight: "15px",
  };
  return (
    <button
      onClick={clickButton}
      className={`btn btn-outline-${outlineType || "secondary"} mx-1`}
      style={{...styleOutlineButton, ...style}}
    >
      {children}
    </button>
  );
}

export default OutlineButton;
