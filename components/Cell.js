function Cell(props) {
  let { cell, rowNum, colNum, m, n } = props;

  let width = Math.floor(1500 / n);
  // console.log("width : ", width);

  let styles = {
    width: `${width}px`,
    height: `${width}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  };

  if (cell.down) {
    styles = { ...styles, borderBottomWidth: "1px" };
  } else if (cell.right) {
    styles = { ...styles, borderRightWidth: "1px" };
  } else if (cell.down && cell.right) {
    styles = { ...styles, borderBottomWidth: "1px", borderRightWidth: "1px" };
  }

  return (
    <>
      {/* <div className={className}>{`${rowNum} : ${colNum}`}</div> */}
      <div style={styles}>{/* {`${cell.down} : ${cell.right}`} */}</div>
    </>
  );
}

export default Cell;
