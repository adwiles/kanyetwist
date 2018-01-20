import { Scene, PerspectiveCamera, Vector3, Vector2, 
         WebGLRenderer, TextureLoader, Raycaster, RingGeometry, DoubleSide, MeshBasicMaterial, Mesh } from 'three';
import Kanye from './Kanye.js';

class SceneManager {
  constructor(isMobile) {
    this.screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight 
    };

    this.speed = (this.isMobile) ? 0.4 : 0.3;
    this.scene = this.buildScene();
    this.camera = this.buildCamera(this.screenDimensions);
    this.renderer = this.buildRenderer(this.screenDimensions);
    this.sceneSubjects = this.createSceneSubjects(this.scene);
  }

  get speed() { return this._speed; }
  set speed(speed) { this._speed = speed; }

  addKanye(change) {
    let loader = new TextureLoader();
    for (let i = 0; i < change; i++) {
      let n = Math.ceil(Math.random() * 3);
      let texture = loader.load('./textures/kanye' + n + '.png');
      let newk = new Kanye(this.scene, this.sceneSubjects.length, texture, this.speed, this.isMobile);
      this.sceneSubjects.push(newk);
    }
  }

  buildScene() {
    let s = new Scene();
    return s;
  }

  buildCamera({width, height}) {
    let c = new PerspectiveCamera(75, width / height, 0.1, 280);
    c.position.set(0, 0, 150);
    c.lookAt(new Vector3(0, 0, 0));
    return c;
  }

  buildRenderer({width, height}) {
    let r = new WebGLRenderer();
    r.setSize(width, height);
    this.canvas = r.domElement;
    document.getElementById('container').appendChild(this.canvas);
    return r;
  }

  createSceneSubjects(scene) {
    const sceneSubjects = [];

    let loader = new TextureLoader();
    for (let i = 0; i < 50; i++) {
      let n = Math.ceil(Math.random() * 3);
      let texture = loader.load('./textures/kanye' + n + '.png');
      let newk = new Kanye(scene, i, texture, this.speed, this.isMobile);
      sceneSubjects.push(newk);
    }
    return sceneSubjects;
  }

  changeSpeed(change) {
    this.speed += change;
    this.sceneSubjects.map((subject) =>  subject.changeSpeed(change));
  }

  getDisplayAmount() {
    return this.sceneSubjects.length;
  }

  getDisplaySpeed() {
    let speed = (this.speed * 10) - 2;
    if (this.isMobile) 
      speed -= 1;
    return Math.floor(speed);
  }

  removeKanye(change) {
    for (let i = 0; i < change; i++) {
      let name = this.sceneSubjects.pop().getName();
      let remk = this.scene.getObjectByName(name);
      this.scene.remove(remk);
      this.scene.children.pop();
    }
    this.render();
  }

  click(x, y) {
    let mouse = new Vector2(x, y);
    let raycaster = new Raycaster();
    raycaster.setFromCamera(mouse, this.camera); // build ray from mouse & camera

    let intersects = raycaster.intersectObjects(this.scene.children);
    if (intersects.length) {
      this.sceneSubjects[intersects[0].object.name].clicked();
    }
  }

  update() {
    for (let i = 0; i < this.sceneSubjects.length; i++) {
      this.sceneSubjects[i].update();
    }
    this.render();
  }

	resizeWindow(width, height) {
		this.screenDimensions.width  = width;
		this.screenDimensions.height = height;

    this.canvas.width = this.screenDimensions.width;
    this.canvas.height = this.screenDimensions.height;

    this.camera.aspect = (this.screenDimensions.width / 
                          this.screenDimensions.height);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.screenDimensions.width, 
                          this.screenDimensions.height);
	}

  render() { this.renderer.render(this.scene, this.camera); }
}

export default SceneManager;
