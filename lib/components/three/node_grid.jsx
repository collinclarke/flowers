import React from 'react';
import Node from './node';
import * as Three from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import MouseInput from '../../util/mouse_input';

class NodeGrid extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.nodes = [];
    this.handleDragging = this.handleDragging.bind(this);
    this.handleEndDragging = this.handleEndDragging.bind(this);
    this.generateNode = this.generateNode.bind(this);
    this.onNodeCreate = this.onNodeCreate.bind(this);
    this.state = {
      dragging: false,
    }
    this.nodeComponents = [];
    this.generateNodeGrid(props.board);
    this.flower = 1;
  }

  onNodeCreate(index, node) {
    this.nodes[index] = node;
  };

  generateNode(bool, idx) {
    const onCreate = this.onNodeCreate.bind(this, idx);
    const pos = this.props.board.positionGrid[idx];
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
      toggleLiving={this.props.toggleLiving}
      living={bool}
      flower={this.flower}
      /> )
  }

  handleDragging(e) {
    this.setState({dragging: true});
  }

  handleEndDragging(e) {
    this.setState({dragging: false});
  }

  componentDidMount() {
    const {
      onNodesMounted,
    } = this.props;
    onNodesMounted(this.nodes);
  }

  generateNodeGrid(board) {
    const gameState = board.booleanArray();
    gameState.map((bool, idx) => {
        this.flower ++;
        this.nodeComponents[idx] = this.generateNode(bool, idx);
    });
  }

  componentWillReceiveProps(nextProps) {
    const board = nextProps.board;
    if (board) {
      this.generateNodeGrid(board);
    }
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    return (
      <group>
        { this.nodeComponents }
      </group>
    );
  }
}

export default NodeGrid;
