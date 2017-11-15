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
      hovered: false,
      dragging: false,
      life: 0.15
    };
    this.color = `blue`
    this.hoverColor = "#f5adff";
    this.livingColor= [14, 128, 93]
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.toggleLife = this.toggleLife.bind(this);
    this.life = .05;
    this.deathCounter = 0;
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
    // this.toggleLife();
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
    this.toggleLife();
    this.dragging = true;
    document.addEventListener('mouseup', this.onDocumentMouseUp);
  };

  onDocumentMouseUp = e => {
    e.preventDefault();
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    this.dragging = false;
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

    if ((this.life > 5) && (flower % 7 === 0)) {
      r += Math.floor(Math.random() * 1000);
      g -= Math.floor(Math.random() * 100);
      b -= Math.floor(Math.random() * 5);
    }
    return `rgb( ${r}, ${g}, ${b} )`
  }

  componentWillReceiveProps(nextProps) {
    const { flower, living } = nextProps;
    if (this.state.living && !living) {
      debugger
    } else if (!this.state.living && living) {
      this.deathCounter = 0;
    }
    if (this.life > 1 && this.deathCounter > 1) {
      debugger
      this.life -= .25;
    }
  }


  render() {
    let color;
    if (this.props.living) {
      color = this.calculateColor();
      this.life += .15;
    } else if (this.state.hovered) {
      color = this.hoverColor;
    } else {
      color = this.color;
      if (this.life > 8 && this.props.flower > 250) {
        this.life -= 1
      }
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
      <boxGeometry
        dynamic={true}
        width={3}
        height={3}
        depth={this.life}
      />
        <meshLambertMaterial
          color={color}
        />

      </mesh>
    </group>);
  };
}

export default Node;
