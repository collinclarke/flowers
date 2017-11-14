import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as Three from 'three';
import MouseInput from '../../util/mouse_input';
import TrackballControls from '../../util/trackball';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import NodeGrid from './node_grid';



class Simple extends Component {
  constructor(props, context) {
    super(props, context);

    const cameraRotation = new Three.Euler();
    const cameraPosition = new Three.Vector3(0, 0,
      250)
    this.state = {
      cameraRotation: cameraRotation,
      cameraPosition: cameraPosition,
      mouseInput: null,
    };
    this._cursor = {
      hovering: false
    }

    this.planePosition = new Three.Vector3(0, 0, 0);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;


  onAnimate = () => {
    this.onAnimateInternal()
    if (this.state.play) {
      this.makeMove();
    }
  };

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

  _onNodesMounted = (nodes) => {
    this.nodes = nodes;
  };


  componentDidUpdate(newProps) {
      const {
        mouseInput,
      } = this.refs;

      mouseInput.containerResized();
  }

  // _onTrackballChange = () => {
  //   this.setState({
  //     cameraPosition: this.refs.camera.position.clone(),
  //   }, console.log("position", this.state.cameraPosition));
  //   this.setState({
  //     cameraRotation: this.refs.camera.rotation.clone(),
  //   }, console.log("rotation", this.state.cameraRotation));
  // };
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



  render() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const { cameraPosition, cameraRotation, mouseInput, camera, hovering } = this.state;
    this._cursor.hovering = hovering;
    return (
      <div
      ref="container"
      >
      <React3 mainCamera="camera"
      width={ width }
      height={ height }
      antialias
      pixelRatio={window.devicePixelRatio}
      sortObjects={false}
      onAnimate={this.onAnimate}
      clearColor={16777215}
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <resources>
          <boxGeometry
            resourceId="boxGeometry"

            width={4}
            height={4}
            depth={.5}
          />
          <meshBasicMaterial
            resourceId="highlightMaterial"

            color={0xffff00}
            wireframe
          />
        </resources>
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


          <NodeGrid
            toggleLiving={this.props.toggleLiving}
            board={this.props.board}
            mouseInput={mouseInput}
            camera={camera}
            onNodesMounted={this._onNodesMounted}
            endMouseDown={this.endMouseDown}
            cursor={this._cursor}
           />

        </scene>
      </React3>
      </div>
  );
  }

}

export default Simple;
