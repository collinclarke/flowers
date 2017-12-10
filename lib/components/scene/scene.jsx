import React, { Component } from 'react';
import Simple from '../three/simple';
import GolBoard from '../../util/gol_board';

class Scene extends Component {
  constructor() {
    super();
    this.size = 35;

    this.state = {
      board: new GolBoard(this.size),
      play: false,
      paused: false,
      brush: false
    };
  }

  resetGame = () => {
    this.pause();
    this.setState({board: new GolBoard(this.size)});
  }


  componentDidMount() {
    this.makeLine();
  }

  openSeeds() {
    const menu = document.getElementById('seed-selector');
    menu.classList.remove("hidden");
  }

  closeSeeds() {
    const menu = document.getElementById('seed-selector');
    menu.classList.add("hidden");

  }

  toggleSeeds = (e) => {
    e.stopPropagation();
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

  toggleInfo = (e) => {
    e.stopPropagation();
    const menu = document.querySelector('.info-box');
    if (Array.from(menu.classList).includes("hidden")) {
      this.openInfo();
    } else {
      this.closeInfo();
    }
  }

  makeAcorn = (e) => {
    e.stopPropagation();
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.drawAcorn();
    this.setState({board: nextBoard});
  }

  makeLine = (e) => {
    if (e) e.stopPropagation();
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.drawLine();
    this.setState({board: nextBoard});
  }

  toggleOn = (e) => {
    e.stopPropagation();
    if (this.state.play) {
      this.pause();
    } else {
      this.play();
    }
  }

  play = () => {
    console.log('GOL started');
    this.GOL = setInterval(() => {
      this.makeMove();
    }, 30);
    this.setState({play: true});
  }

  pause = () => {
    console.log('GOL paused');
    clearInterval(this.GOL);
    this.setState({play: false});
  }

  makeMove = () => {
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.move();
    this.setState({board: nextBoard});
  }

  makeStep = (e) => {
    e.stopPropagation();
    this.pause();
    this.makeMove();
  }

  toggleLiving = (posArr) => {
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.toggleLife(...posArr);
    this.setState({board: nextBoard});
  }

  giveLife = (posArr) => {
    const nextBoard = Object.assign({}, this.state.board);
    nextBoard.live(...posArr);
    this.setState({board: nextBoard});
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
          giveLife={this.giveLife}
          toggleLiving= {this.toggleLiving}
          offset={-(this.size / 2) * 5}
        />
        <nav className="buttons">

          <button id="step" type="button" onClick={this.resetGame}>
            clear
          </button>
          <button id="toggle-live" type="button" className={ play ? "on" : "off"}
            onClick={this.toggleOn}>
            { play ? "pause" : "play"}
          </button>
          <button id="step" type="button" onClick={this.makeStep}>
            step
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
        </div>
        <div className="info-box" onClick={this.toggleInfo}>
          <div id="info-details">
            Flowers is a simulator of <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>. Click to add life,
            press play to start the game.
            Build stable formations to create flowers.
            Designed and built by <a target="_blank" href="https://www.github.com/collinclarke">Collin Clarke</a>
            <div className="credit">
              special thanks to <a target="_blank" href="http://markfingerhut.com">mark fingerhut</a> and the devs behind <a target="_blank" href="https://github.com/Izzimach/react-three">react 3</a> and <a target="_blank" href="https://github.com/toxicFork/react-three-renderer">react three renderer</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default Scene;
