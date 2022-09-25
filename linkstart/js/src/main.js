import * as THREE from "https://deno.land/x/threejs_4_deno@v121/src/Three.js";

function main() {
  const scene = new THREE.Scene();
  const group1 = new THREE.Group();
  const group2 = new THREE.Group();
  const group3 = new THREE.Group();
  scene.add(group1);
  scene.add(group2);
  scene.add(group3);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );

  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  scene.fog = new THREE.Fog(0xfffff0, 10, 2000);
  scene.background = new THREE.Color(0xffffff);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);
  scene.add(light2);

  for (let i = 0; i < 500; i++) {
    group1.add(makeCylinder(-1000, -1500));
  }
  for (let i = 0; i < 1000; i++) {
    group2.add(makeCylinder(-1500, -2000));
  }
  for (let i = 0; i < 3000; i++) {
    group3.add(makeCylinder(-2000, -2500));
  }

  let textPopUpStatus = false;
  const loader = new THREE.FontLoader();

  let g1status,
    g2status,
    g3status = true;

  function animate() {
    requestAnimationFrame(animate);
    if (group1.position.z > 1500 && g1status) {
      for (let i = group1.children.length - 1; i >= 0; --i) {
        group1.remove(group1.children[i]);
      }
      g1status = false;
    }
    if (group2.position.z > 2000 && g2status) {
      for (let i = group2.children.length - 1; i >= 0; --i) {
        group2.remove(group2.children[i]);
      }
      g2status = false;
    }
    if (group3.position.z > 2600 && g3status) {
      for (let i = group3.children.length - 1; i >= 0; --i) {
        group3.remove(group3.children[i]);
      }
      g3status = false;
      textPopUpStatus = true;
    }
    if (textPopUpStatus) {
      loader.load("../../assets/gentilis_bold.typeface.json", (font) => {
        text = new THREE.Mesh(makeTextGeometry(font), makeTextMatrial());
        scene.add(text);
      });
      textPopUpStatus = false;
    }
    group1.position.z += 15;
    group2.position.z += 15;
    group3.position.z += 15;
    renderer.render(scene, camera);
  }

  animate();
}

function degToRad(deg) {
  return (Math.PI / 180) * deg;
}

function makeCylinder(maxzpos, minzpos) {
  const geometry = new THREE.CylinderGeometry(2, 2, 40);
  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )},${Math.ceil(Math.random() * 255)})`,
  });
  const cylinder = new THREE.Mesh(geometry, material);
  const rmax = 200;
  const rmin = 10;
  const r = Math.random() * (rmax - rmin) + rmin;
  const theta = Math.random() * 360;
  cylinder.position.x = r * Math.cos(degToRad(theta));
  cylinder.position.y = r * Math.sin(degToRad(theta));
  cylinder.position.z = Math.random() * (maxzpos - minzpos) + minzpos;
  cylinder.rotation.x = degToRad(90);
  return cylinder;
}

function makeTextGeometry(font) {
  const textGeometry = new THREE.TextGeometry("Welcome to\nIovesophy's world", {
    font: font,
    size: window.innerWidth / 200,
    height: 1,
    curveSegments: 5,
  });
  textGeometry.center();
  return textGeometry;
}

function makeTextMatrial() {
  return new THREE.MeshToonMaterial({ color: "rgb(0 ,255 ,200)" });
}

main();
