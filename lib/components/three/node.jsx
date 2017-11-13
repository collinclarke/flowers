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
    this.state = {
      living: props.living,
      hovered: false
    };
    this.color = `blue`
    this.hoverColor = "rgb(0, 255, 10)";
    this.livingColor= [14, 128, 93]
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.onDocumentDrag = this.onDocumentDrag.bind(this);
    this.toggleLife = this.toggleLife.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  toggleLife () {
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

  calculateColor() {
    const { flower } = this.props;
    const colorConversion = (idx) => {
      switch(idx) {
        case 0:
         return 14;
        case 1:
         return (135 + Math.floor(Math.random() * 50));
        case 2:
         return (93 + Math.floor(Math.random() * 25));
      }
    }

    let r = colorConversion(0);
    let g = colorConversion(1);
    let b = colorConversion(2);

    this.livingColor = [r, g, b]

    if (flower % 13 === 0) {
      r += Math.floor(Math.random() * 1000);
      g -= Math.floor(Math.random() * 50);
      b += Math.floor(Math.random() * 5);
    }
    return `rgb( ${r}, ${g}, ${b} )`
  }


  render() {
    let color;
    if (this.props.living) {

      color = this.calculateColor();
    } else if (this.state.hovered) {
      color = this.hoverColor;
    } else {
      color = this.color;
    }

    return (<group
      position={this.props.position}
    >
      <mesh


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
