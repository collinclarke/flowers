import React, { Component } from 'react';
import Simple from '../three/simple';
import GolBoard from '../../util/gol_board';

class Scene extends Component {
  constructor() {
    super();
    this.toggleLiving = this.toggleLiving.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.state = {
      board: new GolBoard(10),
    }
  }

  render() {
    return (
      <section className="scene">
      <Simple
      board={this.state.board}
      toggleLiving= {this.toggleLiving}/>
      <button type="button" onClick={this.makeMove}>Play/Pause</button>
      </section>
    );
  }

  makeMove(e) {
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.move();
    this.setState({board: nextBoard});
  }

  toggleLiving(posArr) {
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.toggleLife(...posArr);
    this.setState({board: nextBoard});
  }

}

export default Scene;
