class GolBoard {

  constructor(size) {
    this.grid = this.generateGrid(size, false);
    this.grid[0][0] = true;
    this.nextGrid = this.generateGrid(size, false);
  }

  calculateLife = (x, y) => {
    let metric = 0;
    const neighbors = this.findNeighbors(x, y);
    neighbors.forEach((pos) => {
      if (this.grid[pos[0]][pos[1]]) {
        metric += 1;
      }
    });
    if (metric > 3) {
      this.nextGrid[x][y] = false;
    } else if (metric > 1 && metric < 3) {
      this.nextGrid[x][y] = true;
    } else {
      this.nextGrid[x][y] = false;
    }
  }

  toggleLife = (x, y) => {
    this.grid[x][y] = !this.grid[x][y];
  }

  isLiving = (x, y) => {
    return !!this.grid[x][y]
  }

  booleanArray = () => {
    return this.grid.reduce((a, b) => a.concat(b), []);
  }

  move = () => {
    this.grid.forEach((row, x) => {
      row.forEach((node, y) => {
        this.calculateLife(x, y);
      });
    });
    this.grid = this.nextGrid;
  };

  generateRow = (width, val) => {
    let row = [];
    row.length = width;
    row.fill(val);
    return row;
  };

  generateGrid = (height, val) => {
    let grid = [];
    grid.length = height;
    for (let i = 0; i < height; i++) {
      grid[i] = this.generateRow(height, val);
    }
    return grid;
  };

  findNeighbors = (x, y) => {
    const deltas = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ]
    const neighbors = []
    deltas.forEach(delta => {
      let a, b;
      [a, b] = [x + delta[0], y + delta[1]]
      // console.log("origin", x, y);
      // console.log("delta", delta);
      if (a > 0 && a < 21) {
        if (b > 0 && b < 21) {
          neighbors.push([a, b]);
        }
      }
    });
    // console.log("neighbors", neighbors);
    return neighbors;
  }

  render() {
    this.grid.forEach(row => {
      console.log(row);
    })
  }

}

export default GolBoard;
