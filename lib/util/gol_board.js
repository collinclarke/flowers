import * as Three from 'three';

class GolBoard {

  constructor(size) {
    this.size = size;
    this.grid = this.generateGrid();
    this.nextGrid = this.generateGrid();
    this.positionGrid = this.generateNodeGrid();
    this.toggleLife = this.toggleLife.bind(this);
    this.booleanArray = this.booleanArray.bind(this);
    this.move = this.move.bind(this);
    for (let i = 0; i < size; i++ ) {
      let x = 1;
      this.grid[i][i] = true;
      this.grid[size - x][size - x] = true;
      x += 1;
    }
  }

  generateNodeGrid() {
    let grid = [];
    for (let x = 0; x < this.size; x ++) {
      grid = grid.concat(this.generateNodeRow(x));
    }
    return grid;
  }

  generateNodeRow(x) {
    let nodes = [];
    for (let y = 0; y < this.size; y ++) {
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
    grid.length = this.size;
    for (let i = 0; i < this.size; i++) {
      grid[i] = this.generateRow();
    }
    return grid;
  }

  generateRow () {
    let row = [];
    row.length = this.size;
    row.fill(false);
    return row;
  }

  calculateLife (x, y) {
    const neighbors = this.findNeighbors(x, y);
    const metric = neighbors.length;
    if (metric === 2 || metric === 3) {
      this.nextGrid[x][y] = true;
      console.log("living", x, y);
    } else {
      this.nextGrid[x][y] = false;
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
  }

  findNeighbors (x, y) {
    const deltas = [ [-1, -1], [-1, 0], [-1, 1],
    [1, 1], [1, 0], [1, -1], [0, -1], [0, 1] ];
    const neighbors = [];
    deltas.forEach(delta => {
      const a = x + delta[0];
      const b = y + delta[1];
      if (a > 0 && a < this.size) {
        if (b > 0 && b < this.size) {
          if (this.isLiving(a, b))
          neighbors.push([a, b]);
        }
      }
    });
    return neighbors;
  }

  render() {
    this.grid.forEach(row => {
      console.log(row);
    })
  }

}

export default GolBoard;
