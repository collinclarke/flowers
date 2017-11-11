import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';
import Node from './node';
import MouseInput from '../../util/mouse_input';
import TrackballControls from '../../util/trackball';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';


class Simple extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cameraRotation: new Three.Euler(0, 0, 0),
      cameraPosition: new Three.Vector3(0, 0, 300),
      mouseInput: null
    };

    this._onAnimate = () => {
      this.onAnimateInternal()
    };

    this.nodes = this.generateNodeGrid()
    this.planePosition = new Three.Vector3(0, 0, 0);
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  componentDidUpdate(newProps) {
      const {
        mouseInput,
      } = this.refs;

      const {
        width,
        height,
      } = this.props;

      if (width !== newProps.width || height !== newProps.height) {
        mouseInput.containerResized();
      }
    }

  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };

  componentWillUnmount() {
  this.controls.removeEventListener('change', this._onTrackballChange);

  this.controls.dispose();
  delete this.controls;

  delete this.stats;
  }

  onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(this.nodes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({
        mouseInput,
      });
    }

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }

    this.controls.update();
  }


  onDocumentMouseMove(e) {
    this.mouseX = e.clientX - this.windowHalfX;
    this.mouseY = e.clientY - this.windowHalfY;
  }

  onDocumentClick(e) {
    // console.log(e);
  }

  componentDidMount() {
    const { camera } = this.refs;

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    this.controls.addEventListener('change', this._onTrackballChange);
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
      <Node key={posArr} position={posArr} />
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
      <div
      ref="container"
      >
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
            ref="camera"
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
      </div>
  );
  }

}

export default Simple;
