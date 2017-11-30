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
    const cameraPosition = new Three.Vector3(0, -50, 125);
    this.state = {
      cameraRotation: cameraRotation,
      cameraPosition: cameraPosition,
      mouseInput: null,
    };

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
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.0;
    controls.noZoom = false;
    controls.noPan = true;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    this.controls.addEventListener('change', this._onTrackballChange);
  }

  _onNodesMounted = (nodes) => {
    this.nodes = nodes;
  };


  componentDidUpdate(newProps) {
    const { x, y, z } = this.state.cameraPosition
    const { cameraRotation } = this.state;

    const tilted = (Math.abs(x) > 5 || Math.abs(y) > 5)
    if (z < 0.009 && !tilted) {
      this.setState({
        cameraPosition: new Three.Vector3(x, y, 6000).applyEuler(cameraRotation),
      })
    } else if (Math.abs(z) > 7000) {
      this.setState({
        cameraPosition: new Three.Vector3(0, 0, .02),
      })
    }
      const {
        mouseInput,
      } = this.refs;

      mouseInput.containerResized();
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



  render() {
    const { pause, play, running } = this.props;
    if (!pause || !play) {
      debugger
    }
    const width = window.innerWidth;
    const height = window.innerHeight;

    const { cameraPosition, cameraRotation, mouseInput, camera, hovering } = this.state;

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
          <meshBasicMaterial
            resourceId="highlightMaterial"

            color={0xffff00}
            wireframe
          />
        </resources>
        <scene>


        <pointLight color="white" position= {this.state.cameraPosition} intensity={.75}/>
          <perspectiveCamera
            name="camera"
            ref="camera"
            fov={65}
            aspect={width / height}
            near={0.1}
            far={77374.92732468797}
            position={this.state.cameraPosition}
            rotation={this.state.cameraRotation}
          />

          <pointLight color="white" position={new Three.Vector3(0, 100, 0)}  intensity={.75}/>

          <ambientLight color="rgb(226, 255, 189)" intensity={.5}/>

          <NodeGrid
            running={running}
            pause={pause}
            play={play}
            brush={this.props.brush}
            toggleLiving={this.props.toggleLiving}
            giveLife={this.props.giveLife}
            board={this.props.board}
            mouseInput={mouseInput}
            camera={camera}
            onNodesMounted={this._onNodesMounted}
           />



        </scene>
      </React3>
      </div>
  );
  }

}

export default Simple;
