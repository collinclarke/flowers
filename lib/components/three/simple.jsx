import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';


class Simple extends Component {
  constructor(props, context) {
    super(props, context);
    this.cameraPosition = new Three.Vector3(0, -10, 200);
    this.state = {
      cubeRotation: new Three.Euler(2000, 0, 0),
    };
    this._onAnimate = () => {
      this.setState({
        cubeRotation: new Three.Euler(
          this.state.cubeRotation.x,
          this.state.cubeRotation.y,
          this.state.cubeRotation.z  + 0.001
        ),
      });
    };
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
            position={this.cameraPosition}
          />

          <ambientLight
            color="white"
          />
          <mesh
            rotation={this.state.cubeRotation}
            key="floor"
          >
            <planeBufferGeometry width={100} height={100}
            heightSegments={100}
            widthSegments={100}/>

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
