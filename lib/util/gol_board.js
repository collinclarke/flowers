class GolBoard {

  constructor(size) {
    this.grid = this.generateGrid(size, false);
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
    if (metric < 2) {
      this.nextGrid[x][y] = false;
    } else if (metric < 4) {
      this.nextGrid[x][y] = true;
    } else {
      this.nextGrid[x][y] = false;
    }
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
    var array = [];
    array.length = width;
    array.fill(val);
    return array;
  };

  generateGrid = (height, val) => {
    var grid = [];
    grid.length = height;
    for (var i = 0; i < height; i++) {
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
      if (a > 0 && a < 21) {
        if (b > 0 && b < 21) {
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
