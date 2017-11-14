import * as Three from 'three';

class GolBoard {

  constructor(count) {
    this.count = count;
    this.grid = this.generateGrid();
    this.nextGrid = this.generateGrid();
    this.positionGrid = this.generateNodeGrid();
    this.toggleLife = this.toggleLife.bind(this);
    this.booleanArray = this.booleanArray.bind(this);
    this.move = this.move.bind(this);
  }

  generateNodeGrid() {
    let grid = [];
    for (let x = 0; x < this.count; x ++) {
      grid = grid.concat(this.generateNodeRow(x));
    }
    return grid;
  }

  generateNodeRow(x) {
    let nodes = [];
    for (let y = 0; y < this.count; y ++) {
      nodes.push(
        this.generatePosition([(x * 5), (y * 5), 0])
      );
    }
    return nodes;
  }

  generatePosition(posArr) {
    const position = new Three.Vector3(posArr[0], posArr[1], posArr[2]);
    return position;
  }

  generateGrid () {
    let grid = [];
    grid.length = this.count;
    for (let i = 0; i < this.count; i++) {
      grid[i] = this.generateRow();
    }
    return grid;
  }

  generateRow () {
    let row = [];
    row.length = this.count;
    row.fill(false);
    return row;
  }

  findNeighbors (x, y) {
    const deltas = [ [-1, -1], [-1, 0], [-1, 1],
    [1, 1], [1, 0], [1, -1], [0, -1], [0, 1] ];
    let neighbors = 0;
    deltas.forEach(delta => {
      const a = x + delta[0];
      const b = y + delta[1];
      if (a >= 0 && a < this.count) {
        if (b >= 0 && b < this.count) {
          if (this.isLiving(a, b)) {
            neighbors += 1;
          }
        }
      }
    });
    // if (this.isLiving(x, y)) {
    //   console.log("origin", [x, y]);
    //   console.log("neighbors", neighbors);
    // }
    return neighbors;
  }

  // calculateLife (x, y) {
  //   const neighbors = this.findNeighbors(x, y);
  //   const living = this.grid[x][y];
  //
  //   return living ? (
  //     ![2, 3].includes(neighbors) && (this.nextGrid[x][y] = false)
  //   ) : (
  //     (neighbors === 3) && (this.nextGrid[x][y] = true)
  //   );
  // }

  calculateLife (x, y) {
    const neighbors = this.findNeighbors(x, y);
    const living = this.grid[x][y];
    if (living) {
      if (![2, 3].includes(neighbors)) {
        this.nextGrid[x][y] = false;
      } else {
        this.nextGrid[x][y] = true;
      }
    } else {
      if (neighbors === 3) {
        this.nextGrid[x][y] = true;
      } else {
        this.nextGrid[x][y] = false;
      }
    }
  }

  toggleLife (x, y) {
    this.grid[x][y] = !this.grid[x][y];
  }

  isLiving (x, y) {
    return this.grid[x][y];
  }

  booleanArray () {
    return this.grid.reduce((a, b) => a.concat(b), []);
  }

  move () {
    this.grid.forEach((row, x) => {
      row.forEach((node, y) => {
        this.calculateLife(x, y);
      });
    });
    this.grid = Object.assign([], this.nextGrid);
  }

}

export default GolBoard;
