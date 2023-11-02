
function OutlineButton({ children, outlineType }) {
  const styleOutlineButton = {
    height: "30px",
    fontSize: "15px",
    lineHeight: "15px",
  };
  return (
    <button className={`btn btn-outline-${outlineType || 'secondary'} mx-1`} style={styleOutlineButton}>
      {children}
    </button>
  );
}

export default OutlineButton;
