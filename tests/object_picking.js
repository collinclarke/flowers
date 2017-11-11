const container = document.getElementById('container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

const scene = new THREE.Scene();

let range = 1;
const renderer = new THREE.CanvasRenderer();
renderer.setSize( containerWidth, containerHeight);
container.appendChild( renderer.domElement );
renderer.setClearColor( 0xeeeedd, 1.0 );

const camera = new THREE.PerspectiveCamera( 45, containerWidth / containerHeight, 1, 10000 );
camera.position.set( 0, 0, range * 2 );
camera.lookAt( new THREE.Vector3( 0, 0 , 0));

geom = new THREE.CubeGeometry( 5, 5, 5 );

cubes = new THREE.Object3D();
scene.add( cubes );

for (let i = 0; i < 100; i++) {
  const grayness = Math.random() * 0.5 + 0.25,
    mat = new THREE.MeshBasicMaterial(),
    cube = new THREE.Mesh( geom, mat);
  mat.color.setRGB( grayness, grayness, grayness);
  cube.position.set( range * (0.5 - Math.random()), range * (0.5 - Math.random()),
    range * (0.5 - Math.random()) );
  const vector = new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar( 2 * Math.PI );
  cube.rotation.set(vector);
  cube.grayness = grayness;
  cubes.add(cube);
}
