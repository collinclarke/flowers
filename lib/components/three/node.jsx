import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import MouseInput from '../../util/mouse_input';

const dragPlane = new Three.Plane();

const backVector = new Three.Vector3(0, 0, -1);

class Node extends Component {
  constructor(props, context) {
    super(props, context);

    const { position } = props
    this.state = {
      position: position,
      pressed: false,
      hovered: false
    };
    this.color = "blue";
    this.hoverColor = "red";
    this.sphereRadius = 2;
  }


  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onMouseEnter = () => {
    this.setState({
      hovered: true,
    });
    console.log("hello!");
    const { onMouseEnter } = this.props;

    onMouseEnter();
  };

  _onMouseLeave = () => {
    if (this.state.hovered) {
      this.setState({
        hovered: false,
      });
    }

    const {
      onMouseLeave,
    } = this.props;

    onMouseLeave();
  };

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
    console.log("hello again!");
    onDragStart();
  };

  _onDocumentMouseUp = (event) => {
    event.preventDefault();

    document.removeEventListener('mouseup', this._onDocumentMouseUp);
    document.removeEventListener('mousemove', this._onDocumentMouseMove);

    const {
      onDragEnd,
    } = this.props;

    onDragEnd();

    this.setState({
      pressed: false,
    });
  };

  _onDocumentMouseMove = (event) => {
    debugger
    event.preventDefault();

    const { mouseInput } = this.props;

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

  _ref = (mesh) => {
      const {
        onCreate,
      } = this.props;
      onCreate(mesh);
  };

  render() {
    const {  hovered, pressed, position } = this.state;

    let color;
    const hoverHighlight = (hovered && !dragging);
    if (pressed) {
      color = this.pressedColor;
    } else if (hoverHighlight) {
      color = this.hoverColor;
    } else {
      color = this.color;
    }

    const {
      cursor: {
        dragging,
      },
    } = this.props;




    return (<group
      position={position}
    >
      <mesh
        castShadow
        receiveShadow

        onMouseEnter={this._onMouseEnter}
        onMouseDown={this._onMouseDown}
        onMouseLeave={this._onMouseLeave}

        ref={this._ref}
      >
        <geometryResource
          resourceId="boxGeometry"
        />
        <meshLambertMaterial
          color={color}
        />
      </mesh>
      {hoverHighlight ? <mesh
        ignorePointerEvents
      >
        <geometryResource
          resourceId="boxGeometry"
        />
        <materialResource
          resourceId="highlightMaterial"
        />
      </mesh> : null}
    </group>);
  };
}

export default Node;
