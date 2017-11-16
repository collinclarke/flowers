import React from 'react';
import Node from './node';
import * as Three from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import MouseInput from '../../util/mouse_input';

class NodeGrid extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.nodes = [];
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

    const { mouseInput, camera,
      brush, pause, play, running } = this.props;

    if (!pause || !play) {
      debugger
    }
    const { turn, dragging } = this.state;
    return ( <Node key={idx}
      running={running}
      pause={pause}
      play={play}
      brush={brush}
      ref={idx}
      gridPos={[(pos.x / 5), (pos.y / 5)]}
      camera={camera}
      onCreate={onCreate}
      mouseInput={mouseInput}
      position={pos}
      dragging = {dragging}
      toggleLiving={this.props.toggleLiving}
      living={bool}
      flower={this.flower}
      /> )
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
      <group
      position={new Three.Vector3(-60, -50, 0)}>
        { this.nodeComponents }
      </group>
    );
  }
}

export default NodeGrid;
