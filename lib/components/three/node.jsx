import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';


class Node extends Component {
  constructor(props, context) {
    super(props, context);
    const { position } = props
    this.position = new Three.Vector3( position[0], position[1], position[2]);
    this.state = {
      sphereVertices: [new Three.Vector3( position[0], position[1], position[2]),
	       new Three.Vector3( position[0], position[1], position[2]),
	       new Three.Vector3(  position[0], position[1], position[2])]
    };
  }

  render() {
    return (
      <mesh key="node" position={this.position}>
        <meshLambertMaterial
          color="blue"
          opacity={1}
          side={2}
          wireframe={true}
        />
        <sphereGeometry
          radius={1}
          vertices={this.state.sphereVertices}
        />
      </mesh>
    )
  };
}

export default Node;
