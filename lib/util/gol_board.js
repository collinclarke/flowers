import * as Three from 'three';

class GolBoard {

  constructor(count) {
    this.count = count;
    this.grid = this.generateGrid();
    this.nextGrid = this.generateGrid();
    this.positionGrid = this.generateNodeGrid();
    this.toggleLife = this.toggleLife.bind(this);
    this.booleanArray = this.booleanArray.bind(this);
    this.drawAcorn = this.drawAcorn.bind(this);
    this.drawLine = this.drawLine.bind(this);
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

  drawAcorn () {
    let origin = Math.floor(Math.random() * this.count);
    let originY = Math.floor(Math.random() * this.count);

    if (origin < 4) {
      origin += 4;
    } else if (origin > (this.count - 4)) {
      origin -= 4;
    }

    if (originY > 24 || originY < 0) {
      originY = 12;
    }

    this.grid[origin][originY] = true;
    this.grid[origin + 2][originY] = true;
    this.grid[origin + 1][originY] = true;
    this.grid[origin - 1][originY + 1] = true;

    this.grid[origin - 4][originY] = true;
    this.grid[origin - 3][originY] = true;
    this.grid[origin - 3][originY + 2] = true;
  }

  drawLine () {
    let half = Math.floor(this.count / 2);
    for (var i = 0; i < this.count; i++) {
      this.grid[i][half] = true;
    }
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

    return neighbors;
  }

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
    this.nextGrid = this.generateGrid();
    this.grid.forEach((row, x) => {
      row.forEach((node, y) => {
        this.calculateLife(x, y);
      });
    });
    this.grid = Object.assign([], this.nextGrid);
  }

}

export default GolBoard;
