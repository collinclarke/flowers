import React from 'react';
import Node from './node';
import * as Three from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import MouseInput from '../../util/mouse_input';
import GolBoard from '../../util/gol_board';




class NodeGrid extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.nodes = [];
    this.handleDragging = this.handleDragging.bind(this);
    this.handleEndDragging = this.handleEndDragging.bind(this);
    this.generateNode = this.generateNode.bind(this);
    this.toggleLiving = this.toggleLiving.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.nodePositions = this.generateNodeGrid();
    this.state = {
      dragging: false,
      board: new GolBoard(21),
      turn: 1,
    }
    this.flower = 1;
  }

  onNodeCreate(index, node) {
    this.nodes[index] = node;
  };

  generateNodeGrid() {
    let grid = []
    for (let x = -50; x <= 50; x+=5) {
      grid = grid.concat(this.generateNodeRow(x))
    }
    return grid
  }

  generatePosition(posArr) {
    const position = new Three.Vector3(posArr[0], posArr[1], posArr[2]);
    return position
  }

  generateNodeRow(x) {
    let nodes = []
    for (let y = -50; y <= 50; y += 5) {
      const pos =
      nodes.push(
        this.generatePosition([x, y, 0])
      )
    }
    return nodes;
  }

  generateNode(bool, idx) {
    const onCreate = this.onNodeCreate.bind(this, idx);
    const pos = this.nodePositions[idx];
    const { cursor, mouseInput, camera } = this.props;
    const { turn, dragging } = this.state;
    return ( <Node key={idx}
      gridPos={[(pos.x + 50) / 5, (pos.y + 50) / 5]}
      camera={camera}
      onCreate={onCreate}
      mouseInput={mouseInput}
      position={pos}
      handleDragging = {this.handleDragging}
      handleEndDragging = {this.handleEndDragging}
      dragging = {dragging}
      cursor={cursor}
      toggleLiving={this.toggleLiving}
      living={bool}
      turn={turn}
      flower={this.flower}
      /> )
  }

  toggleLiving(posArr) {
    const newBoard = Object.assign({}, this.state.board)
    newBoard.toggleLife(...posArr);
    this.setState({
      board: newBoard,
    })
  }

  makeMove() {
    // console.log("current turn", this.state.turn);
    this.setState({turn: this.state.turn + 1});

    const nextBoard = Object.assign({}, this.state.board)
    nextBoard.move();
    this.setState({ board: nextBoard });
  }

  handleDragging(e) {
    this.setState({dragging: true});
    clearInterval(this.play);
  }

  handleEndDragging(e) {
    this.setState({dragging: false});
    this.play = setInterval(this.makeMove, 250);
    // setTimeout(()=>{
    //   clearInterval(this.play);
    // }, 10000)
  }

  componentDidMount() {
    const {
      onNodesMounted,
    } = this.props;
    onNodesMounted(this.nodes);
  }

  componentWillReceiveProps() {

  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;


  render() {
    const gameState = this.state.board.booleanArray();
    return (
      <group>
        { gameState.map((bool, idx) => {
            this.flower ++;
            return this.generateNode(bool, idx);
        }) }
      </group>
    );
  }
}

export default NodeGrid;
