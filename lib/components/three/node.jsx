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
      living: props.living,
      hovered: false
    };
    this.color = "blue";
    this.hoverColor = "grey";
    this.livingColor = "green";
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.onDocumentDrag = this.onDocumentDrag.bind(this);
    this.toggleLife = this.toggleLife.bind(this);
  }

  //public

  toggleLife = () => {
    // this.setState({living: !this.state.living});
    this.props.toggleLiving(this.props.gridPos);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  onMouseEnter = (e) => {
    this.setState({
      hovered: true,
    });
    if (this.props.dragging) {
      this.toggleLife();
    }
  };

  onMouseLeave = () => {
    if (this.state.hovered) {
      this.setState({
        hovered: false,
      });
    }
  };

  onMouseDown = (event, intersection) => {

    event.preventDefault();
    event.stopPropagation();
    this.toggleLife();
    document.addEventListener('mouseup', this.onDocumentMouseUp);
    document.addEventListener('mousemove', this.onDocumentDrag);
  };

  onDocumentDrag = e => {
    e.preventDefault();
    this.props.handleDragging();
  }

  onDocumentMouseUp = e => {
    e.preventDefault();
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    document.removeEventListener('mousemove', this.onDocumentDrag);
    this.props.handleEndDragging();
  }

  ref = (mesh) => {
      const {
        onCreate,
      } = this.props;
      onCreate(mesh);
  };

  // _neighbors =

  render() {
    const {  hovered, position } = this.state;
    const { living } = this.props;
    let color;
    const hoverHighlight = (hovered && !dragging);
    if (living) {
      color = this.livingColor;
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

        onMouseEnter={this.onMouseEnter}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}

        ref={this.ref}
      >
      <geometryResource
        resourceId="boxGeometry"
      />
        <meshLambertMaterial
          color={color}
        />
      </mesh>
    </group>);
  };
}

export default Node;
