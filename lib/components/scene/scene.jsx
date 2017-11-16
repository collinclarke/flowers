import React, { Component } from 'react';
import Simple from '../three/simple';
import GolBoard from '../../util/gol_board';

class Scene extends Component {
  constructor() {
    super();
    this.size = 25;
    this.toggleLiving = this.toggleLiving.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.makeAcorn = this.makeAcorn.bind(this);
    this.makeLine = this.makeLine.bind(this);
    this.toggleOn = this.toggleOn.bind(this);
    this.toggleBrush = this.toggleBrush.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.makeStep = this.makeStep.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    // this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
    // this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);

    this.state = {
      board: new GolBoard(this.size),
      play: false,
      paused: false,
      brush: false
    };
    document.addEventListener("mousedown", this.onDocumentMouseDown);
  }

  render() {
    const { brush, play, board } = this.state;
    return (
      <section className="scene">
      <Simple
      brush={brush}
      pause={this.pause}
      play={this.play}
      running={play}
      board={board}
      toggleLiving= {this.toggleLiving}/>
      <nav className="buttons">
        <button id="clear" type="button" onClick={this.clearBoard}>
          die
        </button>
        <button id="step" type="button" onClick={this.makeStep}>
          step
        </button>
        <button id="toggle-live" type="button" className={ play ? "on" : "off"}
        onClick={this.toggleOn}>
        { play ? "stop" : "live"}
        </button>
        <button id="brush" type="button" className={ brush ? "on" : "off"}
        onClick={this.toggleBrush} >
          brush
        </button>
      </nav>
      <div id="seed" className="button modal" onMouseEnter={this.openSeeds} onClick={this.toggleSeeds}>
        seed
        <div id="seed-selector" className="hidden" onMouseLeave={this.closeSeeds}>
          <button id="acorn" type="button" onClick={this.makeAcorn}>acorn</button>
          <button id="line" type="button" onClick={this.makeLine}>line</button>
        </div>
      </div>
      <div id="info" className="button modal" onClick={this.toggleInfo}>
        info
        <div className="info-box hidden">
          <div id="info-details" onClick={this.toggleInfo}>
            Flowers is a simulator of <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>. Click to add life,
            press "live" to start the game.
            Build stable formations to create flowers.
            Designed and built by <a target="_blank" href="https://www.github.com/collinclarke">Collin Clarke</a>
            <div className="credit">
              special thanks to <a target="_blank" href="http://markfingerhut.com">mark fingerhut</a> and the devs behind <a target="_blank" href="https://github.com/Izzimach/react-three">react 3</a> and <a target="_blank" href="https://github.com/toxicFork/react-three-renderer">react three renderer</a>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  }

  openSeeds(e) {
    const menu = document.getElementById('seed-selector');
    menu.classList.remove("hidden");
  }

  closeSeeds(e) {
    const menu = document.getElementById('seed-selector');
    menu.classList.add("hidden");
  }

  toggleSeeds(e) {
    const menu = document.getElementById('seed-selector');
    if (Array.from(menu.classList).includes("hidden")) {
      this.openSeeds();
    } else {
      this.closeSeeds();
    }
  }

  openInfo(e) {
    const menu = document.querySelector('.info-box');
    menu.classList.remove("hidden");
  }

  closeInfo(e) {
    const menu = document.querySelector('.info-box');
    menu.classList.add("hidden");
  }

  toggleInfo(e) {
    const menu = document.querySelector('.info-box');
    if (Array.from(menu.classList).includes("hidden")) {
      this.openInfo();
    } else {
      this.closeInfo();
    }
  }

  makeAcorn(e) {
    e.stopPropagation();
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.drawAcorn();
    this.setState({board: nextBoard});
  }

  makeLine(e) {
    e.stopPropagation();
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.drawLine();
    this.setState({board: nextBoard});
  }

  toggleBrush() {
    this.setState({brush: !this.state.brush});
  }

  toggleOn() {
    if (this.state.play) {
      this.pause();
    } else {
      this.play();
    }
  }

  clearBoard() {
    this.setState({ board: new GolBoard(this.size) });
    this.pause();
  }

  makeMove(e) {
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.move();
    this.setState({board: nextBoard});
  }

  makeStep(e) {
    this.pause();
    this.makeMove();
  }

  toggleLiving(posArr) {
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.toggleLife(...posArr);
    this.setState({board: nextBoard});
  }

  play() {
    console.log('GOL started');
    this.GOL = setInterval(() => {
      this.makeMove();
    }, 20);
    this.setState({play: true});
  }

  pause() {
    clearInterval(this.GOL);
    this.setState({play: false});
  }

  componentWillReceiveProps() {

  }

}

export default Scene;
