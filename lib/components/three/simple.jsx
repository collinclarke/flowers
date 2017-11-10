import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';
import Node from './node';


class Simple extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      planeRotation: new Three.Euler(0, 0, 0),
      boxRotation: new Three.Euler(2000, 0, 0),
      cameraPosition: new Three.Vector3(0, -20, 300)
    };
    this._onAnimate = () => {
      // this.rotateBox();
      // this.updateCamera();
      // this.updatePlane();
    };
    this.boxPosition = new Three.Vector3(0, -5, 100);
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
  }

  componentDidMount() {
    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
  }

  updateCamera() {
    this.setState({
      cameraPosition: new Three.Vector3(
        this.state.cameraPosition.x + ( this.mouseX - this.state.cameraPosition.x ) * .0002,
        this.state.cameraPosition.y + ( - this.mouseY + 200 - this.state.cameraPosition.y ) * .0002,
        this.state.cameraPosition.z
      )
    })
  }

  rotateBox() {
    this.setState({
      boxRotation: new Three.Euler(
        this.state.boxRotation.x,
        this.state.boxRotation.y,
        this.state.boxRotation.z + 0.005)
    });
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

  onDocumentMouseMove(e) {
    this.mouseX = e.clientX - this.windowHalfX;
    this.mouseY = e.clientY - this.windowHalfY;
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

          <Node position={[0, 0, 0]}/>
          <Node position={[5, 0, 0]}/>

        </scene>
      </React3>
  );
  }

}

export default Simple;
