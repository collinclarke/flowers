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
    this.nodes = [];
    this.nodePositions = [];
    this.generateNodeGrid();
  }

  _onNodeCreate = (index, node) => {
    this.nodes[index] = node;
  };

  generateNodeGrid() {
    let grid = this.generateNodeRow(0)
    for (let x = 5; x <= 50; x+=5) {
      grid = grid.concat(this.generateNodeRow(x), this.generateNodeRow(-x))
    }
    this.nodePositions = grid;
    return grid
  }

  generatePosition(posArr) {
    const position = new Three.Vector3(posArr[0], posArr[1], posArr[2]);
    return position
  }

  generateNodeRow(x) {
    let nodes = [this.generatePosition([x, 0, 0])]
    for (let y = 5; y <= 50; y += 5) {
      nodes = nodes.concat([
        this.generatePosition([x, y, 0]),
        this.generatePosition([x, -y, 0])
      ])
    }
    return nodes;
  }

  generateNode(pos, index) {
    const onCreate = this._onNodeCreate.bind(this, index);
    return (
      <Node key={index}
      camera={this.props.camera}
      onCreate={onCreate}
      mouseInput={this.props.mouseInput}
      position={pos}
      onMouseEnter={this._onNodeMouseEnter}
      onMouseLeave={this._onNodeMouseLeave}
      cursor={this.props.cursor}
      />
    )
  }

  componentDidMount() {
    const {
      onNodesMounted,
    } = this.props;
    onNodesMounted(this.nodes);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onNodeMouseEnter = () => {
    if (this._hoveredNodes === 0) {
      const {
        onHoverStart,
      } = this.props;

      onHoverStart();
    }

    this._hoveredNodes++;
  };

  _onNodeMouseLeave = () => {
    this._hoveredNodes--;

    if (this._hoveredNodes === 0) {
      const {
        onHoverEnd,
      } = this.props;

      onHoverEnd();
    }
  };



  render() {
    const {
      mouseInput,
      camera,

      cursor,
    } = this.props;

    const grid = this.nodePositions;

    const nodes = grid.map((pos, index) => {
      return this.generateNode(pos, index);
    })

    return (<group>
      { nodes }
    </group>);
  }
}

export default NodeGrid;
