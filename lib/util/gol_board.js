class GolBoard {

  constructor(size) {
    this.grid = this.generateGrid(size, false);
    this.nextGrid = this.generateGrid(size, false);
  }

  calculateLife = (x, y) => {
    const neighbors = this.findNeighbors(x, y);
    const metric = neighbors.length;
    if (metric > 3) {
      this.nextGrid[x][y] = false;
    } else if (metric > 1 && metric < 4) {
      this.nextGrid[x][y] = true;
    } else if (metric < 2) {
      this.nextGrid[x][y] = false;
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
      const a = x + delta[0]
      const b = y + delta[1]
      if (a > 0 && a < 21) {
        if (b > 0 && b < 21) {
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
