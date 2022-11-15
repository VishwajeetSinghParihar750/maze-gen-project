import Maze from "../util/MazeGenerator";

export default function Home() {
  return (
    <div className="">
      <Maze rows={10} cols={20} />
    </div>
  );
}
