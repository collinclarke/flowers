import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';
import Node from './node';
import MouseInput from '../../util/mouse_input';


class Simple extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cameraRotation: new Three.Euler(0, 0, 0),
      cameraPosition: new Three.Vector3(0, 0, 300)
    };

    this._onAnimate = () => {
      // this.rotateBox();
      // this.updateCamera();
      // this.updatePlane();
    };

    this.nodes = this.generateNodeGrid()
    this.planePosition = new Three.Vector3(0, 0, 0);
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  onDocumentMouseMove(e) {
    this.mouseX = e.clientX - this.windowHalfX;
    this.mouseY = e.clientY - this.windowHalfY;
  }

  onDocumentClick(e) {
    // console.log(e);
  }

  componentDidMount() {
    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    document.addEventListener( 'click', this.onDocumentClick, false);
  }

  updateCamera() {
    this.setState({
      cameraPosition: new Three.Vector3(
        this.state.cameraPosition.x + ( this.mouseX + this.state.cameraPosition.x ) * .000009,
        this.state.cameraPosition.y + ( this.mouseY + this.state.cameraPosition.y ) * .00009,
        this.state.cameraPosition.z
      )
    })
  }

  generateNode(posArr) {
    return (
      <Node key={posArr} position={posArr} life={false}/>
    )
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

  generateNodeGrid() {
    let grid = this.generateNodeRow(0)
    for (let x = 5; x <= 50; x+=5) {
      grid = grid.concat(this.generateNodeRow(x), this.generateNodeRow(-x))
    }
    return grid
  }

  updatePlane() {
    this.setState({
      planeRotation: new Three.Euler(
        this.state.planeRotation.x,
        this.state.planeRotation.y,
        this.state.planeRotation.z + ( this.mouseX + this.state.planeRotation.z ) * .000008
      )
    })
  }



  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
      <React3 mainCamera="camera"
      width={ width }
      height={ height}
      onAnimate={this._onAnimate}
      clearColor={16777215}
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <scene>


          <pointLight color={16777215} position={this.state.cameraPosition}></pointLight>
          <perspectiveCamera
            name="camera"
            fov={35}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.state.cameraPosition}
            rotation={this.state.cameraRotation}
          />


          <spotLight
            color="white" intensity={1}
          />
          <mesh
            position={ this.planePosition }
            key="floor"
          >
            <planeGeometry width={100} height={100}/>
            <meshLambertMaterial
              color="blue"
              opacity={1}
              side={2}
              wireframe={true}
            />
          </mesh>

          { this.nodes }


        </scene>
      </React3>
  );
  }

}

export default Simple;
