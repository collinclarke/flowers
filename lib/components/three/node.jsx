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
      paused: false
    };
    this.colorHash = {
      r: 25,
      g: 80,
      b: 50
    }
    this.hoverColor = "#f5adff";
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.toggleLife = this.toggleLife.bind(this);
    this.life = .05;
    this.maxLife = 0;
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  toggleLife () {
    this.props.toggleLiving(this.props.gridPos);
  }

  onMouseEnter = (e) => {
    const {dragging, running, gridPos} = this.props;
    this.setState({
      hovered: true,
    });
    if (dragging && running) {
      this.props.pause();
      this.setState({ paused: true });
      this.props.giveLife(gridPos);
    } else if (dragging) {
      this.props.giveLife(gridPos);
    }
    document.addEventListener('mouseup', this.onDocumentMouseUp);
  };

  onMouseLeave = () => {
    if (this.state.hovered) {
      this.setState({
        hovered: false,
      });
    }
  };

  onMouseDown = e => {
    this.props.onMouseDown(e);
    this.toggleLife();
  };

  onDocumentMouseUp = e => {
    const { dragging, play } = this.props;
    if (dragging && this.state.paused) {
      play();
    }
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
  }

  ref = (mesh) => {
      const {
        onCreate,
      } = this.props;
      onCreate(mesh);
  };

  calculateColor(nonLiving) {
    let { r, g, b } = this.colorHash;
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

    if (this.life > 10 && !nonLiving) {
      r = Math.floor(Math.random() * 155 + 150);
      g = Math.floor(Math.random() * 100);
      b = Math.floor(Math.random() * 100 + 50);
      return `rgb( ${r}, ${g}, ${b} )`
    } else if (nonLiving) {
      if (this.life > 5) {
        r = Math.abs(r - 2);
        g = Math.abs(g - 2);
        b = Math.abs(g - 2);
      } else {
        r = Math.abs(r + 80);
        g = Math.abs(g - 50);
        b = Math.abs(g - 30);
      }
      return `rgb( ${r}, ${g}, ${b} )`
    } else {
      r = colorConversion(0);
      g = colorConversion(1);
      b = colorConversion(2);
    }

    this.colorHash = {
      r, g, b
    }

    return `rgb( ${r}, ${g}, ${b} )`
  }


  render() {
    const { living, flower, dragging, running } = this.props;
    const max = Math.floor(this.maxLife / 3)

    if (living) {
      if (this.life > this.maxLife) {
        this.maxLife = this.life;
      }
      this.color = this.calculateColor();
      if ((this.life < 10 && running) && !dragging)
        this.life += 0.65;
      if ((this.props.flower > Math.pow(10, 10) && running) && !dragging)
        this.life += .025;
    } else if (this.state.hovered) {
      this.color = this.hoverColor;
    } else {
      if (this.life < 1) {
        this.color = "blue";
      } else {
        this.color = this.calculateColor(true)
        if ((this.life > max && this.life > 0.5) && !dragging) {
          this.life -= 0.4;
        }
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
          width={3.8}
          height={3.8}
          depth={this.life}
        />
        <meshLambertMaterial
          color={this.color}
        />
      </mesh>
    </group>);
  };
}

export default Node;
