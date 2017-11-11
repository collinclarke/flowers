var ray = new THREE.ReusableRay();
var projector = new THREE.Projector();
var directionVector = new THREE.Vector3();

var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;

var clickInfo = {
  x: 0,
  y: 0,
  userHasClicked: false
};

container.addEventListener('click', function (evt) {
  // The user has clicked; let's note this event
  // and the click's coordinates so that we can
  // react to it in the render loop
  clickInfo.userHasClicked = true;
  clickInfo.x = evt.clientX;
  clickInfo.y = evt.clientY;
}, false);
