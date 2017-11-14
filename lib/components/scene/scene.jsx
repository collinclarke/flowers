import React, { Component } from 'react';
import Simple from '../three/simple';
import GolBoard from '../../util/gol_board';

class Scene extends Component {
  constructor() {
    super();
    this.size = 25;
    this.toggleLiving = this.toggleLiving.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.toggleOn = this.toggleOn.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.state = {
      board: new GolBoard(this.size),
      play: false,
    };
  }

  render() {
    return (
      <section className="scene">
      <Simple
      board={this.state.board}
      toggleLiving= {this.toggleLiving}/>
      <button id="toggle-live" type="button" onClick={this.toggleOn}>
      { this.state.play ? "stop" : "live"}
      </button>
      <button id="clear" type="button" onClick={this.clearBoard}>
        die
      </button>
      <button id="step" type="button" onClick={this.makeMove}>
        step
      </button>
      </section>
    );
  }

  toggleOn() {
    if (this.state.play) {
      this.endGOL();
    } else {
      this.startGOL();
    }
    this.setState({play: !this.state.play});
  }

  clearBoard() {
    this.setState({ board: new GolBoard(this.size) });
    this.endGOL();
    this.setState({play: false});
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

  startGOL() {
    console.log('GOL started');
    this.GOL = setInterval(() => {
      this.makeMove();
    }, 20);
  }

  endGOL() {
    clearInterval(this.GOL);
  }

  componentWillReceiveProps() {

  }

}

export default Scene;
