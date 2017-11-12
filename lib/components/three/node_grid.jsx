import React from 'react';
import Node from './node';
import * as Three from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import MouseInput from '../../util/mouse_input';


class NodeGrid extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._hoveredNodes = 0;
    this._draggingNodes = 0;
    this.nodes = {};
    this.nodePositions = {};
    this.handleDragging = this.handleDragging.bind(this);
    this.handleEndDragging = this.handleEndDragging.bind(this);
    this.state = {
      dragging: false,
    }
    this.idx = 0;
  }

  onNodeCreate = (index, node) => {
    this.nodes[index] = node;
  };

  generateNodeGrid() {
    let grid = []
    for (let x = -50; x <= 50; x+=5) {
      grid.push(this.generateNodeRow(x))
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
      const pos = this.generatePosition([x, y, 0])
      nodes.push(
        this.generateNode(pos, [x, y, 0])
      )
    }
    return nodes;
  }

  generateNode(pos, posArr) {
    const { idx } = this;
    const onCreate = this.onNodeCreate.bind(this, idx);
    const node = <Node key={posArr}
    camera={this.props.camera}
    onCreate={onCreate}
    mouseInput={this.props.mouseInput}
    position={pos}
    handleDragging = {this.handleDragging}
    handleEndDragging = {this.handleEndDragging}
    dragging = {this.state.dragging}
    cursor={this.props.cursor}
    living={false}
    />
    this.idx ++;
    return node
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

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;


  render() {
    const grid = this.generateNodeGrid()
    const nodes = () => {
      return grid.reduce((a, b) => a.concat(b), []);
    }
    debugger
    return (
      <group>
        { nodes() }
      </group>
    );
  }
}

export default NodeGrid;
