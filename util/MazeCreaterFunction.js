let parent;
let size;
let walls;
let wallsSeen;
let totalRooms;

const findSet = (v) => {
  if (v == parent[v]) return v;
  return (parent[v] = findSet(parent[v]));
};

const unionSets = (a, b) => {
  a = findSet(a);
  b = findSet(b);
  if (a != b) {
    if (size[a] < size[b]) {
      //swapping
      [a, b] = [b, a];
    }
    parent[b] = a;
    size[a] += size[b];
  }
};

const initialize = (rows, cols, wallCount) => {
  parent = [];
  size = [];
  walls = [];
  wallsSeen = 0;
  totalRooms = rows * cols;

  let filler = rows * cols + 5;
  // initialising walls for random selection
  // makeSet is happening here
  for (let i = 0; i < filler + 5; i++) {
    parent.push(i); // making parent[i] = i
    size.push(1); // making size[i] = 1;
  }

  // initializing walls to chose randomly
  for (let i = 0; i < wallCount + 5; i++) {
    walls.push(i);
  }
};

const findRandomWall = (len) => {
  let randomPos = Math.floor(Math.random() * len);

  let randomWall = walls[randomPos];

  walls[randomPos] = walls[len - 1];
  // no need to set len-1 as it wont be looked at again

  wallsSeen++;

  return randomWall;
};

// rooms to return , wall no, n = total cols
export const findAdjacentRooms = (wall, n) => {
  let rowCell = Math.floor(wall / (2 * n - 1));
  let colCell = wall % (2 * n - 1);
  let room = [];

  // console.log("rowCell : ", rowCell);
  // console.log("colCell : ", colCell);

  // actual col is (colCell / 2)

  let col = Math.floor(colCell / 2);

  if (colCell & 1) {
    // its a vertical wall
    // connected cells are (row) & (col), (col + 1)

    room.push(n * rowCell + col);
    room.push(n * rowCell + col + 1);
  } else {
    // its a horizontal wall
    // connected cells are (col) & (row), (row + 1)

    room.push(n * rowCell + col);
    room.push(n * (rowCell + 1) + col);
  }

  return room;
};

// rows, cols
export default function Creator(m, n) {
  let wallCount = 2 * n * m - m;
  // walls will be numbered from 0 to wallCount-1

  initialize(m, n, wallCount);

  let start = 0;
  let finish = n * m - 1;
  // starting and finishing cells

  let isWall = [];
  for (let i = 0; i < wallCount + 5; i++) {
    isWall.push(true);
  }

  while (findSet(start) != findSet(finish)) {
    let randomWall = findRandomWall(wallCount - wallsSeen);

    let room = findAdjacentRooms(randomWall, n);

    if (!(room[0] >= totalRooms || room[1] >= totalRooms)) {
      if (findSet(room[0]) != findSet(room[1])) {
        isWall[randomWall] = false;
        unionSets(room[0], room[1]);
      }
    }
  }

  // for (let i = 0; i < isWall.length; i++) {
  //   console.log(i, isWall[i]);
  // }

  return isWall;
}
