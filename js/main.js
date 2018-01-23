import SceneManager from './SceneManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const textures = textureImages.map((img) => loadTexture(img));
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  let sceneManager = new SceneManager(isMobile, textures);
  let mousedown = false;
  let timesHeld = 0;

  function loadTexture(img) {
    let texture = new THREE.Texture();
    texture.image = img;
    texture.format = THREE.RGBAFormat;
    texture.needsUpdate = true;
    return texture;
  };
  
  function addEventListeners() {
    window.onresize = handleWindowResize;
    window.onmousedown = handleMouseDown;
    window.onmouseup = () => { mousedown = false; timesHeld = 0; };
    window.onmousemove = handleMouseMove;
    window.ontouchstart = (e) => {
      mousedown = true;
      timesHeld = 0;
      handleTouch(e);
    };
    window.ontouchend = () => {mousedown = false; };
    window.ontouchmove = handleTouch;
  
    // controls
    let speedControl = document.getElementById('speedKanye'); 
    let amountControl = document.getElementById('numKanye');
  
    if (isMobile) {
      speedControl.getElementsByClassName('add')[0].
        addEventListener('touchstart', () => changeSpeed(0.1));
      speedControl.getElementsByClassName('minus')[0].
        addEventListener('touchstart', () =>changeSpeed(-0.1));
      amountControl.getElementsByClassName('add')[0].
        addEventListener('touchstart', () => changeAmount(1));
      amountControl.getElementsByClassName('minus')[0].
        addEventListener('touchstart', () => changeAmount(-1));
    } else {
      speedControl.getElementsByClassName('add')[0].
        addEventListener('mousedown', () => changeSpeed(0.1));
      speedControl.getElementsByClassName('minus')[0].
        addEventListener('mousedown', () =>changeSpeed(-0.1));
      amountControl.getElementsByClassName('add')[0].
        addEventListener('mousedown', () => changeAmount(1));
      amountControl.getElementsByClassName('minus')[0].
        addEventListener('mousedown', () =>changeAmount(-1));
    }
  
    function clicked(e) {
      let btn = e.target;
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 100);
    };
  
    let btns = document.querySelectorAll('.add, .minus');
    for (let i = 0; i < btns.length; i++) {
      if (isMobile)
        btns[i].addEventListener('touchstart', clicked);
      else
        btns[i].addEventListener('mousedown', clicked);
    }
  }
  
  function handleWindowResize() {
    let c = document.getElementById('container');
    sceneManager.resizeWindow(c.offsetWidth, c.offsetHeight);
  }
  
  function holdButton(f, num, mult) {
    if (timesHeld > 5)
      num += Math.floor(num * (timesHeld * mult));
    setTimeout(() => {
      timesHeld += 1;
      if (mousedown)
        f(num);
    }, 500);
  }
  
  function handleTouch(e) {
    e.preventDefault();
    let touch = e.changedTouches[0]; let c = document.getElementById('container');
    let x = (touch.pageX / c.offsetWidth) * 2 - 1; 
    let y = - (touch.pageY / c.offsetHeight) * 2 + 1;
    sceneManager.click(x, y);
  }
  
  function handleMouseMove(e) {
    if (mousedown)
      handleClick(e);
  }
  
  
  function handleMouseDown(e) {
    mousedown = true;
    handleClick(e);
  }
  
  function handleClick(e) {
    let c = document.getElementById('container');
    let x = (e.clientX / c.offsetWidth) * 2 - 1; 
    let y = - (e.clientY / c.offsetHeight) * 2 + 1;
    sceneManager.click(x, y);
  }
  
  function changeSpeed(num) {
    sceneManager.changeSpeed(num);
    displaySpeed();
    holdButton(changeSpeed, num, 0.7);
  }
  
  function changeAmount(num) {
    if (num >= 0)
      sceneManager.addKanye(num);
    else
      sceneManager.removeKanye(Math.abs(num));
    displayAmount();
    holdButton(changeAmount, num, 0.3);
  }
  
  function displaySpeed() {
    let number = sceneManager.getDisplaySpeed();
    let option = document.getElementById('speedKanye');
    option.getElementsByTagName('h3')[0].innerHTML = 'speed ' + number;
  }
  
  function displayAmount() {
    let number = sceneManager.getDisplayAmount();
    let option = document.getElementById('numKanye');
    option.getElementsByTagName('h3')[0].innerHTML = number + ' kanyes';
  }
  
  function animate() {
    requestAnimationFrame(animate);
    sceneManager.update();
  }
  
  (function () {
    addEventListeners();
    displaySpeed();
    displayAmount();
    animate();
  })();
});
