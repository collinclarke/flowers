import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';


class Node extends Component {
  constructor(props, context) {
    super(props, context);
    const { position } = props
    this.position = new Three.Vector3( position[0], position[1], position[2]);
    this.state = {
      sphereRadius: 2,
      color: "blue"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    debugger
    this.setState({color: "red"});
  }


  render() {
    return (
      <mesh key="node" position={this.position}>
        <meshLambertMaterial
          color={this.state.color}
          opacity={1}
          side={2}
          wireframe={true}
        />
        <sphereGeometry
          radius={this.state.sphereRadius}
        />
      </mesh>
    )
  };
}

export default Node;
