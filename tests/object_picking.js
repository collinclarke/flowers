const container = document.getElementByID('container'),
  containerWidth = container.clientWidth,
  containerHeight = container.clientHeight,
  renderer = new THREE.canvasRenderer(),
  scene = new THREE.Scene(),
  camera = new Three.PerspectiveCamera( 45, containerWidth / containerHeight, 1, 10000 );

renderer.setSize( containerWIdth, containerHeight);
container.appendChild( renderer.domElement );

renderer.setClearColorHex( 0xeeeedd, 1.0);

camera.position.set( 0, 0, range * 2 );
camera.lookAt( new THREE.Vector3( 0, 0 , 0));
