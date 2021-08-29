import * as THREE from "https://cdn.skypack.dev/three@0.132.0";

const cube = document.getElementById("cube");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b7010);
const camera = new THREE.PerspectiveCamera(
  45,
  cube.width / cube.height,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer({ canvas: cube, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);

const light = new THREE.PointLight(0xeeeeaa, 1, 100);
light.position.set(-2, 3, 4);
scene.add(light);

const geometry = new THREE.TorusGeometry(1, 0.3, 16, 48);
const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x157a3f),
  flatShading: true,
});
const cubeObj = new THREE.Mesh(geometry, material);
scene.add(cubeObj);

camera.position.z = 4.4;

function animate() {
  requestAnimationFrame(animate);
  cubeObj.rotation.x += 0.01;
  cubeObj.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

const reposElement = document.getElementsByClassName("repos")[0];

const repos = ["Sourc"];

for (let repo of repos) {
  let listItem = document.createElement("li");
  let slash = document.createElement("span");
  slash.classList.add("large");
  slash.innerHTML = "/";
  listItem.appendChild(slash);
  listItem.appendChild(document.createTextNode(repo));
  let rightItem = document.createElement("li");
  $.ajax(`https://api.github.com/repos/Th3OneAndOnly/${repo}`).done(function (
    json
  ) {
    listItem.innerHTML = `<a href="${json.html_url}">${listItem.innerHTML}</a>`;
    rightItem.innerHTML = json.description;
  });

  reposElement.appendChild(listItem);
  reposElement.appendChild(rightItem);
}
