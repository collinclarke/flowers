import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import MouseInput from '../../util/mouse_input';


class Node extends Component {
  constructor(props, context) {
    super(props, context);
    const { position } = props
    this.position = new Three.Vector3( position[0], position[1], position[2]);
    this.state = {
      position: new Three.Vector3( position[0], position[1], position[2]),
      pressed: false,
      hovered: false
    };
    this.color = "blue";
    this.pressedColor = "red";
    this.sphereRadius = 2;
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  onMouseDown() {
    debugger
    console.log(e);
    this.setState({ pressed: true })
  }

  _onDocumentMouseMove = (event) => {
    event.preventDefault();

    const {
      mouseInput,
    } = this.props;

    const ray:THREE.Ray = mouseInput.getCameraRay(new THREE
      .Vector2(event.clientX, event.clientY));

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone()
        .add(ray.direction.clone().multiplyScalar(10000))
    ));

    if (intersection) {
      this.setState({
        position: intersection.sub(this._offset),
      });
    }
  };

  render() {
    let color;
    const { pressed } = this.state;
    if (pressed ) {
      color = this.pressedColor
    } else {
      color = this.color;
    }

    return (
      <mesh
      onMouseDown={this.onMouseDown}
      key="node"
      position={this.position}>
        <meshLambertMaterial
          color={color}
          opacity={1}
          side={2}
          wireframe={false}
        />
        <sphereGeometry
          radius={this.sphereRadius}
        />
      </mesh>
    )
  };
}

export default Node;
