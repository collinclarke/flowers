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
  }

  generateNodeGrid() {
    let grid = this.generateNodeRow(0)
    for (let x = 5; x <= 50; x+=5) {
      grid = grid.concat(this.generateNodeRow(x), this.generateNodeRow(-x))
    }
    return grid
  }

  generateNodeRow(x) {
    let nodes = [this.generateNode([x, 0, 0])]
    for (let y = 5; y <= 50; y += 5) {
      nodes = nodes.concat([
        this.generateNode([x, y, 0]),
        this.generateNode([x, -y, 0])
      ])
    }
    return nodes;
  }

  generateNode(posArr) {
    const position = new Three.Vector3(posArr[0], posArr[1], posArr[2]);
    return (
      <Node key={posArr}
      mouseInput={this.props.mouseInput}
      position={posArr}
      onMouseEnter={this._onNodeMouseEnter}
      onMouseLeave={this._onNodeMouseLeave}
      onDragStart={this._onDragStart}
      onDragEnd={this._onDragEnd}
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

    return (<group>
      {this.generateNodeGrid()}
    </group>);
  }
}

export default NodeGrid;
