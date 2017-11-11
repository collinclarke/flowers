import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import MouseInput from '../../util/mouse_input';


class Node extends Component {
  constructor(props, context) {
    super(props, context);

    const { position } = props
    const vectorPosition = new Three.Vector3( position[0], position[1], position[2]);
    this.state = {
      position: vectorPosition,
      pressed: false,
      hovered: false
    };
    this.color = "blue";
    this.pressedColor = "red";
    this.sphereRadius = 2;
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onMouseDown = (event, intersection) => {
    event.preventDefault();
    event.stopPropagation();

    const {
      position,
    } = this.state;

    const {
      onDragStart,
      camera,
    } = this.props;

    dragPlane.setFromNormalAndCoplanarPoint(backVector.clone()
      .applyQuaternion(camera.quaternion), intersection.point);

    this._offset = intersection.point.clone().sub(position);

    document.addEventListener('mouseup', this._onDocumentMouseUp);
    document.addEventListener('mousemove', this._onDocumentMouseMove);

    this.setState({
      pressed: true,
    });

    onDragStart();
  };

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
    const {  hovered, pressed, position } = this.state;

    const { sphereRadius } = this;

    let color;
    if (pressed ) {
      color = this.pressedColor
    } else {
      color = this.color;
    }


    return (
      <group>

      <mesh
      onMouseDown={this.onMouseDown}
      key="node"
      position={position}>
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
      </group>
    )
  };
}

export default Node;
