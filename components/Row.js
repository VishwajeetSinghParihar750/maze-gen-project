import Cell from "./Cell";

function Row(props) {
  let { m, n, rowNum, row } = props;
  return (
    <>
      <ul className="flex">
        {row.map((cell, ind) => {
          return (
            <li key={ind} className="">
              <Cell rowNum={rowNum} colNum={ind} cell={cell} m={m} n={n} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Row;
