// Represents a clickable kanye face
class Kanye { 
  constructor(scene, i, texture, speed, isMobile) {
    this.isMobile = isMobile;
    this.farWall = -150;
    this.closeWall = 150;
    this.speed = speed;
    let size = (this.isMobile) ? 12 : 8;
    var geometry = new THREE.CircleGeometry(size, 50);
	  var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    this.cube = new THREE.Mesh(geometry, material);
	  this.cube.position.set(
      this._getRandomInt(-100, 100), 
      this._getRandomInt(-100, 100), 
      this._getRandomInt(this.farWall, this.closeWall));
    this.cube.rotation.z = this._getRandomInt(0, 360);
    this.cube.name = i;
    scene.add(this.cube);
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)  + min);
  }

  _move() {
    let pos = this.cube.position.z;
    if (pos < this.farWall)
      pos = this.closeWall;
    if (pos > this.closeWall)
      pos = this.farWall;
    this.cube.position.z = pos + this.speed;
  }

  _rotate() {
    this.cube.rotateZ(Math.PI / 180);
  }

  clicked() { // if kanye is clicked
    let clicked_pos = (this.speed > 0) ? this.farWall : this.closeWall;
    this.cube.position.set(
      this._getRandomInt(-100, 100), 
      this._getRandomInt(-100, 100), 
      clicked_pos);
  }

  changeSpeed(change) {
    this.speed += change;
  }

  getName() {
    return this.cube.name;
  }
  
  remove(scene) {
    scene.remove(this.cube);
  }

  update() {
    this._move();
    this._rotate();
  }
}

export default Kanye;
