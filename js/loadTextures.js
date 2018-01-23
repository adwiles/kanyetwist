function getKanyes() {
  let files = [
    '/textures/kanye1.png',
    '/textures/kanye2.png',
    '/textures/kanye3.png'
  ];
  let images = files.map((url) => {
    let img = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img');
    img.crossOrigin = 'Anonymous';
    img.src = url;
    return img;
  });
  return images;
};

const textureImages = getKanyes();

