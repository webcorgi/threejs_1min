import * as THREE from 'three';

// ----- 주제: 브라우저 리사이즈 + 픽셀 고해상도 (devicePixelRatio)

export default function example() {

	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	// devicePixelRatio > 픽셀 고해상도로 표현할 때 사용,
	// 픽셀과 같은 1:1 해상도면 그대로 사용, 아니면 두배로 해상도 높이기
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	

	// Scene
	const scene = new THREE.Scene();

	// Camera
	// Perspective Camera(원근 카메라)
	const camera = new THREE.PerspectiveCamera(
		75, // 시야각(field of view)
		window.innerWidth / window.innerHeight, // 종횡비(aspect)
		0.1, // near
		1000 // far
	);
	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;
	scene.add(camera);

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({
		// color: 0xff0000
		// color: '#ff0000'
		color: 'red'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// 그리기
	renderer.render(scene, camera);


	// 
	function setSize(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}
	window.addEventListener('resize', setSize);
}