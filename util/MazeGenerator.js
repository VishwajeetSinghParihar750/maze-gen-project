import Creator from "./MazeCreaterFunction";
import Row from "../components/Row";
import { useEffect, useState } from "react";

// m is row, n is col
export default function Maze(props) {
  let m = props.rows;
  let n = props.cols;

  // let [isWall, setIsWall] = useState([]);
  let [maze, setMaze] = useState([]);

  let cur = 0;

  useEffect(() => {
    const bringingWall = Creator(m, n);
    console.log("bringingWall : ", bringingWall);
    // setIsWall(() => Creator(m, n));
    // console.log("isWall : ", isWall);

    let newMaze = [];

    for (let i = 0; i < m; i++) {
      let newRow = [];
      for (let j = 0; j < n; j++) {
        let newCell = { down: bringingWall[cur], right: bringingWall[cur + 1] };

        if (j == n - 1) {
          newCell.right = false;
        }
        if (i == m - 1) {
          newCell.down = false;
        }

        newRow.push(newCell);

        cur += 2; // for next cell
      }
      newMaze.push(newRow);

      cur -= 1; // because last col cell does not have a right boundary in "isWall"
    }
    setMaze(() => {
      // console.log("newMaze = ", newMaze);
      return newMaze;
    });
  }, []);

  return (
    <>
      <div className="border-2 w-fit mx-auto my-10 ">
        {maze.map((row, ind) => {
          return <Row row={row} m={m} n={n} key={ind} rowNum={ind} />;
        })}
      </div>
    </>
  );
}
