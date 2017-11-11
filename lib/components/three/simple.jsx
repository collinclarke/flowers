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
    this.state = {
      cameraRotation: new Three.Euler(0, 0, 0),
      cameraPosition: new Three.Vector3(0, 0, 300),
      mouseInput: null,
      hovering: false,
      dragging: false
    };

    this._cursor = {
      hovering: false
    }
    this.planePosition = new Three.Vector3(0, 0, 0);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onAnimate = () => {
    this._onAnimateInternal()
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

  _onHoverStart = () => {
    this.setState({
      hovering: true,
    });
  };

  _onHoverEnd = () => {
    this.setState({
      hovering: false,
    });
  };

  _onDragStart = () => {
    this.setState({
      dragging: true,
    });
  };

  _onDragEnd = () => {
    this.setState({
      dragging: false,
    });
  };

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

  _onAnimateInternal() {
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

          <NodeGrid
            mouseInput={mouseInput}
            camera={camera}
            onNodesMounted={this._onNodesMounted}

            onHoverStart={this._onHoverStart}
            onHoverEnd={this._onHoverEnd}
            onDragStart={this._onDragStart}
            onDragEnd={this._onDragEnd}
            cursor={this._cursor}
           />

        </scene>
      </React3>
      </div>
  );
  }

}

export default Simple;
