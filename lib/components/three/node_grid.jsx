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
    this.onNodeCreate = this.onNodeCreate.bind(this);
    this.state = {
      dragging: false,
      board: new GolBoard(10),
    }
    this.flower = 1;
  }

  onNodeCreate(index, node) {
    this.nodes[index] = node;
  };

  generateNode(bool, idx) {
    const onCreate = this.onNodeCreate.bind(this, idx);
    const pos = this.state.board.positionGrid[idx];
    const { cursor, mouseInput, camera } = this.props;
    const { turn, dragging } = this.state;
    return ( <Node key={idx}
      ref={idx}
      gridPos={[(pos.x / 5), (pos.y / 5)]}
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
    const nextBoard = Object.assign({}, this.state.board)
    nextBoard.move();
    this.setState({ board: nextBoard });
  }

  handleDragging(e) {
    this.setState({dragging: true});
    // clearInterval(this.play);
  }

  handleEndDragging(e) {
    this.setState({dragging: false});
    // this.play = setInterval(this.makeMove, 250);
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

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    const gameState = this.state.board.booleanArray();
    const nodes = gameState.map((bool, idx) => {
        this.flower ++;
        return this.generateNode(bool, idx);
    })

    return (
      <group>
        { nodes }
      </group>
    );
  }
}

export default NodeGrid;
