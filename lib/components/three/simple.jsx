import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';


class Simple extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      planeRotation: new Three.Euler(2000, 0, 0),
      cameraPosition: new Three.Vector3(0, -10, 200)
    };
    this._onAnimate = () => {
      this.setState({
        planeRotation: new Three.Euler(
          this.state.planeRotation.x,
          this.state.planeRotation.y,
          this.state.planeRotation.z + 0.001)
      });
      // this.updateCamera();
      this.updatePlane();
    };
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

  updatePlane() {
    this.setState({
      planeRotation: new Three.Euler(
        this.state.planeRotation.x,
        this.state.planeRotation.y,
        this.state.cameraPosition.z + ( this.mouseX + this.state.planeRotation.x ) * .002
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
          <pointLight color={16777215} intensity={0.8}></pointLight>
          <perspectiveCamera
            name="camera"
            fov={35}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.state.cameraPosition}
          />

          <ambientLight
            color="white"
          />
          <mesh
            rotation={this.state.planeRotation}
            key="floor"
          >
            <planeGeometry width={100} height={100}/>
            <meshBasicMaterial
              color="blue"
              opacity={1}
              side={2}
              wireframe={true}
            />
          </mesh>
        </scene>
      </React3>
  );
  }

}

export default Simple;
