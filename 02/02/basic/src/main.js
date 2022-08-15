import * as THREE from 'three';

// console.log(THREE);
/* 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

*/

// renderer 
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    antialias:true // mesh를 더 깔끔하게 표현 (대신 성능은 떨어짐)
});
renderer.setSize(window.innerWidth, window.innerHeight);

// scene 
const scene = new THREE.Scene();


// camera
/* 
const camera = new THREE.PerspectiveCamera(
    75,  // 시야각 (field of view)
    window.innerWidth / window.innerHeight, // 종횡비 (aspect)
    0.1, // near
    1000 // far
)
camera.position.x = 1; // 1 왼쪽으로
camera.position.y = 2; // 2 위로
camera.position.z = 5; // 5 앞으로
*/


// OrthographicCamera
const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // btm
    0.1,
    1000
)
camera.position.x = 1; // 1 왼쪽으로
camera.position.y = 2; // 2 위로
camera.position.z = 5; // 5 앞으로
camera.lookAt(0, 0, 0);
camera.zoom = 0.5; // 기본값은 1 
camera.updateProjectionMatrix(); // 카메라 속성을 바꿨으면 이 메서드를 호출해줘야함. 이로써 zoom 적용 되었음

scene.add(camera);


// Mesh  구조, 재질
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    // color:0xff0000;
    // color:'#ff0000'
    color:'red'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


// 그리기
renderer.render(scene, camera);